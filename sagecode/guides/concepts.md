---
sidebar_position: 1
title: Core Concepts
description: The ideas every SageCode command shares — naming resources, your local workspace, output and exit codes, configuration and environment variables.
---

# Core Concepts

A few ideas apply to every SageCode command. Learn them once and the rest of the CLI behaves predictably.

## Commands are grouped by verb

Commands read as `sagex <verb> <thing>`: `sagex list workflow`, `sagex run script`, `sagex delete trigger`. Run `sagex --help` for every group, and `sagex <group> --help` (for example `sagex trigger --help`) for its commands and flags. The [Command Reference](/sagecode/reference/commands) lists them all.

## Naming resources

Every command that acts on something — a workflow, script, run, trigger, vault, server or key — takes either its **name** or its **id**.

- Names are matched **without regard to case**: `sagex show workflow deploy` finds "Deploy".
- **Script names include their extension**: `deploy.sh`, `migrate.py`.
- **Runs** are usually named by id, and the first few characters are enough: `sagex show run 46a2`.
- If a name matches more than one thing, SageCode lists the matches with their ids so you can pick. For a server or key whose name exists in more than one vault, add `--vault`.

## Your workspace

SageCode keeps local files in one folder: your **workspace**. It's the current directory unless you choose one, and it's a good thing to keep in git.

```text
❯ sagex workspace set ~/infra
Workspace set to: /home/you/infra
```

| Folder | What's in it |
|---|---|
| `workflows/` | Workflow JSON files, from `new`, `copy` or for `push` |
| `scripts/` | Script files, from `new`, `copy` or for `push` |
| `logs/script/<id>/` | Saved by `run script` |
| `logs/workflow/<run id>/` | Saved by `run workflow`, `trigger fire` and `trigger watch` |
| `runs/` | Run metadata and logs, from `copy run` |

Commands that read a local file accept a path, or just a name inside the matching folder: `sagex push script deploy` finds `scripts/deploy.sh`. `sagex workspace show` prints the current workspace.

## Output and exit codes

- **Tables by default, JSON on request.** Every `list` and most `show` commands take `--json`, ready for `jq`.
- **Script output on stdout, everything else on stderr.** During a live run, SageCode's own progress lines go to stderr, so `sagex run script report.sh -s web-1 > report.txt` captures only what the script printed.
- **Exit codes you can build on.** `run script` exits with the script's own exit code. `run workflow` exits `0` when the run succeeds, `1` when it fails, and `130` when you cancel it or detach.
- **Ctrl+C** stops a live run. Press it again to **detach**: the run carries on in AutoSage, and `sagex show run <id>` checks on it later.

## Secrets are never flags

Passwords, passphrases, SSH keys, certificates and webhook secrets are **never** accepted as command-line flags, so they never land in your shell history. SageCode asks for them at a hidden prompt, or reads them from a file you point to (or `-` to paste). Vault keys can't be copied to disk at all.

## Configuration

SageCode works out of the box. Your preferences, such as the workspace folder and the terminal app's shell, are saved in `~/.sagex/config.json`. These environment variables change its behaviour when you need to:

| Variable | What it does |
|---|---|
| `SAGEX_API_KEY` | Use this [access token](/sagecode/getting-started/sessions-and-tokens#access-tokens-for-ci) instead of the keychain. It takes precedence over a saved sign-in. Made for CI jobs and machines without a keychain. |
| `SAGEX_API_URL` | Point SageCode at a different AutoSage server. |
| `SAGEX_DEBUG=1` | Add connection details to network errors, for troubleshooting. |
