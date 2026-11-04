---
slug: /quick-tour
sidebar_position: 2
title: Quick Tour
description: A brief walkthrough of the major areas of AutoSage — the dashboard, workflows, and the editors.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Quick Tour

This page is a brief walkthrough of the major areas of AutoSage. Each section is a quick overview with a link to the detailed guide for that topic.

If you haven't signed up yet, start with [Create your account](/docs/#create-your-account).

## Dashboard

The dashboard is what you land on after signing in. It gives you a high-level view of your account:

- **Autobot — today**: your Autobot requests, tokens and quota used since 00:00 UTC, with a link to the full [Autobot Dashboard](/docs/autobot/dashboard).
- **Totals** for your workflows, scripts and executions, with this month's activity.
- **Recent workflows and scripts**, and your **recent executions** with their status.
- On the right: **[SageCode](/sagecode/)** (an install prompt, or your connected devices once you've signed in from the terminal), **Autobot**, and your **plan**, with an Upgrade to Pro shortcut on the Free plan.

<ThemedImage
  alt="The AutoSage dashboard: the Autobot usage strip, totals for workflows, scripts and executions, recent workflows and scripts, and recent executions, with the SageCode, Autobot and Upgrade to Pro cards on the right"
  sources={{
    light: useBaseUrl('/img/screenshots/dashboard-light.png'),
    dark: useBaseUrl('/img/screenshots/dashboard-dark.png'),
  }}
/>

[Learn more → Dashboard](/docs/dashboard)

## Workflows

The **Workflows** page lists every workflow in your account. From here you can create a new workflow, open an existing one to edit, duplicate or delete a workflow, and see its last run status at a glance.

<ThemedImage
  alt="The Workflows page: tabs for all workflows, HTTP webhooks and job schedulers, a search box, and a grid of workflow cards, each with its node count, last change, and Edit and Run buttons"
  sources={{
    light: useBaseUrl('/img/screenshots/workflows-list-light.png'),
    dark: useBaseUrl('/img/screenshots/workflows-list-dark.png'),
  }}
/>

[Learn more → Workflows](/docs/workflows/what-is-a-workflow)

## Workflow editor

The workflow editor is the canvas where you assemble a workflow by dragging and connecting nodes. There are three node types:

- **Trigger** — *Manual*, *HTTP Webhook*, or *Job Scheduler*. Every workflow starts with one.
- **Action** — *Script* (run a Python/PowerShell/Shell script on a server) or *Email* (send a notification).
- **Decision** — branches the flow on a true/false condition.

AutoSage uses a **one-node-one-server** model: each Action node points at exactly one server. To run something across multiple servers in a single workflow, add one Action node per server — they execute in parallel where the graph allows.

<ThemedImage
  alt="The workflow editor canvas: a nightly schedule trigger runs a disk-usage check, a decision node branches on usage above 80%, and the branches clean old logs and send an email report or an all-clear email"
  sources={{
    light: useBaseUrl('/img/screenshots/workflow-editor-light.png'),
    dark: useBaseUrl('/img/screenshots/workflow-editor-dark.png'),
  }}
/>

[Learn more → Workflow Editor](/docs/workflows/workflow-editor-guide)

## Script editor

The built-in script editor is where you write the script that an Action node runs. It supports **Python**, **PowerShell**, and **Shell**, with syntax highlighting for each. Scripts are saved alongside the workflow and versioned with it.

<ThemedImage
  alt="The Script Editor: the Explorer list of scripts, disk_check.sh open in the editor, and the terminal panel below with server and credential pickers and the script's parameters"
  sources={{
    light: useBaseUrl('/img/screenshots/script-editor-light.png'),
    dark: useBaseUrl('/img/screenshots/script-editor-dark.png'),
  }}
/>
[Learn more → Script Editor](/docs/script-editor/editor-guide)

## Library

The **Library** is a catalog of pre-built workflows, nodes, and scripts curated by the AutoSage team. Browse by type (Workflows, Nodes, Scripts), search by name or tag, and fork anything you want to use. Forked workflows land in your Workflows page as drafts; forked scripts land in your Script library; copied nodes go straight to your clipboard for pasting into the Workflow Editor.

<ThemedImage
  alt="AutoSage Library page showing filter tabs and a grid of library item cards"
  sources={{
    light: useBaseUrl('/img/screenshots/library-light.png'),
    dark: useBaseUrl('/img/screenshots/library-dark.png'),
  }}
/>

[Learn more → Library](/docs/library/overview)

## Autobot

**Autobot** is the built-in AI assistant. It can answer questions about your account, generate scripts and full workflows from a prompt, and — in [execution mode](/docs/autobot/execution-copilot) — trigger runs directly from chat. Autobot is available from the left navigation and from a floating button inside the Workflow Editor.

[Learn more → Autobot](/docs/autobot-intro)

## SageCode

**SageCode** is the AutoSage command line. Install it once and run `sagex` to build and run workflows, scripts, webhooks and schedules from your terminal or a CI pipeline, signed in with the same account. Run `sagex` on its own for a full-screen terminal app.

![The SageCode terminal app: workflows, scripts, vault items, recent runs and triggers on the left, and a live workflow run drawn as a graph on the right](/img/sagecode/terminal-app.svg)

[Learn more → SageCode](/sagecode/)

## Profile

Your **Profile** (bottom of the left navigation) shows your account details, then four tabs:

- **Usage & Activity** — totals, recent executions and your most-run workflows.
- **Autobot** — your Autobot settings, models and today's usage.
- **SageCode** — every device and access token signed in to SageCode, with what each has done, and Revoke. See [Sessions & Access Tokens](/sagecode/getting-started/sessions-and-tokens).
- **Plans & Subscription** — your plan and how much of it you've used. See [Billing](/docs/plans/billing#plans--subscription-on-your-profile).

Below the tabs are quick links and your account controls (deactivate or delete).

## Plans & Pricing

AutoSage has three tiers — **Free**, **Pro**, and **Enterprise** — plus a **Pro Day Pass** for one-off 24-hour Pro access at ₹99. All new accounts start on Free with no credit card required. Pro unlocks higher resource limits and Autobot execution mode. The **Plans** page in the left navigation has the full comparison table and subscribe buttons.

[Learn more → Plans & Pricing](/docs/plans/overview)

## What's next

- Haven't signed up yet? Start at [Create your account](/docs/#create-your-account).
- Want reusable building blocks? Browse the [Library](/docs/library/overview).
- Ready to understand pricing? See [Plans & Pricing](/docs/plans/overview).
- Prefer the terminal? Start with [SageCode](/sagecode/getting-started/install).
- Each section above links out to its detailed guide.
