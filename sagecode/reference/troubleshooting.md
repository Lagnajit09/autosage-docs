---
sidebar_position: 2
title: Troubleshooting
description: Fixes for common SageCode messages — install and PATH problems, sign-in codes, keychains, expired or revoked sessions, and connection errors.
---

# Troubleshooting

Most SageCode messages say what to do next. Here are the common ones in full.

## Install

| You see | What to do |
|---|---|
| `sagex: command not found` | Open a **new** terminal so your PATH is reloaded. Still missing? Run `uv tool update-shell`, then open another terminal. |
| `sagex --version` shows an old version | Upgrade with the tool you installed with: `uv tool upgrade sagex-cli` (or `pipx upgrade sagex-cli`, `pip install -U sagex-cli`). |

## Signing in

| You see | What to do |
|---|---|
| `This sign-in request expired` | Approve within **10 minutes** of running `sagex auth login`. Run it again for a new code. |
| `The sign-in was denied in the browser` | Someone clicked **Deny** on the approval page. If that was a mistake, run `sagex auth login` again. |
| "That code isn't valid or has expired" (in the browser) | Check you typed the code from your terminal, or run `sagex auth login` again for a new one. |
| The browser didn't open | Over SSH or on a machine with no display, SageCode prints the link instead. Open it on any device, or go to [autosagex.web.app/cli-auth](https://autosagex.web.app/cli-auth) and enter the code. |
| `You already have 25 active SageCode sessions` | Revoke sessions you no longer use on your profile's **SageCode** tab, then sign in again. |
| `No OS keychain is available on this machine` | Common on servers and CI runners. Create an [access token](/sagecode/getting-started/sessions-and-tokens#access-tokens-for-ci) on your profile and set it in your environment: `SAGEX_API_KEY=<token>`. |
| `That doesn't look like a SageCode token` | With `--with-token`: access tokens start with `sgx_`. Copy the whole token and try again. |

## Sessions

| You see | What to do |
|---|---|
| `This SageCode session expired after 90 days without use` | Run `sagex auth login` to sign in again. |
| `This SageCode session was signed out` | `sagex auth logout` ran, or a newer sign-in on the same machine replaced this one. Run `sagex auth login`. |
| `This SageCode session was revoked` | It was revoked from your profile. Run `sagex auth login` to start a new session. |
| `Not logged in. Run: sagex auth login` | This machine has no saved session and `SAGEX_API_KEY` isn't set. |
| A CI job fails with one of the messages above | The token was revoked or went 90 days unused. Create a new one and update the `SAGEX_API_KEY` secret. See [Sessions & Access Tokens](/sagecode/getting-started/sessions-and-tokens). |

## Running things

| You see | What to do |
|---|---|
| `Unable to reach the Autosage server` | Check your internet connection and try again. For details, run the command again with `SAGEX_DEBUG=1`. |
| A plan-limit message when starting a run | Runs started from SageCode count toward your plan's [monthly limits](/docs/plans/overview), just like runs in the web app. |
| A prompt for a parameter in CI | Pipelines can't answer prompts. Save the value in the workflow, or pass it with `-p NAME=VALUE`. Secret parameters must be saved in the workflow. |
| More than one match for a name | SageCode lists the matches with their ids. Use the id, or add `--vault` for a server or key name that exists in more than one vault. |

Something else? [Open an issue](https://github.com/Lagnajit09/sagex/issues) with the command you ran and what it printed, or [contact support](https://autosagex.web.app/contact).
