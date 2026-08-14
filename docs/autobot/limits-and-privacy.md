---
sidebar_position: 8
title: Limits & Privacy
description: Autobot's quotas and rate limits, how your data and credentials are protected, and how to troubleshoot common issues.
---

# Limits, privacy & troubleshooting

This page covers the guard rails around Autobot — the limits that keep it fair and safe, the privacy guarantees behind it, and what to do when something looks off.

## Limits and quotas

Most of these limits are invisible in normal use — they only fire if something is misbehaving or you're a very heavy user.

| Limit | Default | Why it exists |
| --- | --- | --- |
| **Admin daily quota** | 30 chat turns / user / day | Keeps the shared LLM pool fair. [BYO](/docs/autobot/customizing#bring-your-own-llm-key) turns don't count toward this. |
| **Execution quota** | per user / day | Bounds real compute — how many runs you launch from chat. Applies even on BYO. See [below](#execution-quota). |
| **Burst rate** | 30 requests / minute | Catches runaway clients. Per user. |
| **Sustained rate** | 500 requests / day | Catches scripted abuse. Per user. |
| **Tool-call rounds per turn** | 10 | Stops the model looping forever on one message. A typical multi-step turn ("create a workflow with 3 scripts") is 5–6 rounds. |
| **Per-tool timeout** | 30 s read · up to ~10 min run | Read/write tools cap at 30 s; run tools (launching a workflow or script) get a longer ceiling because real execution takes time. |

If you hit the **admin daily quota**, the chat surface tells you and prompts you to set up a [BYO key](/docs/autobot/customizing#bring-your-own-llm-key). All other limits are normally invisible.

:::info These are Autobot-specific limits
The limits above govern Autobot's chat and execution behavior. Separate **plan limits** cap the number of workflows, scripts, triggers, and vault entries in your account — see [Plans & Pricing](/docs/plans/overview) for those.
:::

### Execution quota {#execution-quota}

Running scripts and workflows from chat (the [execution copilot](/docs/autobot/execution-copilot)) is metered by a **separate per-user daily quota** from the LLM admin quota. Two reasons it exists independently:

- **It bounds real compute, not tokens.** Even a [BYO](/docs/autobot/customizing#bring-your-own-llm-key) user with uncapped chat is still capped on how many actual runs they can launch in a day — so "uncapped chat" never becomes "uncapped execution against your servers".
- **It survives the failure-investigation loop.** When Autobot diagnoses and re-runs a failed job, the quota (together with the [run-once rule](/docs/autobot/execution-copilot#the-failure-investigation-loop)) keeps a debugging session from quietly burning through compute.

The execution quota isn't shown on the [dashboard](/docs/autobot/dashboard); if you reach it, the chat tells you. It ticks once per *run launched*, not per chat turn or tool round.

## Privacy & security

- **Your conversations are private to you.** Per-user data scoping is enforced server-side — no other AutoSage user can see your threads, generated scripts, or settings.
- **Same sign-in as the rest of AutoSage.** Autobot uses the same authentication you use everywhere else and verifies your identity on every request.
- **BYO API keys are encrypted at rest** using Fernet — the same encryption AutoSage uses for [Vault](/docs/key-vault) credentials. They're decrypted only in-memory at chat time, never logged, and never returned to the browser as plaintext.
- **Vault secrets stay in Vault.** Autobot can see resource **metadata** (names, ids, types) but never plaintext passwords, SSH keys, or certificates. Scripts and workflows it generates reference vault resources **by id** — the same way you'd build them by hand.
- **Your auth tokens never reach the logs.** A redaction filter strips authorization headers before any log line is written, so even at the most verbose logging level your session token doesn't land in a log file.

:::info Autobot acts as *you*
Every action Autobot takes runs under **your** identity. It can't reach anything you couldn't reach yourself through the normal UI — and it can't escalate its own privileges. That's why a resource you can't access is also invisible to Autobot.
:::

## How execution is gated

Autobot *can* run scripts and workflows — but running acts on real servers with real consequences, so it sits behind several deliberate gates:

- **Modes.** Reading and generating happen in Research and Generation mode. Running is only possible in [**execution mode**](/docs/autobot/execution-copilot#modes-research-generation-execution), which you switch into on purpose. Modes are enforced as a hard floor on the server — an execution tool is never even offered to the model in a lower mode, and refused if somehow invoked.
- **BYO-only.** Execution mode requires your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key). On the shared admin pool the execution button is hidden, and a request without a BYO key is refused (`execution_requires_byo`).
- **Confirm-before-fire.** A preview's **Run it now** button pre-fills the composer — launching is its own turn. You always get a beat to confirm.
- **Metered.** The [execution quota](#execution-quota) caps how many runs you can launch per day, and the failure loop re-runs at most **once** before asking you.

## Password safety

A `password`-typed parameter must **never** reach Autobot or the language model in plaintext. AutoSage closes every path with layered protection — see the [full breakdown](/docs/autobot/execution-copilot#password-safe-execution):

- **Stripped when read** — password values become `*****` before any workflow data reaches the model.
- **Stripped when run** — password inputs are dropped from a run request before it leaves the chat.
- **Server backstop** — the engine independently drops password inputs on any Autobot-triggered run.
- **Secure side-channel** — workflows that need a runtime password collect it through a form that sends the secret **browser → server over TLS**, never through Autobot. The model only ever knows the run's id.

:::info The secret never touches Autobot
For a runtime password, the value travels straight from your browser to the server. It never enters the Autobot service and never appears in the conversation thread. The handoff that links the two is single-use and expires within minutes. See the [secure password side-channel](/docs/autobot/execution-copilot#secure-password-side-channel).
:::

## Troubleshooting

**"Stats unavailable" on the Today card or Dashboard.**
The analytics endpoint is briefly unreachable. Refresh the page in a minute. The chat itself still works.

**The assistant says I've hit my daily quota.**
You've used your share of the shared admin pool for today. Either wait until **00:00 UTC** for the counter to reset, or connect your own LLM key in **Customize → LLM Configurations**. See [BYO](/docs/autobot/customizing#bring-your-own-llm-key).

**I can't find the execution-mode button / it says execution requires BYO.**
[Execution mode](/docs/autobot/execution-copilot) is only available with your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key) connected. Add one in **Customize → LLM Configurations** and set it as your default, then start (or continue in) a chat — the execution mode becomes available.

**Autobot says I've hit my execution limit.**
That's the [execution quota](#execution-quota) — separate from the LLM quota, it caps how many runs you launch per day (even on BYO). It resets daily. Until then, run from the [Run button](/docs/workflows/workflow-execution) in the UI, which isn't subject to it.

**A workflow asks me to fill in a password before it runs.**
That workflow has a runtime password parameter, so Autobot uses the [secure side-channel](/docs/autobot/execution-copilot#secure-password-side-channel): fill the form above your message box and click **Run securely**. The secret goes straight to the server, never through Autobot. The form expires after a few minutes — if it does, just ask to run again.

**A tool call fails with "permission denied" or "not found".**
Autobot is acting under your account. If you can't access a resource through the normal UI (script, workflow, vault), Autobot can't either. Make sure the resource exists and is owned by you.

**Streaming response cuts off mid-sentence.**
Your network may have closed the connection, or your sign-in session expired during a long tool-using turn. Refresh the page (or close and reopen the chat) and re-ask. The partial assistant message is dropped — only completed turns persist.

**The model picked the wrong provider / model.**
Open Customize, set the [BYO config](/docs/autobot/customizing#bring-your-own-llm-key) you want as the **default**, and start a **new** chat. Existing threads stick with the provider that was active when they were created.

**Generated workflow has the wrong trigger.**
Open it in the [workflow builder](/docs/workflows/workflow-editor-guide) and edit the trigger node, or ask Autobot in the same chat — *"change the trigger to a webhook"* — and it'll edit the workflow in place.

## Roadmap

Autobot already ships the chat foundation (generate scripts and workflows, BYO keys, usage dashboard, archived chats) **and** the [execution copilot](/docs/autobot/execution-copilot) (run, re-run, investigate, and fix, with live streaming and password safety). What's still ahead:

- **Docs assistant** — an Autobot widget embedded in this documentation site that can answer questions and search the docs, no sign-in required.
- **Cloud-infra tools** — AWS / Ansible / Vault cloud-secret support so Autobot can help with infrastructure changes, not just scripts and workflows.
- **Multi-modal input** — upload a screenshot of an error and ask "what's broken here?".
- **Retrieval over your script library** so suggestions can lean on patterns from your existing code.
- **Shareable / public threads.**

If you have feedback or hit a bug, raise it through the same channel you use for the rest of AutoSage.
