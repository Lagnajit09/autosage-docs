---
sidebar_position: 2
title: The Terminal App
description: Run sagex with no arguments for a full-screen terminal app — your AutoSage resources beside a terminal-style transcript with live workflow graphs.
---

# The Terminal App

Run `sagex` with no arguments to open the full-screen terminal app. It's the same SageCode, made for working interactively.

```sh
sagex
```

![The SageCode terminal app: workflows, scripts, vault items, recent runs and triggers on the left, and a live workflow run drawn as a graph on the right](/img/sagecode/terminal-app.svg)

## Layout

- **Left: your resources.** Workflows, Scripts, Vault, your most recent Runs (with ✓ / ✗ / ⟳ status) and Triggers (● on / ○ off), loaded from your AutoSage account.
- **Right: a terminal-style transcript.** Start a line with `!` to run any command, such as `!sagex run workflow Deploy` or `!git status`. Output streams in live, and workflow runs draw a live node graph as they go.

## Keys

| Key | What it does |
|---|---|
| `!` + command | Run a command (any shell command, or a `sagex` command) |
| `Esc` | Stop the running command |
| `↑` / `↓` | Recall earlier commands |
| `F3` | Switch the left panel between your **server resources** and your **local workspace** folder, where you can also change the workspace path |
| `F2` | Switch the shell your commands run in: PowerShell, cmd and WSL on Windows; bash and sh elsewhere |
| `F5` | Refresh the resources |
| `Ctrl+Q` | Quit |

## Good to know

- **Not signed in?** The status line says so, and the left panel shows your local workspace. Run `!sagex auth login` (or quit and run `sagex auth login`).
- **Full-screen programs** such as `vim`, `top` or `less` need a real terminal, so the transcript doesn't run them. Use a normal terminal window for those.
- **Each terminal-app session counts as one command** in your session's [activity](/sagecode/getting-started/sessions-and-tokens#what-counts-as-activity).

:::info Autobot in the terminal is coming
Typing a line without `!` is reserved for Autobot, which arrives in the terminal in **SageCode v2**: chat, generate, run and fix, with your last command's output as context. Until then, [Autobot](/docs/autobot-intro) is in the web app.
:::
