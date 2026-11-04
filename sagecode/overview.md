---
slug: /
sidebar_position: 1
title: Overview
description: SageCode is the AutoSage command line. Run, build and manage your workflows, scripts, triggers and Key Vault from your terminal with one command, sagex.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# SageCode

<ThemedImage
  alt="The SageCode logo: a terminal prompt inside a flowing S"
  width={72}
  sources={{
    light: useBaseUrl('/img/sagecode/mark-light.svg'),
    dark: useBaseUrl('/img/sagecode/mark-dark.svg'),
  }}
/>

**SageCode** is the command line for AutoSage. Almost everything you do in the web app — building and running workflows, writing scripts, setting up webhooks and schedules, managing the Key Vault — you can also do from your terminal, with one command: `sagex`.

One install gives you two ways to work:

- **Single commands**, for everyday tasks, scripting and CI: `sagex run workflow "Deploy"`, `sagex list run`, `sagex trigger fire Backup`. Output is a table by default and JSON with `--json`.
- **A full-screen [terminal app](/sagecode/guides/terminal-app)**: run `sagex` on its own for a tree of your resources beside a terminal-style transcript, with live workflow graphs.

```sh
sagex auth login              # approve this device in your browser
sagex list workflow           # your workflows, as a table
sagex run workflow "Deploy"   # run one and follow it live, node by node
sagex                         # open the terminal app
```

![The SageCode terminal app: workflows, scripts, vault items, recent runs and triggers on the left, and a live workflow run drawn as a graph on the right](/img/sagecode/terminal-app.svg)

:::tip SageCode has its own website
[sagecode.web.app](https://sagecode.web.app) has the install guide, recipes and the [full command reference](https://sagecode.web.app/commands.html) with every flag, generated from the CLI itself. These pages cover using SageCode with your AutoSage account.
:::

## What you can do with it

| In the web app | In SageCode |
|---|---|
| [Workflows](/docs/workflows/what-is-a-workflow) list and editor | `list workflow`, `show workflow`, `render workflow`, and `new` / `push workflow` to build one from a JSON file |
| [Script Editor](/docs/script-editor/editor-guide) | `new script`, `push script` (shows a diff before updating), `show script` |
| Running scripts and workflows | `run script`, `run workflow` — output streams live, and workflows draw a live node graph |
| [Trigger nodes](/docs/workflows/nodes-and-edges/trigger-nodes) (HTTP and schedule) | `trigger create`, `fire`, `poll`, `watch`, `invoke`, `enable`, `disable`, `regenerate` |
| [Key Vault](/docs/key-vault) | `create`, `update`, `rename` and `delete` for vaults, servers and keys |
| [Execution Logs](/docs/execution-logs) | `list run`, `show run --logs`, `copy run` |
| [Autobot](/docs/autobot-intro) | Not yet: Autobot in the terminal arrives in SageCode v2. Until then, use it in the web app. |

The [Guides](/sagecode/guides/concepts) walk through each of these, and the [Command Reference](/sagecode/reference/commands) lists every command.

## How it fits with your account

- **Same account, no separate sign-up.** `sagex auth login` shows a one-time code; you approve it in your browser while signed in to AutoSage. See [Install & Sign In](/sagecode/getting-started/install).
- **It acts as you.** SageCode sees exactly what you see in the web app, and every action is scoped to your account. Runs you start from SageCode count toward your plan's [monthly limits](/docs/plans/overview), just like runs started in the browser.
- **Every sign-in is a session** you can see and revoke on your profile, with what it has been doing. CI jobs use access tokens instead. See [Sessions & Access Tokens](/sagecode/getting-started/sessions-and-tokens).
- **Secrets stay secret.** Your session key lives in your OS keychain, never in a plain file. Passwords, SSH keys and webhook secrets are never accepted as command-line flags, so they never land in your shell history.

## Requirements

- An **AutoSage account**. The Free plan works.
- **macOS, Linux or Windows**, with **Python 3.11 or newer**. The one-line installer downloads Python for you if you don't have it.
- An **OS keychain** to keep your session in: built into macOS and Windows; on Linux, Secret Service (GNOME Keyring or KWallet). No keychain, as on a CI runner? Use an [access token](/sagecode/getting-started/sessions-and-tokens#access-tokens-for-ci).

## Next steps

1. [Install SageCode and sign in](/sagecode/getting-started/install) — about a minute.
2. Learn the [core concepts](/sagecode/guides/concepts): naming resources, your workspace, output and exit codes.
3. Pick a guide: [scripts & workflows](/sagecode/guides/scripts-and-workflows), [triggers](/sagecode/guides/triggers), [Key Vault](/sagecode/guides/key-vault), [runs & logs](/sagecode/guides/runs-and-logs) or [CI/CD](/sagecode/guides/ci-cd).
