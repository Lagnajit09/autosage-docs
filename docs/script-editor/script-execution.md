---
sidebar_position: 2
title: Script Execution
---

# Script Execution

The Script Editor lets you run a **single script against a single server** directly from the editor — no workflow required. It's the fastest way to try a script out, validate behavior on a target server, or debug interactively.

:::info Multi-server support coming soon
Today, the editor's terminal runs one script on **one** server at a time. Support for executing a single script against **multiple servers** from the same terminal is planned for a future version.
:::

## Opening the Execution Terminal

Click the **Terminal** button in the **top navbar** of the Script Editor. A dedicated **read-only terminal** opens at the bottom of the page.

At the top of the terminal you'll find two selectors:

- **Server** — pick the target server from your [Vault](/key-vault).
- **Credential** — pick the credential to authenticate with on that server.

Once both are selected, click the **Run** button. The script starts executing on the chosen server, and its logs **stream back asynchronously** into the terminal as they happen.

:::warning Save before you run
The terminal executes the **last saved version** of your script — not what's currently on screen. If you've made unsaved edits, hit **save first**, otherwise you'll be running an older version and likely chasing a confusing error.
:::

## What the editor terminal does not support

The editor's terminal is intentionally minimal. It deliberately **does not** support:

- **Parameters** — `{{param_name}}` tokens are not substituted here.
- **Template variables** — any templated values must be hard-coded into the script before running.
- **Multiple scripts** chained together.
- **Multiple servers** in a single run.

If you need any of these, build a **[workflow](/workflows/what-is-a-workflow)** instead. Workflows are where parameters, multi-step execution, and multi-server targeting all live.

## Viewing past executions

Single-script runs from the editor are logged in their own history, separate from workflow runs.

Click the **Executions** button in the **top navbar** to open the **single-script execution history** modal. From here you can browse past runs and review their outputs.
