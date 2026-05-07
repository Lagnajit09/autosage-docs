---
slug: /
sidebar_position: 1
title: Introduction
description: AutoSage is a server management and workflow automation platform. Run scripts on your servers manually, on a schedule, or via webhooks — all from one dashboard.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Introduction

Welcome to AutoSage.

<ThemedImage
  alt="AutoSage Landing Page"
  sources={{
    light: useBaseUrl('/img/screenshots/landing-light.png'),
    dark: useBaseUrl('/img/screenshots/landing-dark.png'),
  }}
/>

## What is AutoSage?

AutoSage is a platform for managing servers and automating routine work on them. You connect your servers, write scripts (in Python, PowerShell, or Shell), and arrange them into **workflows** — visual flowcharts where each step ("node") runs against one of your servers. AutoSage then runs those workflows on demand, on a schedule, or in response to a webhook, and streams the logs back to you in real time.

If you've used tools like n8n or Zapier, the workflow concept will feel familiar — but AutoSage is built specifically for server administration: each Action node is paired with a server, and every run is captured with full logs.

## What you can do

- **Build visual workflows** by connecting Trigger, Action, and Decision nodes on a canvas.
- **Write scripts in three languages** — Python, PowerShell, and Shell — using the built-in script editor.
- **Manage servers and credentials** in a central Vault, and link credentials to servers so they auto-fill when selected.
- **Run workflows on demand** from the dashboard, **on a schedule** with a cron expression, or **from external systems** via authenticated HTTP webhooks.
- **Watch executions live** — every run streams stdout and stderr back to your browser as it happens, with full logs preserved for later review.

## How AutoSage works

A **workflow** in AutoSage is a graph of three node types:

- **Trigger nodes** start a workflow. The trigger types are *Manual* (run from the UI), *HTTP Webhook* (run when a URL is hit), and *Cron Scheduler* (run on a recurring schedule).
- **Action nodes** do the work. The action types are *Script* (run a Python/PowerShell/Shell script on a server) and *Email* (send a notification).
- **Decision nodes** branch the flow based on a true/false condition — useful for "only continue if the previous step succeeded" patterns.

Each Action node targets exactly **one** server, which is why a single workflow can manage multiple servers in parallel: each node owns its own target. Servers and credentials live in the **Vault**, where you can save them once and reuse them across any workflow.

## Create your account

1. Go to **[autosagex.web.app/signup](https://autosagex.web.app/signup)**.
2. Sign up with email, Google, or GitHub. If you choose email, click the verification link sent to your inbox.
3. After verification, you're redirected to your dashboard.

Already have an account? Sign in at **[autosagex.web.app/signin](https://autosagex.web.app/signin)**.

<ThemedImage
  alt="AutoSage signup page"
  sources={{
    light: useBaseUrl('/img/screenshots/signup-light.png'),
    dark: useBaseUrl('/img/screenshots/signup-dark.png'),
  }}
/>
<!-- TODO: replace with real screenshot of /signup -->

## What's next

- [Quick Tour](/quick-tour) — a five-minute walkthrough of every part of the app.
<!-- TODO: add "Build your first workflow" tutorial link once that page exists -->

## Coming soon: Autobot

AutoSage will include a built-in AI assistant called **Autobot** that can generate scripts, draft workflows from a prompt, and help troubleshoot failing runs. Autobot is on the roadmap and is **not yet available** — this section will expand once it ships.
