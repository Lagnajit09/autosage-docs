# Architecture

AutoSage is split into three independently-deployed planes: a **static frontend** on Firebase, a **control plane** on a single OCI A1 Ampere host, and an **execution plane** on Cloud Run. An **Autobot FastAPI service** co-resides on the OCI host and handles all AI interactions.

---

## High-level system topology

```
┌────────────────────────────────────────────────────────────────────┐
│                            BROWSER                                 │
└──────────────────┬────────────────────────────┬────────────────────┘
         HTTPS/SSE │                            │ HTTPS
                   ▼                            ▼
     ┌─────────────────────────┐  ┌─────────────────────────────┐
     │      React SPA          │  │         Docs Site           │
     │    Firebase Hosting     │  │       Firebase Hosting      │
     │   autosagex.web.app     │  │  autosagexdocs.web.app      │
     └──────────┬──────────────┘  └──────────────┬──────────────┘
                └────────────────┬───────────────┘
                                 │ HTTPS / SSE
                                 ▼
┌───────────────────────────────────────────────────────────────────┐
│                  OCI A1 Ampere — Control Plane                    │
│                                                                   │
│   ┌────────────────────────────────────────────────────────────┐  │
│   │               Nginx  (TLS · reverse proxy)                 │  │
│   └──────────────────┬──────────────────────┬──────────────────┘  │
│               /api/* │                      │ /api/ai/*           │
│       ┌──────────────▼──────────┐   ┌───────▼──────────────────┐  │
│       │    Django REST API      │◄──│    Autobot FastAPI       │  │
│       │    (gunicorn · 4 w)     │   │    (uvicorn)             │  │
│       └───┬─────────────┬───────┘   └───────┬──────────────────┘  │
│           │             │                    │                    │
│     ┌─────▼────┐  ┌─────▼───────────────┐    │  Anthropic API     │
│     │PostgreSQL│  │      Redis          │    └──► (Claude models) │
│     │          │  │  queue · cache · SSE│                         │
│     └──────────┘  └─────────┬───────────┘                         │
│                             │ task queue                          │
│                    ┌────────▼───────────────────┐                 │
│                    │  Celery Worker + Beat      │                 │
│                    │  task executor · scheduler │                 │
│                    └────────┬───────────────────┘                 │
└─────────────────────────────│─────────────────────────────────────┘
                              │ spawn job
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│                  Cloud Run — Execution Plane                     │
│                                                                  │
│            ┌──────────────────────────────────────────┐          │
│            │               exec-worker                │          │
│            │     Python · PowerShell · Shell          │          │
│            └──────────────┬────────────┬──────────────┘          │
└───────────────────────────│────────────│─────────────────────────┘
                            │            │
               ┌────────────▼──┐   ┌─────▼───────────────┐
               │     GCS       │   │   Target Servers    │
               │  scripts &    │   │   SSH · WinRM       │
               │    logs       │   │                     │
               └───────────────┘   └─────────────────────┘
```

**Key points**

| Layer                | Host         | What it does                                                           |
| -------------------- | ------------ | ---------------------------------------------------------------------- |
| React SPA + Docs     | Firebase CDN | Serves static files globally; zero backend involvement for page loads  |
| Nginx                | OCI A1       | TLS termination, routes `/api/*` → Django and `/api/ai/*` → Autobot    |
| Django API           | OCI A1       | REST API, auth, billing, workflow/script CRUD, SSE event relay         |
| Autobot FastAPI      | OCI A1       | AI assistant — streams chat, calls Django tools, calls Anthropic API   |
| PostgreSQL           | OCI A1       | Primary data store for all entities                                    |
| Redis                | OCI A1       | Celery task queue, SSE pub/sub channel, short-lived caches             |
| Celery Worker + Beat | OCI A1       | Executes queued tasks (run dispatch, email); cron schedule triggers    |
| exec-worker          | Cloud Run    | Isolated per-run container; connects to target servers, streams output |
| GCS                  | Google Cloud | Stores script source files and full run log archives                   |

---

## In-depth: workflow execution flow

This traces what happens from the moment a user triggers a workflow run to the live output appearing in their browser.

```
  Browser                Django API            Redis          Celery Worker        exec-worker (Cloud Run)
     │                       │                   │                  │                       │
     │ POST /workflows/{id}/ │                   │                  │                       │
     │ run/                  │                   │                  │                       │
     ├──────────────────────►│                   │                  │                       │
     │                       │ validate limits   │                  │                       │
     │                       │ create WorkflowRun│                  │                       │
     │                       │   (status=pending)│                  │                       │
     │                       ├──────────────────►│                  │                       │
     │                       │  enqueue task     │                  │                       │
     │◄──────────────────────│                   │                  │                       │
     │  200 { run_id }       │                   │                  │                       │
     │                       │                   │                  │                       │
     │ GET /runs/{run_id}/   │                   │                  │                       │
     │ stream/ (SSE)         │                   │                  │                       │
     ├──────────────────────►│                   │                  │                       │
     │                       │ subscribe SSE ch  │                  │                       │
     │                       ├──────────────────►│                  │                       │
     │                       │                   │ dequeue task     │                       │
     │                       │                   ├─────────────────►│                       │
     │                       │                   │                  │ update status=running │
     │                       │                   │                  │ spawn exec-worker job │
     │                       │                   │                  ├──────────────────────►│
     │                       │                   │                  │                       │
     │                       │                   │                  │  ┌────────────────────┤
     │                       │                   │                  │  │ For each node:     │
     │                       │                   │                  │  │                    │
     │                       │                   │                  │  │  fetch script ◄─GCS│
     │                       │                   │                  │  │  execute SSH/WinRM │
     │                       │                   │                  │  │  stream stdout     │
     │                       │                   │◄─────────────────│◄─┤  publish output    │
     │◄──────────────────────│◄──────────────────│                  │  └────────────────────┤
     │  SSE chunk            │  relay event      │                  │                       │
     │  (live terminal)      │                   │                  │                       │
     │                       │                   │                  │                       │
     │                       │                   │                  │  write full log ──►GCS│
     │                       │                   │◄─────────────────│◄──────────────────────│
     │◄──────────────────────│◄──────────────────│  DONE event      │  update Run=success   │
     │  SSE close            │  close stream     │                  │                       │
```

### What each component owns during a run

| Component         | Responsibility                                                                                                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Django API**    | Validates the request, creates the `WorkflowRun` DB record, enqueues the Celery task, holds the SSE connection open, relays events from Redis to the browser                                   |
| **Redis**         | Acts as the Celery task queue (FIFO) and as the real-time pub/sub channel between the exec-worker → Celery → Django → browser event chain                                                      |
| **Celery Worker** | Dequeues the task, marks the run as active, spawns the Cloud Run exec-worker job, subscribes to the Redis channel, and forwards events upstream                                                |
| **exec-worker**   | Short-lived Cloud Run container; fetches script files from GCS, connects to the target server over SSH or WinRM, streams stdout/stderr back to Redis, writes the full log to GCS on completion |
| **GCS**           | Persists script source (written at script-save time) and the full run log (written at run-completion time) — no live traffic during execution                                                  |

### Autobot-triggered execution

When Autobot's execution copilot launches a run, the same pipeline applies. The difference is the entry point: instead of the browser hitting `POST /api/workflows/{id}/run/`, the Autobot FastAPI service calls that same Django endpoint as a tool call, forwarding the user's JWT. From Django's perspective the request is identical — the caller is just the Autobot service process rather than the browser.

```
  Autobot FastAPI          Django API               (same pipeline as above)
       │                       │
       │  tool: run_workflow   │
       │  POST /api/workflows/ │
       │  {id}/run/            │
       │  Authorization: JWT   │
       ├──────────────────────►│
       │◄──────────────────────│
       │  { run_id }           │
       │                       │
       │  Django streams run   │
       │  events back to       │
       │  Autobot via SSE,     │
       │  which relays them    │
       │  to the chat UI       │
```

---

## External service dependencies

| Service                  | Used by             | Purpose                                                                         |
| ------------------------ | ------------------- | ------------------------------------------------------------------------------- |
| **Anthropic API**        | Autobot FastAPI     | LLM calls (Claude models) for chat, script generation, workflow drafting        |
| **Google Cloud Storage** | Django, exec-worker | Script file storage; full run log archiving                                     |
| **Clerk**                | Django              | JWT issuance and verification for all authenticated API calls                   |
| **Razorpay**             | Django              | Subscription payments (Pro monthly/annual) and one-time Day Pass orders         |
| **SMTP**                 | Celery Worker       | Workflow completion email notifications via Email action nodes                  |
| **Target Servers**       | exec-worker         | The actual remote machines where scripts run (SSH for Linux, WinRM for Windows) |
