---
slug: /autobot-intro
sidebar_position: 1
title: Introduction
description: Autobot is AutoSage's built-in AI assistant — it chats with you, generates scripts and workflows, and reads your existing automation library to give grounded answers.
---

# Autobot

**Autobot** is AutoSage's built-in AI assistant. It chats with you, generates scripts and workflows, helps you reason about your automation library, and reads from your existing setup to give grounded answers — all from inside your AutoSage account.

Think of it as a copilot for automation. You describe what you want in plain language; Autobot writes the script or drafts the workflow, saves it into your library with one click, and explains its reasoning along the way. With your own LLM key connected, it can go further — **running** your automation, watching it stream live, and helping you diagnose and fix failures.

:::tip This section is for *using* Autobot
These pages walk through Autobot from a user's perspective. If you're after the architecture (service topology, internal APIs, deploy pipeline), that lives in the product repo's engineering docs, not here.
:::

## What Autobot can do

- **Chat about automation** — ask how to approach a problem, get an explanation of a script you already have, or brainstorm a workflow design.
- **[Generate scripts](/docs/autobot/autobot-script)** — Python, PowerShell, or shell. Autobot writes them and saves them straight into your Script library, ready to drop into a workflow.
- **[Generate workflows](/docs/autobot/autobot-workflow)** — describe what you want ("every weekday at 7am, run the cleanup script on staging-1, then email me"), and Autobot builds the node/edge graph and saves it as a draft.
- **[Run scripts and workflows](/docs/autobot/execution-copilot)** — in **execution mode** (with your own LLM key), Autobot can launch a run, watch it stream live in the Run Panel, investigate failures, and propose a fix.
- **Read your existing library** — it can list your scripts, workflows, vaults, servers, and credentials so its suggestions match what you already have. It references vault resources by **name and id only** — it never sees secret values.
- **Stream responses in real time** — answers appear token-by-token, and tool calls (like "creating script…") show up inline as they happen.
- **Remember the conversation** — each thread keeps full history. Older turns get summarized automatically when a chat gets long, so it stays coherent without blowing the model's context window.

## Where Autobot draws the line

Some boundaries are deliberate, not missing features:

- **Execution is gated.** Autobot *can* run automation, but only in [**execution mode**](/docs/autobot/execution-copilot#modes-research-generation-execution), and only when you've connected your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key). Reading and generating are always available; running is something you switch into on purpose.
- It will **not reveal vault secrets** to you or to the model. Credentials are referenced by id only, and a runtime password travels [browser-to-server directly](/docs/autobot/execution-copilot#secure-password-side-channel) — never through Autobot.
- It does **not** manage cloud infrastructure, write Ansible playbooks, or upload files. (Cloud-infra tooling is on the [roadmap](/docs/autobot/limits-and-privacy#roadmap).)

:::info Autobot acts under *your* identity
Autobot can only touch resources you could reach yourself through the normal UI, and it can't escalate its own privileges. Running automation — the most consequential action — sits behind an explicit mode switch and your own LLM key. See [Limits & Privacy](/docs/autobot/limits-and-privacy) for the full reasoning.
:::

---

## Getting started

Here's how to go from "where is it?" to "it just built something for me" in three steps.

### 1. Open Autobot

From the **left navigation**, click **Autobot**. You'll land on the chat surface.

- **Start a new chat** — type into the input at the bottom. Your first message creates a new thread, and the thread title is auto-generated from your prompt.
- **Open an existing chat** — pick one from the **History** panel on the left.

There are two Autobot entries in the left navigation: **Autobot** (the chat surface) and **Autobot Dashboard** (your [usage analytics](/docs/autobot/dashboard)).

### 2. Ask for what you want

Autobot understands plain language. The more specific you are about your environment, the better the result. Some prompts that work well:

> *"Write me a Python script that pings a list of servers and prints any that are unreachable."*

> *"Show me the workflows I have and tell me which ones don't have a trigger configured."*

> *"Build a workflow: every weekday at 7am UTC, run `db-backup.sh` on `prod-db-1`, and email me when it finishes."*

> *"What does the script `cleanup-logs.py` actually do? Walk me through it."*

> *"I have a credential called `aws-readonly` — which workflows use it?"*

When Autobot performs an action — creating a script, building a workflow, listing your library — you'll see an **inline badge** (e.g. *"Creating script: ping_servers.py"*) and the result appears immediately afterward. The mechanics of those badges and the live token stream are covered in [Chat interface](/docs/autobot/chat-interface).

:::tip Mention names of things that exist
Script names, workflow names, credential names — say them. Autobot can read your library, but only when prompted to. "Run on `prod-db-1`" works far better than "run on the database server", because Autobot can look `prod-db-1` up in your [Vault](/docs/key-vault) and wire in the right credential.
:::

### 3. Find what Autobot built

Whatever Autobot creates lands in the **same place you'd find it if you built it by hand** — it isn't tucked away in the chat.

- **Scripts** land in your normal **Script library**. Open the [Script Editor](/docs/script-editor/editor-guide) and they'll be there, owned by you. See [Script actions](/docs/autobot/autobot-script).
- **Workflows** land on your **Workflows page** as **drafts**. Open them in the [workflow builder](/docs/workflows/workflow-editor-guide) to review the node graph before running them. See [Workflow actions](/docs/autobot/autobot-workflow).

:::warning Trust, but verify
Autobot generates first drafts. Review a script body before running it, and open a generated workflow in the builder to check the node graph and triggers. The chat is a copilot, not autopilot. Even when you let Autobot [run](/docs/autobot/execution-copilot) something, you stay in the loop — runs are opt-in, metered, and you confirm before they fire.
:::

## Tips for good results

- **Be specific about your environment.** Name the exact server, the exact credential, the exact constraint ("UTC only", "Python over shell").
- **Iterate.** Ask for a draft, then refine in the same thread — *"now add error handling"*, *"use the `aws-readonly` credential instead"*. Each turn builds on the last.
- **For running and long debugging sessions, use [BYO](/docs/autobot/customizing#bring-your-own-llm-key).** [Execution mode](/docs/autobot/execution-copilot) requires your own provider key, and tool-using chats (especially workflow generation) can burn tokens quickly. The shared admin quota is a starter; heavy users should plug in their own key.

## How this section is organized

| Page | What it covers |
| --- | --- |
| [Chat interface](/docs/autobot/chat-interface) | The chat surface, streaming, tool badges, modes, threads, history, and archive. |
| [Script actions](/docs/autobot/autobot-script) | How Autobot reads, writes, saves, and runs scripts. |
| [Workflow actions](/docs/autobot/autobot-workflow) | How Autobot drafts, saves, and runs workflow graphs. |
| [Execution copilot](/docs/autobot/execution-copilot) | Running, watching, investigating, and fixing runs — modes, the Run Panel, and password safety. |
| [Customizing & LLM keys](/docs/autobot/customizing) | Tone, expertise, language, custom instructions, per-thread overrides, and connecting your own provider key (BYO). |
| [The Autobot Dashboard](/docs/autobot/dashboard) | Usage buckets, model breakdown, and your remaining quota. |
| [Limits & Privacy](/docs/autobot/limits-and-privacy) | Quotas, rate limits, privacy, security, and troubleshooting. |
