---
sidebar_position: 3
title: Script Actions
description: How Autobot reads, writes, saves, and runs Python, PowerShell, or shell scripts from a natural-language prompt.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Script actions

Autobot can act on your scripts directly from the chat — reading what you already have, writing new ones, and (in [execution mode](/docs/autobot/execution-copilot)) running them. It can **list** your scripts, **read** an existing script to explain or build on it, **create** or **update** scripts in **Python, PowerShell, or shell** — saving them straight into your [Script library](/docs/script-editor/editor-guide), owned by you — and **run** a script against a target server.

| Action            | What it does                                                                      | Mode       |
| ----------------- | --------------------------------------------------------------------------------- | ---------- |
| **List scripts**  | Surfaces the scripts in your library so suggestions match what you already have.  | Research   |
| **Read script**   | Pulls a script's contents to explain it, debug it, or use it as a starting point. | Research   |
| **Create script** | Writes a new script and saves it into your library.                               | Generation |
| **Update script** | Edits an existing script in place when you ask for changes.                       | Generation |
| **Run script**    | Executes a script on a target server and reports the result.                      | Execution  |

Reading and writing are available to everyone. **Running** requires [execution mode](/docs/autobot/execution-copilot) and your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key) — see [Running a script from chat](#running-a-script-from-chat) below.

<!-- <ThemedImage
alt="Autobot generating a script — the chat shows a 'Creating script' tool badge and the generated script body, which lands in the Script library"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-script-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-script-dark.svg'),
  }}
/> -->

## Two ways in

You can reach script generation from two places:

1. **From the chat** — just ask. _"Write me a Python script that pings a list of servers and prints any that are unreachable."_
2. **From the Script Editor** — the **Autobot button** in the bottom-right corner of the [editor](/docs/script-editor/editor-guide) opens a pre-filled Autobot thread focused on script generation. This is the natural entry point when you're already writing scripts and want a hand.

Both routes land you in the same chat surface; the editor button simply scopes the conversation toward scripts.

## What a good prompt looks like

Autobot writes better scripts when you tell it about the environment and the intent, not just the mechanics:

> _"A shell script for Ubuntu that rotates `/var/log/myapp/_.log` files older than 7 days, gzips them, and writes a one-line summary to stdout."\*

> _"A PowerShell script that checks the status of the `Spooler` service and restarts it if it's stopped. Print before/after state."_

Mention the **language** if you have a preference, the **target OS**, and any **conventions** you follow (header comments, exit codes, logging style). If you've set [custom instructions](/docs/autobot/customizing), Autobot already knows your defaults and will follow them.

## Saving into your library

When Autobot creates a script, you'll see an inline **tool badge** in the chat — e.g. _"Creating script: `ping_servers.py`"_ — and the script is saved into your Script library as it happens.

After that:

- Open the **Scripts** page (or the [Script Editor](/docs/script-editor/editor-guide)) and the new script is there, owned by you.
- It behaves exactly like a hand-written script: you can edit it, [run it against a server](/docs/script-editor/script-execution) from the editor terminal, or reference it from a workflow [Action node](/docs/workflows/nodes-and-edges/action-nodes).

:::warning Review before you run
Autobot generates a **first draft**. Read the script body before executing it — especially anything destructive (deletes, service restarts, `rm`). Whether you run it from the [editor terminal](/docs/script-editor/script-execution) or [ask Autobot to run it](#running-a-script-from-chat), the review is on you.
:::

## Iterating on a script

You don't have to get the prompt perfect the first time. Keep refining in the same thread:

> _"Now add a `--timeout` argument that defaults to 2 seconds."_

> _"Make it write the unreachable hosts to a file instead of stdout."_

Each turn updates the same conversation context, so Autobot remembers the script it just wrote and edits it in place rather than starting over.

## Running a script from chat

In [execution mode](/docs/autobot/execution-copilot), you can ask Autobot to **run** a script — not just draft it. It executes the script on a target server and shows you the result inline.

A script run needs four things wired up: the **script**, the **server**, the **vault**, and the **credential**. Name them precisely and Autobot resolves them for you:

> _"Run `disk-check.py` on `prod-db-1` using the `db-admin` credential."_

The run is asynchronous: Autobot launches it and hands you a **status card** that polls for the outcome (pending → running → completed/failed), with the logs available once it finishes. Unlike the [editor terminal](/docs/script-editor/script-execution), chat-initiated scripts don't stream token-by-token — you get a result card instead.

:::warning Execution mode is gated
Running a script requires [**execution mode**](/docs/autobot/execution-copilot#modes-research-generation-execution), which is only available with your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key) connected. In Research or Generation mode, Autobot drafts and saves the script — but won't run it. You can always run from the [editor terminal](/docs/script-editor/script-execution) instead.
:::

The full mechanics — modes, the Run Panel, investigating failures, and the security model — live on the [Execution copilot](/docs/autobot/execution-copilot) page.

## What's next

- [Execution copilot](/docs/autobot/execution-copilot) — running scripts and workflows, and investigating failures.
- [Workflow actions](/docs/autobot/autobot-workflow) — chain scripts together into a runnable graph.
- [Script Editor guide](/docs/script-editor/editor-guide) — where generated scripts live, and how to edit and run them.
- [Action Nodes](/docs/workflows/nodes-and-edges/action-nodes) — how a workflow node runs a script.
