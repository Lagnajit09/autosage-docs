---
sidebar_position: 3
title: Scripts & Workflows
description: Run scripts and workflows from the terminal and follow them live, and build them from local files with new, push, render and copy.
---

# Scripts & Workflows

Run anything in your library and watch it live, or build scripts and workflows as files in your [workspace](/sagecode/guides/concepts#your-workspace) and push them to AutoSage.

## Run a script on a server

Pick a script and a server from your [Key Vault](/sagecode/guides/key-vault). SageCode streams the output live, line by line, and saves a copy of the logs in your workspace.

```sh
sagex run script disk_check.sh --server web-1 -p THRESHOLD=90
```

- A script's inputs are its `{{NAME}}` markers. Each value comes from `--param` (`-p`), else the script's saved default, else a prompt.
- **Secret inputs** are always asked for at a hidden prompt, never taken as a flag.
- SageCode connects with the key attached to the server. Use `--key` to pick a different key from the same vault, or `--vault` when a server name exists in more than one vault.
- The logs are saved under `logs/script/<id>/`; add `--no-log` to skip that.
- The command **exits with the script's exit code**, so it slots into shell scripts and pipelines.

This is the same as running a script from the [Script Editor](/docs/script-editor/script-execution), and it counts toward the same monthly script-execution limit.

## Run a workflow

```sh
sagex run workflow "Deploy Production" -p VERSION=1.4.2
```

SageCode starts the workflow (as a manual run) and follows it **node by node**: each node's output as it runs, then a final graph of the run.

- **Parameters** keep the values saved in the workflow unless you set them with `-p NAME=VALUE`. If the same name appears on more than one node, use the parameter id instead: `-p param-1=VALUE`. Any parameter without a value is asked for, and secrets always at a hidden prompt.
- `--notify you@example.com` emails you when the run finishes.
- Logs are saved under `logs/workflow/<run id>/` when it ends (`--no-log` to skip).
- **Exit code:** `0` if the run succeeds, `1` if it fails, `130` if you cancel or detach.
- **Ctrl+C** cancels the run; press it again to detach and leave it running.

See [Workflow Execution](/docs/workflows/workflow-execution) for how runs work on the AutoSage side.

## Build a workflow from files

Scaffold a workflow, fill it in with the snippets SageCode gives you, preview it, then push it to AutoSage:

```sh
sagex new workflow "Disk Check"            # creates workflows/Disk_Check.json
sagex list script                          # ids for the nodes you'll add
sagex syntax script                        # JSON for a script action node
sagex render workflow --file "Disk Check"  # preview the flow in the terminal
sagex push workflow "Disk Check"           # create it in AutoSage
```

- The new file explains every field in a `_doc` block, which is never sent to AutoSage.
- `sagex syntax` prints ready-to-paste snippets for `trigger`, `script`, `email`, `decision`, `edge` and `decision-edge`. The node types are the same as in the [workflow editor](/docs/workflows/nodes-and-edges/overview).
- The **first push** creates the workflow and writes its id back into the file. **Later pushes** update it, after asking.
- If the file's id is stale (say, the workflow was deleted), `push workflow --new` creates a fresh one.
- `sagex render workflow "Disk Check"` (without `--file`) draws a workflow that's already in AutoSage; `show workflow` prints its details, nodes and edges.

## Scripts as files

Scripts work the same way:

```sh
sagex new script disk_check --language shell   # creates scripts/disk_check.sh
sagex push script disk_check                   # create it in AutoSage
```

`new script` writes a starter file whose header explains how parameters and secrets reach the script. Languages are `shell`, `python` and `powershell`. When you push changes to an existing script, SageCode shows a **diff** of the AutoSage copy against yours before asking.

## Download, rename and delete

| To… | Run |
|---|---|
| Download a workflow (or all of them) as JSON | `sagex copy workflow "Disk Check"` · `sagex copy workflow --all` |
| Download a script's code (or all scripts) | `sagex copy script disk_check.sh` · `sagex copy script --all` |
| Rename a workflow (nodes and edges stay as they are) | `sagex rename workflow "Disk Check" "Disk Check v2"` |
| Rename a script (the extension is kept) | `sagex rename script disk_check.sh disk_audit` |
| Delete a workflow or script, after confirming | `sagex delete workflow "Disk Check"` · `sagex delete script disk_check.sh` |

Workflows you push this way are ordinary AutoSage workflows: open them in the web app's editor, add [triggers](/sagecode/guides/triggers), or [export](/docs/workflows/import-and-export) them as usual.
