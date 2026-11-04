---
sidebar_position: 1
title: Command Reference
description: Every SageCode (sagex) command group at a glance, with a link to the full generated reference listing every flag.
---

# Command Reference

Every command group at a glance. For every flag and option, see the [full command reference](https://sagecode.web.app/commands.html) on the SageCode site — it's generated from the CLI itself, so it always matches the latest release. In your terminal, `sagex <group> --help` shows the same detail.

| Group | Commands | What it does |
|---|---|---|
| `auth` | `login` · `status` · `logout` | Sign in with your browser (or `--with-token`), see who you're signed in as, sign out. [Guide](/sagecode/getting-started/install) |
| `list` | `workflow` · `script` · `run` · `trigger` · `vault` · `server` · `key` | Compact tables of your resources; `--json` for scripting |
| `show` | `workflow` · `script` · `run` · `trigger` · `vault` · `server` · `key` | One resource in detail. `show run --logs` prints node output; `show key --reveal` shows secrets after confirming |
| `render` | `workflow` | Draw a workflow as a flow tree, from AutoSage or a local file (`--file`) |
| `run` | `script` · `workflow` | Run now and stream the output live; `Ctrl+C` stops. Inputs with `-p NAME=VALUE`. [Guide](/sagecode/guides/scripts-and-workflows) |
| `trigger` | `create` · `fire` · `poll` · `watch` · `invoke` · `enable` · `disable` · `regenerate` | Webhooks and cron schedules: set up, fire, follow and rotate. [Guide](/sagecode/guides/triggers) |
| `new` | `workflow` · `script` | Scaffold a local file, ready to edit |
| `push` | `workflow` · `script` | Create in AutoSage from a local file, or update after confirming (scripts show a diff) |
| `copy` | `workflow` · `script` · `run` | Download to your workspace (`--all`, or `copy run --since 7days`). Keys can't be copied |
| `create` | `vault` · `server` · `key` | Create Key Vault resources. [Guide](/sagecode/guides/key-vault) |
| `update` | `vault` · `server` · `key` | Change them, or rotate a key's secret |
| `rename` | `workflow` · `script` · `vault` · `server` · `key` | Rename in place |
| `delete` | `workflow` · `script` · `vault` · `server` · `key` · `trigger` | Delete, after confirming. Deleting a vault deletes everything in it |
| `workspace` | `set` · `show` | Choose the local folder SageCode reads from and writes to. [Concepts](/sagecode/guides/concepts#your-workspace) |
| `syntax` | `trigger` · `script` · `email` · `decision` · `edge` · `decision-edge` | Print a copy-paste JSON snippet for a workflow node or edge |

Run `sagex` with no command to open the [terminal app](/sagecode/guides/terminal-app), and `sagex --version` to see which version you have.

## A typical session

```sh
sagex new script disk_check --language shell   # scripts/disk_check.sh
sagex push script disk_check                   # create it in AutoSage
sagex run script disk_check.sh -s web-1        # run it on a vault server

sagex new workflow "Disk Check"                # workflows/Disk_Check.json
sagex syntax script                            # snippet for an action node
sagex render workflow --file "Disk Check"      # preview the flow locally
sagex push workflow "Disk Check"
sagex trigger create "Disk Check" -t schedule --cron "0 2 * * *"
sagex trigger watch "Disk Check"               # wait for the next firing, then follow it
```
