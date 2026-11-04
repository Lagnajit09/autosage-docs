---
slug: /dashboard
sidebar_position: 3
title: Dashboard
description: What the AutoSage dashboard shows — Autobot usage, account totals, recent workflows, scripts and executions, and the SageCode, Autobot and plan cards.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Dashboard

The **Dashboard** is the page you land on after signing in, and the first item in the left navigation. It shows how your automation is doing at a glance and gets you to everything else in one click.

<ThemedImage
  alt="The AutoSage dashboard: the Autobot usage strip, totals for workflows, scripts and executions, recent workflows and scripts, and recent executions, with the SageCode, Autobot and Upgrade to Pro cards on the right"
  sources={{
    light: useBaseUrl('/img/screenshots/dashboard-light.png'),
    dark: useBaseUrl('/img/screenshots/dashboard-dark.png'),
  }}
/>

## Autobot — today

The strip at the top shows your [Autobot](/docs/autobot-intro) usage since **00:00 UTC**: **requests**, **tokens**, and your **quota** — how many of today's chat turns on the shared AI key you've used. Click **View full Dashboard** for the [Autobot Dashboard](/docs/autobot/dashboard), with 7-day and all-time history.

If the strip says **"Stats unavailable"**, the analytics service is briefly unreachable; Autobot itself still works.

## Your totals

Three cards count what's in your account:

| Card | What it counts |
|---|---|
| **Total Workflows** | Every workflow you have, and how many were active this month |
| **Total Scripts** | Every script in your library, and how many were active this month |
| **Total Executions** | Every script and workflow run, and how many ran this month |

How many of each your plan allows is on the [Plans](/docs/plans/overview) page.

## Recent activity

- **Recent Workflows** — the workflows you changed most recently, with their node counts. Click one to open it in the [Workflow Editor](/docs/workflows/workflow-editor-guide), or **View All** for the Workflows page.
- **Recent Scripts** — the scripts you changed most recently. Click one to open it in the [Script Editor](/docs/script-editor/editor-guide), or **View All** for the editor.
- **Recent Executions** — the latest runs, each with a green (succeeded) or red (failed) dot, how long it took and when. **View Logs** opens [Execution Logs](/docs/execution-logs).

## The cards on the right

- **SageCode** — the AutoSage command line. Until you've used it, the card shows the install command and a link to the SageCode site. Once you've signed in from a terminal it says **Connected**, with how many devices and access tokens you have and when one was last active; **Manage devices** opens the [SageCode tab of your profile](/sagecode/getting-started/sessions-and-tokens).
- **Meet Autobot** — opens a chat with [Autobot](/docs/autobot-intro).
- **Your plan** — a thin bar under the two cards. On the Free plan it's **Upgrade to Pro**, which opens the [Plans](/docs/plans/overview) page. On a paid plan it shows the plan and when it renews, and opens [Billing](/docs/plans/billing).

On narrower screens these cards move above the rest of the dashboard, so they're always visible without scrolling.

## A new account

Until you've created anything, the dashboard shows **Welcome to AutoSage** in place of the totals and recent lists, with two buttons: **Build Your First Workflow**, which opens the Workflow Editor, and **Read Docs**.

## Top bar

The icons in the top right are **Help & Support** (the [FAQ and contact](https://autosagex.web.app/faq) page), **Vault** (opens the [Key Vault](/docs/key-vault) without leaving the page), the light / dark theme toggle, and your account menu.
