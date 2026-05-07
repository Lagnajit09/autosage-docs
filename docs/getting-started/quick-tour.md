---
slug: /quick-tour
sidebar_position: 2
title: Quick Tour
description: A five-minute walkthrough of every major area of AutoSage — the dashboard, workflows, the Vault, run history, and account settings.
---

# Quick Tour

This page is a brief walkthrough of every major area of AutoSage. Each section is a quick overview with a link to the detailed guide for that topic.

If you haven't signed up yet, start with [Create your account](/#create-your-account).

## Dashboard

The dashboard is what you land on after signing in. It gives you a high-level view of your account: recent workflow runs, quick links into the workflows list and Vault, and notifications about scheduled or failing runs.

![Dashboard](/img/screenshots/dashboard.png)
<!-- TODO: replace with real screenshot of the dashboard -->

<!-- TODO: add "Learn more → /dashboard" once the Dashboard page exists -->

## Workflows

The **Workflows** page lists every workflow in your account. From here you can create a new workflow, open an existing one to edit, duplicate or delete a workflow, and see its last run status at a glance.

![Workflows list](/img/screenshots/workflows-list.png)
<!-- TODO: replace with real screenshot of the workflows list -->

<!-- TODO: add "Learn more → /workflows" once the Workflows page exists -->

## Workflow editor

The workflow editor is the canvas where you assemble a workflow by dragging and connecting nodes. There are three node types:

- **Trigger** — *Manual*, *HTTP Webhook*, or *Cron Scheduler*. Every workflow starts with one.
- **Action** — *Script* (run a Python/PowerShell/Shell script on a server) or *Email* (send a notification).
- **Decision** — branches the flow on a true/false condition.

AutoSage uses a **one-node-one-server** model: each Action node points at exactly one server from your Vault. To run something across multiple servers in a single workflow, add one Action node per server — they execute in parallel where the graph allows.

![Workflow editor canvas](/img/screenshots/workflow-editor.png)
<!-- TODO: replace with real screenshot of the workflow editor -->

<!-- TODO: add "Learn more → /workflow-editor" once the Workflow editor page exists -->

## Script editor

The built-in script editor is where you write the script that an Action node runs. It supports **Python**, **PowerShell**, and **Shell**, with syntax highlighting for each. Scripts are saved alongside the workflow and versioned with it.

![Script editor](/img/screenshots/script-editor.png)
<!-- TODO: replace with real screenshot of the script editor -->

<!-- TODO: add "Learn more → /script-editor" once the Script editor page exists -->

## Vault

The **Vault** is where you store the things workflows need to connect to your servers:

- **Credentials** — usernames, passwords, SSH keys, and other secrets, saved once and reusable across workflows.
- **Servers** — the targets your Action nodes run against. Each server can be linked to a credential in the Vault, so when you pick the server in a workflow, its credential is filled in automatically.

This means you set up a server and its credential once, then reference it from any workflow without re-entering secrets.

![Vault](/img/screenshots/vault.png)
<!-- TODO: replace with real screenshot of the Vault -->

<!-- TODO: add "Learn more → /vault" once the Vault page exists -->

## Run history & logs

Every time a workflow fires, AutoSage records a **run** with its status (`queued`, `running`, `success`, or `failed`), the trigger that started it, and per-node output. While a run is in progress, stdout and stderr stream into your browser live; once it finishes, the full log bundle is preserved for later review.

![Run history](/img/screenshots/runs.png)
<!-- TODO: replace with real screenshot of run history -->

<!-- TODO: add "Learn more → /runs" once the Run history page exists -->

## Account & settings

Account settings live behind your profile menu. From here you can update your profile, manage sign-in methods, and sign out.

![Account settings](/img/screenshots/account.png)
<!-- TODO: replace with real screenshot of account settings -->

<!-- TODO: add "Learn more → /account" once the Account page exists -->

## What's next

- Haven't signed up yet? Start at [Create your account](/#create-your-account).
- Ready to go deeper? Each section above will link out to its detailed guide as the docs grow.
