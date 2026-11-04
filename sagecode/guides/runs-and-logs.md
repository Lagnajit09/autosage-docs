---
sidebar_position: 6
title: Runs & Logs
description: Find past script and workflow runs, read each node's output, and copy run logs into your workspace with SageCode.
---

# Runs & Logs

Every script and workflow run — whether it started in the web app, from SageCode, a webhook or a schedule — is in your run history. SageCode lets you search it, read it and keep copies.

```sh
sagex list run --limit 10        # the most recent runs, newest first
sagex show run 46a2 --logs       # status, each node, and its output
sagex copy run --since 7days     # into runs/ in your workspace
```

- **Find a run** with `list run`. Runs are named by id, and the first few characters are enough (`46a2`).
- **`show run`** prints the run's status and each node's result. Add `--logs` for their stdout and stderr, or `--json` for scripting.
- **`copy run`** saves a run's metadata and logs to `runs/` in your workspace, one folder per run. Copy one run by id, or a window of runs with `--since 1day`, `7days`, `1month` or `all`.
- **Live runs save their own logs.** `run script`, `run workflow`, `trigger fire` and `trigger watch` keep a copy under `logs/` in your workspace as they finish (see [Core Concepts](/sagecode/guides/concepts#your-workspace)).

Run logs are kept in AutoSage for **90 days**, the same history you see on the [Execution Logs](/docs/execution-logs) page. Copy anything you need to keep longer.
