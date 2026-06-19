---
sidebar_position: 4
title: Workflow Actions
description: How Autobot reads, drafts, and runs workflow graphs from a plain-language description — saving them as drafts you review, then executing them live from chat.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Workflow actions

Autobot can act on your workflows directly from the chat — reading what you already have, drafting new ones, and (in [execution mode](/docs/autobot/execution-copilot)) running them. It can **list** your workflows, **read** an existing workflow to explain or audit it, **create** or **update** a full **[workflow](/docs/workflows/what-is-a-workflow)** — the node-and-edge graph, the trigger, the script actions — saving it as a **draft** for you to review, and **run** or **re-run** it with a live view of the execution.

| Action | What it does | Mode |
| --- | --- | --- |
| **List workflows** | Surfaces the workflows in your account (e.g. "which ones have no trigger?"). | Research |
| **Read workflow** | Pulls a workflow's node graph to explain it, audit it, or build on it. | Research |
| **Create workflow** | Drafts a new workflow graph and saves it as a draft. | Generation |
| **Update workflow** | Edits an existing workflow in place when you ask for changes. | Generation |
| **Preview / Run / Re-run workflow** | Previews a run, launches it, or re-runs a previous one — with a live Run Panel. | Execution |

Reading and drafting are available to everyone. **Running** requires [execution mode](/docs/autobot/execution-copilot) and your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key) — see [Running a workflow from chat](#running-a-workflow-from-chat) below.

<ThemedImage
alt="Autobot generating a workflow — the chat shows a 'Creating workflow' tool badge, and the resulting node/edge graph is saved as a draft on the Workflows page"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-workflow-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-workflow-dark.svg'),
  }}
/>

## Two ways in

1. **From the chat** — describe the automation end to end.
2. **From the workflow builder** — the **Autobot button** in the bottom-right corner of the [editor](/docs/workflows/workflow-editor-guide#autobot-button) opens a pre-filled Autobot thread scoped to workflow generation.

## Describing a workflow

A good workflow prompt names the **trigger**, the **steps**, the **targets**, and any **notification**:

> *"Build a workflow: every weekday at 7am UTC, run `db-backup.sh` on `prod-db-1`, and email me when it finishes."*

> *"When my webhook fires, run `deploy.sh` on `staging-1`. If it exits non-zero, email the on-call address; otherwise run `smoke-test.sh` on the same server."*

From a description like that, Autobot assembles the matching pieces:

- A **[trigger node](/docs/workflows/nodes-and-edges/trigger-nodes)** — manual, HTTP webhook, or a cron schedule (it'll translate "every weekday at 7am UTC" into the right schedule).
- One or more **[action nodes](/docs/workflows/nodes-and-edges/action-nodes)** — script runs and email steps, wired to the servers and credentials you named.
- **[Decision nodes](/docs/workflows/nodes-and-edges/decision-nodes)** where you describe branching ("if it fails, …").
- The **edges** connecting them in the right order.

:::tip Name your real resources
If you say "run on `prod-db-1` with the `db-admin` credential", Autobot looks those up in your [Vault](/docs/key-vault) (by name and id — never the secret values) and wires the action node to them. Vague targets like "the database server" leave the node unconfigured, and you'll have to fill it in by hand in the builder.
:::

## Where the workflow lands — and why it's a draft

When Autobot builds a workflow, you'll see an inline **tool badge** — e.g. *"Creating workflow: Nightly DB backup"* — and the new workflow appears on your **Workflows page**.

It's saved as a **draft**, not run. Open it in the [workflow builder](/docs/workflows/workflow-editor-guide) to:

- Review the **node graph** — confirm the steps and order match what you intended.
- Check the **trigger** — schedules, webhooks, and timezones are easy to misread from prose, so verify the trigger node.
- Confirm **server and credential bindings** on each action node.

Once it looks right, run it from the [workflow execution page](/docs/workflows/workflow-execution) — or ask Autobot to run it for you in [execution mode](#running-a-workflow-from-chat).

:::warning Review the draft before running it
Schedules, webhooks, and timezones are easy to misread from prose, and an action node bound to the wrong server is a real-world mistake. Open a generated workflow in the [builder](/docs/workflows/workflow-editor-guide) and confirm the graph before running it — whether you run from the Run button or from chat.
:::

## Iterating on a workflow

Refine in the same thread and Autobot edits the workflow in place:

> *"Change the trigger to a webhook instead of a schedule."*

> *"Add a step before the backup that checks free disk space, and skip the backup if it's under 10%."*

This is often faster than fixing the graph by hand — though for fine-grained tweaks, the [builder](/docs/workflows/workflow-editor-guide) is always right there.

## Running a workflow from chat

In [execution mode](/docs/autobot/execution-copilot), Autobot can launch a workflow and let you watch it run. A few things make this safe and predictable:

- **Preview first.** Ask for a preview and Autobot reports the targets, masked inputs, and whether the run is ready — without launching anything. The **Run it now** button on the preview pre-fills your composer, so the run is a separate, deliberate turn.
- **Live Run Panel.** When the run starts, a drawer streams it live — a colour-coded copy of your workflow graph plus the streaming logs, the same view as the [workflow execution page](/docs/workflows/workflow-execution).
- **Re-run in one step.** Ask Autobot to re-run a previous workflow and it re-queues the same run; duplicate re-runs are de-duplicated into one.
- **Investigate and fix.** If a run fails, Autobot can read the failing node's logs, explain the cause, propose a single fix, apply it, and re-run once.

> *"Run the Nightly DB backup workflow."*

> *"That run failed — what went wrong, and can you fix it?"*

:::warning Execution mode is gated
Running a workflow requires [**execution mode**](/docs/autobot/execution-copilot#modes-research-generation-execution), which is only available with your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key) connected. In Research or Generation mode, Autobot drafts and saves the workflow — but won't run it. A workflow that needs a runtime password uses a [secure side-channel](/docs/autobot/execution-copilot#secure-password-side-channel) so the secret never passes through Autobot.
:::

The full mechanics — modes, the Run Panel tabs, the failure-investigation loop, and password safety — live on the [Execution copilot](/docs/autobot/execution-copilot) page.

## What's next

- [Execution copilot](/docs/autobot/execution-copilot) — running, watching, investigating, and fixing workflow runs.
- [What is a workflow?](/docs/workflows/what-is-a-workflow) — the concepts behind the graph Autobot builds.
- [Workflow Editor guide](/docs/workflows/workflow-editor-guide) — review and edit the draft.
- [Workflow Execution](/docs/workflows/workflow-execution) — run the workflow once you're happy with it.
