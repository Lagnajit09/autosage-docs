---
sidebar_position: 2
title: Using Library Items
description: Fork workflows, copy nodes, and fork scripts from the AutoSage Library into your own account.
---

# Using Library Items

The Library provides three fork actions — one per usable item type. Each action creates a personal copy you own and can modify freely.

## Use Workflow {#use-workflow}

**"Use Workflow"** forks a Library workflow into your account as a new draft workflow.

1. Find the workflow you want in the Library and click **Use Workflow**.
2. AutoSage copies the full node and edge graph into your account.
3. **Vault credential bindings are stripped.** Any server, vault, or credential references in Action nodes are cleared — they belonged to the Library item's author and are not accessible to you.
4. The new workflow appears on your **Workflows** page as a draft with the original name.
5. Open it in the [Workflow Editor](/docs/workflows/workflow-editor-guide), configure each Action node with your own vault resources, then save and run.

<!-- TODO: add screenshot of a forked workflow open in the editor -->

:::tip Set up vault resources first
Before forking a workflow that connects to servers, make sure the required servers and credentials are already saved in your [Key Vault](/docs/key-vault). Re-linking them is the main configuration step between "forked" and "runnable."
:::

## Copy Node {#copy-node}

**"Copy Node"** copies a pre-configured node's settings to your clipboard — nothing is saved to your account until you paste it.

1. Click **Copy Node** on a Library node card.
2. AutoSage serializes the node configuration (type, label, settings, and script bindings) to your clipboard.
3. Open any workflow in the **Workflow Editor** and press **Ctrl+V** (or **Cmd+V** on Mac) — the node appears on the canvas with all its settings pre-filled.
4. Drag it into position, connect edges, and adjust server or credential bindings as needed.

:::tip Paste onto the canvas
The pasted node appears at the center of the visible canvas area. If you don't see it immediately, scroll or zoom out — it may have landed off-screen if your view is panned far from center.
:::

## Fork Script {#fork-script}

**"Fork Script"** creates a copy of a Library script body in your personal Script library.

1. Click **Fork Script** on a Library script card.
2. AutoSage copies the script's name, language (PowerShell, Shell, or Python), and full body into your account. If a script with the same name already exists in your library, the fork is given a unique name automatically.
3. The new script appears in your **Script library** and opens immediately in the [Script Editor](/docs/script-editor/editor-guide).

:::info You own your fork
Your forked copy is completely independent of the Library original. Changes you make do not affect the Library item, and any future updates to the Library item do not flow back to your copy.
:::

## Plan limits on forking

Fork actions respect your plan's resource limits:

| Action | Limit checked |
|---|---|
| Use Workflow | Your current workflow count vs. your plan's workflow limit |
| Fork Script | Your current script count vs. your plan's script limit |
| Copy Node | No limit — nodes are clipboard content, not stored resources |

If you have reached your plan limit, the fork action is blocked and AutoSage displays an upgrade prompt linking to the [Plans page](/docs/plans/overview).

:::warning Limits are checked at fork time
On the Free plan the workflow limit is 5 and the script limit is 10. If you are at the limit, "Use Workflow" and "Fork Script" will be blocked until you delete an existing item or upgrade to Pro.
:::

## What's next

- [Library overview](/docs/library/overview) — browse, search, and learn what's in the catalog.
- [Workflow Editor Guide](/docs/workflows/workflow-editor-guide) — finish configuring a forked workflow.
- [Script Editor](/docs/script-editor/editor-guide) — edit and run a forked script.
- [Plans & Pricing](/docs/plans/overview) — upgrade to raise your workflow and script limits.
