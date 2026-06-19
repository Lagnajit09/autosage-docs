---
sidebar_position: 7
title: The Autobot Dashboard
description: Track your Autobot usage — request and token counts across Today, Last 7 days, and All-time, a model-usage breakdown, and your remaining admin quota.
---

# The Autobot Dashboard

Open **Autobot Dashboard** from the left navigation to see how you're using Autobot — how many requests and tokens, which models, and how much of your daily quota is left.

## Usage buckets

The dashboard shows your usage across three time windows:

| Bucket | What it shows |
| --- | --- |
| **Today** | Requests, total tokens, average tokens per request, the admin vs BYO token split, models used, and your remaining admin quota. |
| **Last 7 days** | The same shape, over a rolling 7-day window. |
| **All-time** | Lifetime totals since you first used Autobot. |

The **admin vs BYO split** is worth watching: it separates tokens spent on the shared pool from tokens on your own [BYO key](/docs/autobot/customizing#bring-your-own-llm-key). If most of your usage is admin and you're hitting the quota, that's your cue to plug in a BYO config.

## Model-usage breakdown

A **model usage** chart breaks down which provider/model handled how many turns. This is most useful when you have BYO configs across multiple providers and want to know which one you actually rely on day to day.

## The admin-quota tile

On the **Today** bucket, an **admin quota** tile shows your `used / limit` with a progress bar:

- **Amber** at 80% — you're getting close.
- **Red** at 100% — you've hit the cap for today.

The tile **hides itself** if you're on BYO exclusively, since the admin limit is effectively zero for you in that case.

:::info Where the quota resets
The admin quota resets at **00:00 UTC**. If you're capped and don't want to wait, set up a [BYO key](/docs/autobot/customizing#bring-your-own-llm-key) — BYO turns don't count against the admin quota.
:::

:::note The execution quota is separate
The admin quota on this tile is about **LLM usage** on the shared pool. Actually *running* scripts and workflows from chat is metered by a **separate execution quota** that applies even to [BYO](/docs/autobot/customizing#bring-your-own-llm-key) users (so uncapped chat never means uncapped compute). It isn't shown on this dashboard — if you hit it, the chat tells you. See [the execution quota](/docs/autobot/limits-and-privacy#execution-quota).
:::

## Getting to archived chats

The dashboard is also the **only** entry point to your [archived chats](/docs/autobot/chat-interface#archived-chats). Click **View archived chats** to open the archived view, where you can unarchive or delete old threads. This is intentional — it keeps the archived list out of your main sidebar.

## A note on "Stats unavailable"

If a usage card or the dashboard shows **"Stats unavailable"**, the analytics endpoint is briefly unreachable. Refresh in a minute. The **chat itself still works** — only the stats are temporarily down. See [troubleshooting](/docs/autobot/limits-and-privacy#troubleshooting).

## What's next

- [Bring your own LLM key](/docs/autobot/customizing#bring-your-own-llm-key) — uncap your usage and split it off from the shared pool.
- [Limits & Privacy](/docs/autobot/limits-and-privacy) — what each quota and rate limit actually means.
