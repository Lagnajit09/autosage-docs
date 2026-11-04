---
sidebar_position: 4
title: Webhooks & Schedules
description: Create HTTP webhooks and cron schedules from the terminal, call or fire them exactly as AutoSage would, and follow the runs they start.
---

# Webhooks & Schedules

A workflow's [trigger node](/docs/workflows/nodes-and-edges/trigger-nodes) decides how it starts. SageCode sets up both kinds of automatic trigger, HTTP webhooks and cron schedules, and can fire them exactly as AutoSage would.

## Expose a webhook

An HTTP trigger gives a workflow a URL that other systems can call.

```sh
sagex trigger create Deploy -t http    # prints the secret once
sagex trigger invoke Deploy            # the URL, headers, body and a curl to copy
sagex trigger fire Deploy              # call it now, then follow the run
sagex trigger poll Deploy --watch      # check the run as a caller would
```

- If the workflow's trigger node is set to manual, `trigger create` offers to switch it first.
- **The secret is shown once.** Store it straight away, in your CI provider's secrets for example. Lost it? `sagex trigger regenerate Deploy` issues a new one at the **same URL**, and the old one stops working.
- `trigger fire` calls the webhook **exactly like an outside caller**: only the secret and an `Idempotency-Key`, no SageCode sign-in. It's a real end-to-end test. The secret is typed at a hidden prompt, or read with `--secret-file`.
- `trigger poll` checks the run through the trigger's public polling URL — exactly what a caller sees. Pass a run id, the workflow name, or the polling URL.

Every call needs two headers: `X-Trigger-Secret` and a unique `Idempotency-Key`. Repeating a key returns the run it started instead of starting another, so retries are safe. Parameter values go in `inputs`, keyed by parameter id (shown by `sagex show workflow Deploy --json`):

```sh
curl -X POST "$DEPLOY_WEBHOOK_URL" \
  -H "X-Trigger-Secret: $DEPLOY_WEBHOOK_SECRET" \
  -H "Idempotency-Key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{"inputs": {"param-1": "1.4.2"}}'
# 202 → { workflow_run_id, status, polling_url }
```

## Schedule a job

```sh
sagex trigger create Backup -t schedule --cron "0 2 * * *"
sagex trigger watch Backup     # count down to the next run, then follow it live
sagex trigger fire Backup      # run it now, through the scheduler's own path
```

- Cron expressions have **five fields** and run in **UTC**. After saving, SageCode shows the next runs in UTC and in your local time.
- Scheduled runs have nobody to ask for input, so **every parameter needs a saved value**. SageCode warns you if one doesn't have one.
- A firing is **skipped** if the previous scheduled run of the same workflow is still going. `trigger watch` tells you when that happens.
- `trigger fire` on a schedule runs it now exactly as its cron would, including the overlap rule, and counts toward your monthly run limit like any run.

:::note Day of month and day of week both have to match
Unlike classic cron, a day of the month and a day of the week in the same expression must **both** match: `0 9 1 * 5` runs only on a Friday that's also the 1st. SageCode words its description of the schedule to match.
:::

## Manage triggers

| To… | Run |
|---|---|
| See every configured trigger | `sagex list trigger` |
| See one trigger's details (the secret is never printed in full) | `sagex show trigger Deploy` |
| Pause a trigger without deleting it, then resume it | `sagex trigger disable Backup` · `sagex trigger enable Backup` |
| Rotate a webhook secret | `sagex trigger regenerate Deploy` |
| Delete a trigger, after confirming | `sagex delete trigger Backup` |

Triggers you create with SageCode are the same triggers you see in the web app's workflow editor; changes in either place show up in both.
