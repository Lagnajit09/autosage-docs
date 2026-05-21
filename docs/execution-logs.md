---
sidebar_position: 5
title: Execution Logs
description: A single, account-wide view of every execution — workflow runs and single-script runs — with filtering, copy, and export. Logs are retained for 90 days.
---

# Execution Logs

The **Execution Logs** page is your account-wide window into everything AutoSage has ever run for you — workflow executions, single-script runs from the editor, all in one combined list.

If the per-workflow [Workflow Execution](/workflows/workflow-execution) page is for watching and reviewing runs of **one** workflow, Execution Logs is for everything else: auditing activity across the whole account, hunting down a specific run when you don't remember which workflow it came from, or pulling a report of last week's runs.

## What's in the list

Every execution from your account appears here as a single row, regardless of where it was triggered from:

- **Workflow runs** — anything launched from the [Workflow Execution](/workflows/workflow-execution) page, a webhook, or the scheduler.
- **Single-script runs** — anything launched from the [Script Editor terminal](/script-editor/script-execution).

Each row carries enough metadata to identify the run at a glance — what it was, when it happened, how it ended — and clicking a row opens the full captured log.

## Retention: 90 days

AutoSage keeps execution logs in a Google Cloud Storage bucket with a **90-day deletion policy**. Anything older than 90 days is **permanently removed** by the bucket's lifecycle rule — AutoSage cannot recover it.

:::caution Export anything you need to keep
If you need a log for a compliance trail, a postmortem, or any reason that outlives 90 days, **export it** before the window closes. Once GCS lifecycle deletes the object, it's gone.
:::

This retention applies uniformly to every log — there is no per-workflow override and no "pin this run" mechanism today.

## Filtering

A filter control at the top of the page narrows the list to the time range you care about:

| Filter            | What it shows                                                            |
| ----------------- | ------------------------------------------------------------------------ |
| **Today**         | Executions that started any time today, in your local timezone.          |
| **Last 7 days**   | A rolling seven-day window ending now.                                   |
| **Current month** | Executions from the first of this month through now.                    |
| **All time**      | Everything still in retention — i.e. the last 90 days of activity.       |

"All time" is bounded by the [90-day retention window](#retention-90-days), not by your account age. There is no view of runs older than that.

## Copying and exporting

There are two scopes you can act on: a **single log** you have open, and the **filtered list** as a whole.

### Single log

Once you've opened a log, you have two ways to take it with you:

- **Copy** — copies the full log text to your clipboard. Convenient for dropping into a chat message, ticket, or incident channel.
- **Download** — exports the log as a file. Use this when you need a durable artifact — attaching to a bug report, archiving for compliance, or feeding into another tool.

Both options operate on the **full** log for the selected run, not just what's visible on screen.

### Bulk export

You can also export the **entire filtered list** in one go. The export respects whichever [filter](#filtering) is currently active — **Today**, **Last 7 days**, **Current month**, or **All time** — and produces one file containing every execution in that range.

Two formats are available:

- **CSV** — one row per execution, with columns for the run's metadata (timestamps, status, source, duration, and so on). Best for opening in a spreadsheet, building reports, or feeding into a BI tool.
- **JSON** — the same data as a structured array. Best for piping into scripts, ingesting into another system, or anywhere you'd rather work with nested fields than flat columns.

Both formats include the same set of fields; only the shape differs. Pick whichever your downstream tool prefers.

:::tip Combine filtering and bulk export to build a report
Filter to **Last 7 days** (or **Current month**), then bulk-export as CSV for a spreadsheet review, or as JSON if you're feeding the data into another system. This is the standard flow for weekly run reviews and end-of-month audits, and it sidesteps the [retention cliff](#retention-90-days) entirely.
:::

## What's next

- [Workflow Execution](/workflows/workflow-execution) — the per-workflow execution page, with the live terminal and history scoped to one workflow.
- [Script Execution](/script-editor/script-execution) — single-script runs from the editor; these also appear in Execution Logs.
