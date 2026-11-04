---
sidebar_position: 1
title: Install & Sign In
description: Install SageCode on macOS, Linux or Windows in one line, sign in by approving the device in your browser, and check, update or remove it.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Install & Sign In

Up and running in about a minute: install SageCode, approve the sign-in in your browser, and run your first `sagex` command.

## Install

**macOS / Linux**

```sh
curl -LsSf https://sagecode.web.app/install.sh | sh
```

**Windows (PowerShell)**

```powershell
irm https://sagecode.web.app/install.ps1 | iex
```

The installer uses [uv](https://docs.astral.sh/uv/) to install SageCode as an isolated tool (installing uv first if needed), downloads Python 3.11+ if you don't have it, and puts the `sagex` command on your PATH. Open a **new terminal** and check it:

```text
❯ sagex --version
sagex 1.1.0
```

### Other ways to install

SageCode is on PyPI as [`sagex-cli`](https://pypi.org/project/sagex-cli/); the command it installs is `sagex`. Any Python tool manager works, with Python 3.11 or newer:

| Tool | Command |
|---|---|
| uv | `uv tool install sagex-cli` |
| pipx | `pipx install sagex-cli` |
| pip | `pip install sagex-cli` (into a virtual environment) |
| A pinned version | `uv tool install sagex-cli==1.1.0`, or set `SAGEX_VERSION=1.1.0` before running the installer |

## Sign in

SageCode signs in with your AutoSage account. There's no key to copy: you approve the sign-in in your browser.

1. **Run `sagex auth login`.** SageCode shows a one-time code and opens AutoSage in your browser:

   ```text
   ❯ sagex auth login
   Your one-time code: WDJB-MJHT
   Approve the sign-in at: https://autosagex.web.app/cli-auth?code=WDJB-MJHT
   Opened your browser. Check the code matches, then approve.
   ✻ Waiting for approval… (4s · ctrl+c to cancel)
   ```

2. **Sign in to AutoSage** if you aren't already. You land on the **Authorize SageCode?** page, which shows the code and the device asking to sign in: its name, system, SageCode version, IP address, and when it asked.

   <ThemedImage
     alt="The Authorize SageCode? page: the one-time code WDJB-MJHT, the device's name, system, SageCode version, IP address and request time, and Deny and Approve buttons"
     width={480}
     sources={{
       light: useBaseUrl('/img/sagecode/approve-light.png'),
       dark: useBaseUrl('/img/sagecode/approve-dark.png'),
     }}
   />

3. **Check the code matches the one in your terminal**, then click **Approve**.
4. Back in your terminal, SageCode finishes on its own:

   ```text
   ✓ Logged in to Autosage as you@example.com on my-laptop.
   ```

Your session is saved to your OS keychain, and it appears on your profile. See [Sessions & Access Tokens](/sagecode/getting-started/sessions-and-tokens).

:::warning Only approve a code you just started
Approving gives that device access to your account: it can manage your workflows, scripts, vault, triggers and runs as you. If you didn't just run `sagex auth login`, or the code doesn't match your terminal, click **Deny**.
:::

A sign-in request is valid for **10 minutes**. If it expires or is denied, run `sagex auth login` again for a new code.

### On a server or over SSH

On a machine with no browser, SageCode prints the link instead of opening it. It does this automatically over SSH and on Linux with no display, or whenever you pass `--no-browser`:

```sh
sagex auth login --no-browser
```

Open the link on **any device**, such as your laptop or phone, and approve it there. You can also go to [autosagex.web.app/cli-auth](https://autosagex.web.app/cli-auth) and type the code in.

### In CI and scripts

Pipelines can't approve anything in a browser. Create an **access token** on your profile and give it to SageCode through the `SAGEX_API_KEY` environment variable, or save it to a machine's keychain with `sagex auth login --with-token`. See [Access tokens for CI](/sagecode/getting-started/sessions-and-tokens#access-tokens-for-ci) and the [CI/CD guide](/sagecode/guides/ci-cd).

## Check who you're signed in as

```text
❯ sagex auth status
✓ Logged in to Autosage as you@example.com
  Device session: my-laptop · sgx_…VphY
  Activity: 12 commands · 3 runs started
  Manage your sessions: https://autosagex.web.app/profile#sagecode
```

`auth status` checks the session with AutoSage each time, so it also tells you if the session has expired or been revoked.

## Sign out

```sh
sagex auth logout
```

This signs the machine's session out on the AutoSage side **and** removes it from your keychain. If the saved credential is an access token, `logout` only removes it from the keychain: the token keeps working (a CI job may share it) until you revoke it on your profile.

## Update or uninstall

Upgrade with the same tool you installed with:

```sh
uv tool upgrade sagex-cli      # or: pipx upgrade sagex-cli · pip install -U sagex-cli
```

To uninstall, sign out first so the session is ended and removed from your keychain, then remove the tool:

```sh
sagex auth logout
uv tool uninstall sagex-cli
```
