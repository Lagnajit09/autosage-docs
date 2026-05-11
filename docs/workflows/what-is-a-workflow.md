---
sidebar_position: 1
title: What is a Workflow?
description: A workflow is an executable graph of steps that runs scripts on your servers, triggered manually, on a schedule, or via webhook.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# What is a Workflow?

A **workflow** is the core concept in AutoSage. It's a visual graph that you build on a canvas — a starting point, one or more steps, and the connections between them — and AutoSage runs it for you against your servers.

If you've used Zapier, n8n, or Make, the idea is similar: chain a few steps together, hit run, watch it work. AutoSage is purpose-built for **server administration**: every step that does work points at one of your servers and runs a script there, with the output streamed back to you live.

## Why workflows?

Server work tends to be **repetitive, multi-step, and brittle**. A typical task — "deploy this app, restart the service, run smoke tests, alert me if anything fails" — involves several scripts, several servers, conditional logic, and notifications. Doing it by hand is slow and error-prone. Wrapping it in a single script gets ugly fast and is hard to share with teammates.

A workflow gives you:

- **A visual mental model** — you can _see_ what happens when, instead of reading through a 200-line bash script.
- **Reusable building blocks** — define a server and its credentials once in the Vault, reference them from any workflow.

- **Multiple ways to trigger** — run on demand, on a schedule, or from an external system (CI, GitHub Actions, monitoring) via webhook.
- **Live observability** — every run streams logs back to your browser as it happens, and the full output is preserved.
- **Branching logic** — Decision nodes let you handle the "what if it fails?" path without writing custom error-handling code in every script.

## What's in a workflow?

A workflow is made of two things: **nodes** (the steps) and **edges** (the connections between them).

<ThemedImage
alt="Anatomy of a workflow: a Trigger node connecting to an Action node, then a Decision node branching into two further Action nodes"
sources={{
    light: useBaseUrl('/img/diagrams/workflow-svg-light.svg'),
    dark: useBaseUrl('/img/diagrams/workflow-svg-dark.svg'),
  }}
/>

There are three kinds of nodes, and every workflow uses them in roughly the same shape:

| Node type    | What it does                                         | Examples                                                                                                                                                    |
| ------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Trigger**  | Starts the workflow. Every workflow has exactly one. | _Manual_ — run it yourself from the dashboard.<br/>_HTTP Webhook_ — fire it from an external system.<br/>_Job Scheduler_ — run it on a recurring schedule. |
| **Action**   | Does the work. A workflow can have many.             | _Script_ — run a Python, PowerShell, or Shell script on a server.<br/>_Email_ — send a notification.                                                        |
| **Decision** | Branches the flow on a true/false condition.         | "Continue only if the previous step exited with code 0."<br/>"Run cleanup branch if disk usage > 90%."                                                      |

Nodes are connected by **edges** — directed lines that say "after this node finishes, run that one next." Edges out of a Decision node carry a label (`true` or `false`) so AutoSage knows which branch to take.

For more on each node type and how to configure them, see [Nodes & Edges](/workflows/nodes-and-edges/overview).

## One node, one server

This is AutoSage's defining design choice and worth calling out: **each Action node points at exactly one server.** There is no "run this on server group X" abstraction at the node level.

That sounds restrictive at first, but it's actually liberating:

- A single workflow can manage **multiple servers in parallel** — just add one Action node per server, side by side.
- Each step has its **own credentials and target**, picked from the Vault.
- Failures are **scoped to the server they happen on** — a problem on `web-02` doesn't poison the run for `web-01`.

```
[ Trigger: Manual ]
        │
        ├──▶ [ Action: deploy.py on web-01 ]
        ├──▶ [ Action: deploy.py on web-02 ]
        └──▶ [ Action: deploy.py on web-03 ]
                            │
                       (all complete)
                            │
                            ▼
                  [ Action: smoke-test.sh on lb-01 ]
                            │
                            ▼
                  [ Decision: all healthy? ]
                        /            \
                  true /              \ false
                      ▼                ▼
        [ Action: email "deployed" ]   [ Action: rollback.sh ]
```

## How a workflow runs

When you trigger a workflow, AutoSage:

1. **Records the run** — creates a _Workflow Run_ with status `queued`, plus one _Node Run_ per node in the graph.
2. **Builds the execution plan** — walks the graph from the trigger and figures out the order, including any parallel branches.
3. **Runs each node in order** — Action nodes ship the script to the right server and execute it; Decision nodes evaluate their condition based on upstream outputs and prune the unused branch.
4. **Streams logs in real time** — stdout and stderr from each script are pushed to your browser as they happen.
5. **Marks the run** — when the graph is done (or a node fails irrecoverably), the run finishes with status `success`, `failed`, or `cancelled`.

You can watch all of this from the Run history view.

<!-- TODO: link "Run history" to its deep-dive page once it exists -->

## What you'll need

Before you build a workflow, you'll want at least:

- **A server registered in the Vault** — the target for any Action node that runs a script.
<!-- TODO: link "Vault" to its deep-dive page once it exists -->

- **Credentials linked to that server** — so the workflow can authenticate. Saved once, reused across every workflow.
- **A script** — written in Python, PowerShell, or Shell, in the built-in [Script editor](/quick-tour#script-editor). Or paste an existing one.

The credential and server live in the Vault precisely so you don't have to enter them every time. Pick the server in your Action node, and its credential is filled in automatically.

## Where workflows fit

Workflows are the entry point for almost everything AutoSage does. The dashboard, the run history, the Vault, the script editor — they all exist to support building, running, and debugging workflows.

A workflow is also the **unit of sharing and reuse**: you can duplicate a workflow, fork an execution template, or run the same workflow against different servers by swapping the Action node's target.

## What's next

- [Nodes & Edges — Overview](/workflows/nodes-and-edges/overview) — the building blocks in detail.
- [Trigger Nodes](/workflows/nodes-and-edges/trigger-nodes) — Manual, HTTP Webhook, and Job Scheduler.
- [Action Nodes](/workflows/nodes-and-edges/action-nodes) — Script and Email.
- [Decision Nodes](/workflows/nodes-and-edges/decision-nodes) — branching on true/false.
