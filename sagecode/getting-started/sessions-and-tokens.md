---
sidebar_position: 2
title: Sessions & Access Tokens
description: Every SageCode sign-in is a session on your AutoSage profile. See what each one has done, revoke it, and create access tokens for CI.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Sessions & Access Tokens

Every time SageCode signs in to your account, AutoSage creates a **session**: one per machine, plus any **access tokens** you create for CI. You can see all of them, and what they've been doing, on your profile.

## Your sessions on the profile page

Open your **Profile** and pick the **SageCode** tab ([autosagex.web.app/profile#sagecode](https://autosagex.web.app/profile#sagecode)). Links from the dashboard, the sign-in page and the new-device email open it directly.

<ThemedImage
  alt="The Profile page's SageCode tab: totals for active sessions, commands run and runs started, then three sessions (a laptop, a GitHub Actions CI token and a build server), each with its system, version, IP address, activity, last-active time and a Revoke button"
  sources={{
    light: useBaseUrl('/img/sagecode/profile-sessions-light.png'),
    dark: useBaseUrl('/img/sagecode/profile-sessions-dark.png'),
  }}
/>

At the top are your totals: **active sessions**, **commands run** and **runs started**. Below them, each session shows:

| Detail | What it is |
|---|---|
| **Name** | The machine's hostname, or the name you gave an access token. Tokens carry a **CI token** badge. |
| **System and version** | The operating system and SageCode version it last used, e.g. `Windows 11 · v1.1.0`. |
| **IP address** | Where it last connected from. |
| **Key ending** | The last four characters of its key, e.g. `sgx_…VphY`, to tell sessions apart. The full key is never shown again. |
| **Activity** | Commands run, runs started, and the last command, e.g. `run workflow`. |
| **Last active** | When it last talked to AutoSage. |

On the **Dashboard**, the SageCode card shows **Connected** once you've signed in from SageCode, with how many devices and tokens you have and when one was last active.

### What counts as activity

- A **command** is one `sagex …` invocation that talked to AutoSage, however many requests it made. A terminal-app session counts as one.
- **Runs started** counts the scripts and workflows started through the session: `run script`, `run workflow`, and schedules fired with `trigger fire`.
- SageCode reports only the command's **name**, like `run workflow`. Arguments, parameter values and output are never sent for activity tracking.

## Revoke a session

On the SageCode tab, click **Revoke** next to the session, then confirm. It stops working immediately: the next command on that machine says

```text
✗ This SageCode session was revoked. Sign in again: sagex auth login
```

Revoking an access token stops anything that uses it, such as a CI job, straight away.

## Built-in safeguards

- **New-device emails.** When SageCode signs in on a device your account hasn't used before, AutoSage emails you the device's name, system, SageCode version, IP address and time, with a link to review your devices. Signing in again on a machine you've used before doesn't send one.
- **Idle sessions expire.** A session that goes **90 days** without use stops working; every command resets the clock. Sign in again to continue.
- **One session per machine.** Signing in again replaces the machine's previous session, and `sagex auth logout` signs it out on the AutoSage side.
- **A key can't create keys.** Approving a sign-in, creating tokens, and listing or revoking sessions all need you signed in to AutoSage in the browser. A SageCode key can only see or end its own session, so a leaked key can't be used to make more. Revoke it from your profile.
- **The key never touches a plain file.** It's kept in your OS keychain (Windows Credential Manager, macOS Keychain or Linux Secret Service), and SageCode never prints it.
- **Up to 25 active sessions** per account. Revoke ones you no longer use to add more.

## Access tokens for CI

Use an access token where nobody can approve a sign-in, such as a CI pipeline or a server without a keychain.

1. On your profile's **SageCode** tab, click **Create token**.
2. Give it a name you'll recognise, like `GitHub Actions`, and click **Create token**.
3. **Copy the token now.** It's shown only once. Tokens start with `sgx_`.

   <ThemedImage
     alt="The Copy your token dialog, showing a new token starting with sgx_, a copy button, and a note that it's the only time the token is shown"
     width={460}
     sources={{
       light: useBaseUrl('/img/sagecode/create-token-light.png'),
       dark: useBaseUrl('/img/sagecode/create-token-dark.png'),
     }}
   />

4. Store it as a secret named `SAGEX_API_KEY` in your CI settings.

SageCode uses `SAGEX_API_KEY` ahead of any saved sign-in, so nothing else is needed: see the [CI/CD guide](/sagecode/guides/ci-cd) for a full pipeline. To save a token into a machine's keychain instead, pipe it in:

```sh
echo "$SAGECODE_TOKEN" | sagex auth login --with-token
```

Tokens appear on the SageCode tab with a **CI token** badge, record their activity like any session, and follow the same 90-day idle rule. Revoke a token from the profile when you no longer need it; `sagex auth logout` leaves tokens working on purpose.

:::tip Treat a token like a password
A token acts as you, with the same access as a signed-in device. Keep it in your CI provider's secret store, never in a repository, and create one token per pipeline so you can revoke them separately.
:::

## When a session stops working

SageCode tells you why, and what to run:

| Message | What happened |
|---|---|
| `This SageCode session expired after 90 days without use.` | It went 90 days without a command. |
| `This SageCode session was signed out.` | `sagex auth logout` ran, or a newer sign-in on the same machine replaced it. |
| `This SageCode session was revoked.` | Someone revoked it from the profile page. |

Each one ends with `Sign in again: sagex auth login`. For anything else, see [Troubleshooting](/sagecode/reference/troubleshooting).
