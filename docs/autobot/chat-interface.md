---
sidebar_position: 2
title: Chat Interface
description: The Autobot chat surface — real-time token streaming, inline tool-call badges, and managing threads, history, and archived conversations.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# The chat interface

The chat surface is where you talk to Autobot. It's a familiar back-and-forth: you type a message, Autobot replies, and the whole exchange is kept as a **thread** you can return to later.

<!-- <ThemedImage
alt="The Autobot chat interface, showing the History panel on the left, the conversation in the center with an inline tool-call badge, and the message input at the bottom"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-chat-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-chat-dark.svg'),
  }}
/> -->

The page has two main regions:

- **History panel** (left) — your list of conversations, newest first.
- **Conversation + input** (center/bottom) — the message stream and the box where you type.

## Real-time streaming

Autobot's answers don't arrive all at once — they **stream in token-by-token**, so you see the reply forming as the model generates it. This matters most on longer answers and multi-step tasks: you get immediate feedback instead of staring at a spinner.

:::note If a stream cuts off
A streamed reply can be interrupted if your network drops the connection or your sign-in session expires during a long turn. The partial message is **discarded** — only completed turns are saved. Just refresh and re-ask. See [troubleshooting](/docs/autobot/limits-and-privacy#troubleshooting).
:::

## Inline tool-call badges

When Autobot does something beyond talking — reading your library, creating a script, building a workflow — it uses a **tool**, and you see that happen inline. A badge appears in the conversation, for example:

> 🔧 _Creating script: `ping_servers.py`_

> 🔧 _Listing your workflows_

The result of the tool appears immediately after the badge, and then Autobot continues its reply. This makes its actions transparent: you always know _what_ it touched and _when_, rather than getting a finished artifact with no trace of how it got there.

A single message can trigger several tool calls in a row (for example, "create a workflow with three scripts" might list your scripts, create each one, then assemble the workflow). Each one shows its own badge. There's a built-in ceiling on how many rounds one message can take — see [Limits](/docs/autobot/limits-and-privacy#limits-and-quotas).

## Modes

Each chat runs in one of three **modes**, which control how much Autobot is allowed to do. You pick the mode in the chat, and it acts as a hard floor — Autobot is never offered an action above the current mode.

| Mode           | What it unlocks                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Research**   | Read-only: list and read scripts/workflows, look up vault metadata, investigate past runs. |
| **Generation** | Research **plus** creating and updating scripts and workflows.                             |
| **Execution**  | Generation **plus** running, re-running, and investigating live runs.                      |

Research and Generation are available to everyone. **Execution mode is gated** — it requires your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key), and its button is hidden until you've connected one. Everything execution mode unlocks is covered on the [Execution copilot](/docs/autobot/execution-copilot) page.

:::tip Pick the lowest mode that does the job
Staying in Research or Generation when you're only reading or drafting keeps you well clear of anything that touches real servers. Switch up to Execution deliberately, when you actually want to run something.
:::

## Threads, history, and archive

Every conversation is a **thread**. Threads keep full history, so you can pick one back up days later with all the context intact.

### Active chats

The **History** panel lists your active threads, newest first. Each row has a `⋯` menu:

| Action      | What it does                                              |
| ----------- | --------------------------------------------------------- |
| **Rename**  | Change the auto-generated title to something memorable.   |
| **Archive** | Hide the thread from the active list — without losing it. |
| **Delete**  | Permanently remove the thread and all its messages.       |

:::caution Delete is permanent
**Archive** hides a thread; **Delete** destroys it. If you might want to revisit a conversation later, archive it instead of deleting.
:::

### Archived chats

Archiving doesn't delete. Archived threads stick around so you can revisit decisions or copy a turn into a new chat.

- Open the **[Autobot Dashboard](/docs/autobot/dashboard)** and click **View archived chats**.
- From the archived view, each thread can be **Unarchived** (returns it to History) or **Deleted**.
- You can still **open** an archived thread to read it, but you **can't send new messages** to it. The chat surface shows a read-only banner with an **Unarchive** button — click it to resume the conversation.

:::info Where the Archived page lives
The Archived Chats page is intentionally **not** in the main navigation. It's reachable only from the dashboard, to keep your sidebar focused on active work.
:::

## What's next

- [Script actions](/docs/autobot/autobot-script) — what the "creating script" badge actually does.
- [Execution copilot](/docs/autobot/execution-copilot) — what execution mode unlocks: running, watching, and fixing runs.
- [Customizing Autobot](/docs/autobot/customizing) — set a tone, expertise level, or per-thread override.
