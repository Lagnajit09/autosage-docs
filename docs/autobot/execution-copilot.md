---
sidebar_position: 5
title: Execution Copilot
description: Run scripts and workflows from chat, watch them stream live in the Run Panel, investigate failures, and let Autobot diagnose, fix, and re-run — all gated behind execution mode and your own LLM key.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Execution copilot

Autobot doesn't stop at *drafting* automation — it can **run** it. From a chat you can kick off a workflow or script, watch it stream live, investigate what failed, and have Autobot propose a fix and re-run it. This is the **execution copilot**.

Because running automation acts on real servers with real consequences, the whole surface is deliberately gated. Two gates matter before you read further:

- **You must be in [execution mode](#modes-research-generation-execution).** Reading and generating happen in lower modes; running is its own mode you switch into on purpose.
- **Execution mode requires your own LLM key.** It's [BYO](/docs/autobot/customizing#bring-your-own-llm-key)-only — the shared admin pool can't run automation.

:::info This is the higher-trust half of Autobot
Everything on the [Script actions](/docs/autobot/autobot-script) and [Workflow actions](/docs/autobot/autobot-workflow) pages — reading and generating — is available without these gates. This page covers what sits *behind* them. If you only want Autobot to write scripts and workflows, you don't need any of this.
:::

## Modes: research, generation, execution

Autobot operates in one of three **modes**, which you pick in the chat. Each mode unlocks a wider set of actions — and execution mode is the only one that can touch real infrastructure.

<ThemedImage
alt="The Autobot mode selector in the chat, showing Research, Generation, and Execution modes"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-modes-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-modes-dark.svg'),
  }}
/>

| Mode | What Autobot can do | Can it run anything? |
| --- | --- | --- |
| **Research** | Read your library and past runs — list/read scripts and workflows, look up vault metadata, investigate execution history and logs. | No. Read-only. |
| **Generation** | Everything in Research, **plus** create and update scripts and workflows. | No. Drafts only. |
| **Execution** | Everything in Generation, **plus** preview, run, and re-run workflows and scripts. | **Yes.** |

Modes are a hard floor, enforced on the server: a tool that isn't allowed in the current mode is never offered to the model **and** is refused if the model somehow tries to call it anyway. Switching modes is how you opt into a higher trust level — nothing happens by accident.

:::warning Execution mode is BYO-only
You can only switch into **execution mode** if you've connected your own [LLM key](/docs/autobot/customizing#bring-your-own-llm-key). On the shared admin pool the execution-mode button is hidden, and if a request reaches the server without a BYO key it's refused with an `execution_requires_byo` error. Why: running automation is metered separately and tied to your own provider, so the shared starter quota never pays for real compute. See [Limits & Privacy](/docs/autobot/limits-and-privacy#execution-quota).
:::

## Preview before you run

Before launching anything, ask Autobot to **preview** a workflow. A preview is completely side-effect-free — nothing runs. It reads the workflow and reports back:

- The workflow **name** and **node count**.
- The **target servers** each action node will hit.
- A **masked preview of the inputs** (any password value shows as `*****`).
- Whether the run is **ready**, and if not, what's **blocking** it (e.g. an unresolvable credential, or a runtime password it needs from you).

<ThemedImage
alt="A run preview card in the chat showing targets, masked inputs, and a ready/blocking status with a 'Run it now' button"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-preview-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-preview-dark.svg'),
  }}
/>

The preview renders as a card with a **Run it now** button. Clicking it pre-fills the composer — the actual run is its **own** turn, so you always get a beat to confirm before automation fires.

:::tip Preview is the safe way to sanity-check
Use a preview to confirm Autobot resolved the *right* servers and credentials before you commit to a run — especially the first time you run a given workflow from chat.
:::

## Running a workflow

In execution mode, ask Autobot to run a workflow and it calls the **`run_workflow`** action. The run is **asynchronous** — Autobot queues it through the exact same engine the **Run** button uses, then hands you a live view.

What happens:

1. Autobot checks your [execution quota](/docs/autobot/limits-and-privacy#execution-quota) and queues the run.
2. Any password-typed inputs are **stripped** before the request leaves the chat (see [Password safety](#password-safe-execution)).
3. A **Run Card** appears inline; expanding it opens the **[Run Panel](#watching-a-run-the-run-panel)**, which streams the run live.

:::note Runs from chat are real runs
A workflow launched from chat is identical to one launched from the **Run** button — same engine, same logging, same history. It shows up in your [execution history](/docs/execution-logs) tagged as triggered by Autobot. There is no "sandbox" or dry-run; a preview is the dry-run.
:::

### Workflows that need a runtime password

Some workflows take a **password-typed parameter** with no value baked in — Autobot can't (and won't) supply that secret. Instead of refusing, it sets up a [secure side-channel](#secure-password-side-channel): the run pauses in an **awaiting-secret** state and you fill the password in directly, browser-to-server, without it ever passing through Autobot.

## Running a script

Ask Autobot to run a script and it calls **`run_script`** — also asynchronous and fire-and-forget. Before launching, Autobot validates the full set of bindings a script run needs: the **script**, the **vault**, the **server**, and the **credential**.

Chat-initiated scripts don't stream token-by-token the way the [Script Editor terminal](/docs/script-editor/script-execution) does. Instead you get a **status card** that polls for the result — pending → running → completed/failed — and you can open the logs once it finishes.

:::tip Name all four bindings
A script run needs a script, a server, a vault, and a credential. The more precisely you name your real resources — *"run `disk-check.py` on `prod-db-1` with the `db-admin` credential"* — the less Autobot has to guess. Vague targets leave the run unconfigured. (Autobot looks these up by name and id in your [Vault](/docs/key-vault) — never the secret values.)
:::

## Watching a run: the Run Panel

When a run starts, Autobot opens the **Run Panel** — a drawer that streams the run live, independent of the chat. You can keep chatting while it runs.

<ThemedImage
alt="The Run Panel drawer showing a read-only workflow graph with live node colors on the left and a streaming logs terminal on the right"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-runpanel-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-runpanel-dark.svg'),
  }}
/>

**For a workflow run**, the panel has three tabs:

| Tab | What it shows |
| --- | --- |
| **Graph** | A read-only copy of your workflow graph with nodes coloured live — running, succeeded, failed, or skipped — and skipped branches dimmed. |
| **Logs** | The streaming terminal output, the same view you'd see on the [workflow execution page](/docs/workflows/workflow-execution). |
| **Response** | The final result / output of the run. |

**For a script run**, the panel shows **Logs** and **Details**.

The Run Panel reuses the same live-streaming machinery as the standalone [workflow execution page](/docs/workflows/workflow-execution), so the experience is identical — you're just watching it from inside the chat. Past runs in a thread **re-render** as Run Cards when you reopen the conversation, and reconnect to the live stream if the run is still going.

## Investigating a run

Whether a run came from chat, the **Run** button, a webhook, or a schedule, Autobot can investigate it. In research or execution mode it has read-only investigation tools:

| Action | What it answers |
| --- | --- |
| **Execution history** | "What have I run lately?" A browsable list of past script and workflow runs. Click a row to seed an investigation. |
| **Workflow run detail** | "Which node failed, and with what exit code?" Merges the run summary with per-node status. |
| **Script run status** | The status of a one-off script execution. |
| **Read run logs** | The workhorse. Autobot fetches the actual **stdout/stderr text** for a run (tailed to the most relevant portion) and reads it — so it can explain the failure in plain language, not just point at a status. |

<ThemedImage
alt="Autobot investigating a failed run — reading the run detail and log output, then explaining the cause in the chat"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-investigation-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-investigation-dark.svg'),
  }}
/>

:::info Logs are read on the server, never exposed as a link
When Autobot reads run logs, the actual log content is fetched **server-side** and only the text reaches the model — never a signed download URL. You get the diagnosis; the model never holds a credentialed link to your log storage.
:::

## The failure-investigation loop

This is where the execution copilot earns its name. When a run finishes **failed** in execution mode, Autobot follows a deliberate loop:

1. **Identify** — call up the run detail to see *which* node failed and its exit code.
2. **Read** — pull the failing node's logs (stderr/stdout text).
3. **Diagnose** — explain the cause in plain language.
4. **Propose one fix** — a single, specific change to the script or workflow.
5. **Apply** — update the script or workflow in place (with your go-ahead).
6. **Re-run once** — kick off exactly one re-run to test the fix.
7. **Check in** — if it still fails, it tells you rather than looping again.

```text
run fails ─▶ which node? ─▶ read its logs ─▶ diagnose
   ▲                                              │
   └────────── re-run ONCE ◀── apply one fix ◀────┘
                  (then ask — no auto-loop)
```

:::warning "Re-run once" is a hard rule
Autobot will **not** ping-pong fixes endlessly. It proposes one fix, re-runs once, and then asks you. This — together with the [execution quota](/docs/autobot/limits-and-privacy#execution-quota) — keeps a debugging session from quietly burning through real compute. If a fix doesn't take, you stay in control of the next attempt.
:::

## Re-running a workflow

You can re-run a previous workflow without rebuilding the request. Autobot calls **`rerun_workflow`**, which re-queues the **same** workflow with the same inputs (you can override inputs if you ask). Re-runs are **idempotent** — a duplicate re-run request collapses into the original run rather than launching a second one.

## Password-safe execution

A `password`-typed parameter must **never** reach Autobot or the language model in plaintext. AutoSage closes every path with layered protection:

1. **Stripped when read.** When Autobot reads a workflow or previews a run, password values are replaced with `*****` before the data reaches the model. The model knows the parameter *exists*; it never sees the value.
2. **Stripped when run.** Before launching a run, any password input is dropped from the request — the model has no channel to supply one.
3. **Server backstop.** When the run reaches the engine tagged as Autobot-triggered, the server independently drops any password-typed input. Even a maliciously crafted request can't smuggle a secret through.
4. **Secure side-channel.** Workflows that genuinely need a runtime password use the dedicated flow below — the secret travels browser-to-server directly.

### Secure password side-channel

When a workflow needs a runtime password, Autobot doesn't break you out to the builder — it pauses the run and asks you to supply the secret **directly**, bypassing itself entirely.

<ThemedImage
alt="The secure password form anchored above the chat input, with a password field and confirm button for a workflow that needs a runtime secret"
sources={{
    light: useBaseUrl('/img/screenshots/autobot-secretform-light.svg'),
    dark: useBaseUrl('/img/screenshots/autobot-secretform-dark.svg'),
  }}
/>

How it works:

1. Autobot detects the workflow needs a runtime password and returns an **awaiting-secret** state instead of running blind. No run is created yet — just a short-lived, single-use **intent**.
2. A **secure form** appears anchored above your message box, one row per parameter: password fields as real password inputs, references to earlier nodes as read-only chips, everything else editable.
3. You fill in the secret and click **Run securely**. The form sends your values **straight to the server over TLS** — *not* through Autobot.
4. The server merges your values with the prepared run and launches it. Because the secret came from *you*, not the model, it's handled exactly like a password you'd type into the **Run** button.
5. The Run Panel opens to watch the new run. Autobot only ever knows the run's id — never the secret.

:::info The invariant
The secret travels **browser → server**, over TLS, and nowhere else. It never enters the Autobot service and never appears in the conversation. The intent that ties it together is **single-use** and **expires in a few minutes**, so a stale form can't be replayed.
:::

## What's next

- [Workflow actions](/docs/autobot/autobot-workflow) — drafting the workflows you'll run here.
- [Script actions](/docs/autobot/autobot-script) — drafting and running scripts.
- [Bring your own LLM key](/docs/autobot/customizing#bring-your-own-llm-key) — the key that unlocks execution mode.
- [Limits & Privacy](/docs/autobot/limits-and-privacy) — the execution quota, password safety, and the full security model.
