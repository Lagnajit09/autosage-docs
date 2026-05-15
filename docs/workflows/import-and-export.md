---
sidebar_position: 4
title: Import and Export
description: How to move a workflow between accounts or save it to disk. Workflows are imported and exported as JSON, with a quick caveat about what's actually preserved.
---

# Import and Export

A workflow's **structure** — its nodes, their positions, and the edges between them — is portable. AutoSage lets you **export** a workflow to a JSON document and **import** that JSON back into the editor on the same or a different account.

Both directions work in **JSON format only**. There is no proprietary binary format, and there is no separate "share link" — the JSON document _is_ the shareable artifact.

Use this to:

- **Share a workflow with a teammate.** Export, send them the JSON, have them import.
- **Move a workflow between accounts.** Same flow as sharing.
- **Back up a workflow.** Export the JSON and keep it in version control or a backup store.
- **Bootstrap from a template.** Import a JSON your team maintains as a starting-point and tweak from there.

## Importing a workflow

Open the **Import workflow** dialog from the [toolbar](/workflows/workflow-editor-guide#import-workflow) in the workflow editor. The dialog has **two ways** to provide the workflow definition:

- **Upload a JSON file** — pick an exported workflow file from your computer.
- **Paste JSON** — paste the workflow JSON directly into the textarea below the upload option.

Either path produces the same result: AutoSage parses the JSON and reconstructs the nodes and edges on the canvas.

:::note Required JSON shape
For an import to succeed, the JSON must contain valid **`nodes`** and **`edges`** arrays:

- Every node needs at least `id`, `type`, `position`, and `data`.
- Every edge needs at least `id`, `source`, and `target`.

The cleanest way to make sure your JSON has the right shape is to **start from an exported workflow** rather than hand-writing the document.
:::

:::caution Import only restores the design, not the configuration
A workflow JSON stores the **structure** — nodes, edges, and references by ID — but not the underlying resources those references point to. After importing, AutoSage will:

- Recreate every node and edge on the canvas.
- **Leave configuration fields blank** wherever the referenced ID (a Vault entry, a credential, a saved script) doesn't exist in your account.

You'll need to **manually re-link** these on each affected node before the workflow can run. This typically means picking the right server, credential, or script from your own Vault — the labels and connections are preserved, but the bindings have to be set again.
:::

## Exporting a workflow

Exporting is done from the **canvas itself**, not the toolbar. **Right-click** anywhere on empty canvas space and you'll see two export options in the context menu:

- **Copy Workflow** — copies the workflow's JSON to your clipboard. Paste it straight into a teammate's Paste JSON box, a chat message, a gist, or a file.
- **Export Workflow JSON** — downloads the workflow as a `.json` file to your computer. Good when you want a file on disk to commit, archive, or attach to something.

Both options produce the **same JSON document** — the only difference is where it ends up (clipboard vs. file).

### Round-tripping a workflow

A workflow exported from one account and imported into another won't run as-is — the [caveat above](#importing-a-workflow) applies. Expect to:

1. Import the JSON.
2. Walk each Action node and re-pick the server, credential, and script from **your** Vault.
3. Save the workflow under a name in this account.
4. Test-run it before relying on it.

The structure travels with the JSON; the bindings to your account's resources don't.
