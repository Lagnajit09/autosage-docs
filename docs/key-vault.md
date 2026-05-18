---
sidebar_position: 3
title: Key Vault
---

# Key-Vault

## What is a vault?

A **vault** is a secured space to store your server details and credentials so that they can be reused anytime — no need to remember every detail. AutoSage handles them securely and safely.

A vault has three components:

1. **Vault** — the container itself
2. **Servers** — server connection details
3. **Credentials** — usernames/passwords or SSH keys

You can create multiple vaults per account (e.g., `dev-env` and `prod-env`), each holding its own distinct set of credentials and servers.

After creating a vault, select it to open. Inside, you'll find two tabs: **Credentials** and **Servers**.

:::tip Typical flow
First save a **credential**, then save a **server** that links to it.
:::

## Credentials

### Saving a credential

When saving a credential, you'll be asked for:

- **Credential name**
- **Type** — either `username-password` or `ssh-key`
- The corresponding fields, based on the chosen type

Once saved, the credential immediately appears in the UI for selection.

:::note Security
AutoSage never fetches the actual credential values into the UI by default. Only the credential name and type are loaded for display.
:::

### Viewing a credential

If you need to see the stored secret value:

1. Click the **eye icon** next to the credential.
2. AutoSage will decrypt the credential and render it so you can copy or view it.

:::warning
Only reveal a credential when required, and remember to **close the modal** as soon as you're done.
:::

### Updating a credential

When editing an existing credential:

- The `username/password` or `ssh-private-key` input box will appear **blank**.
- Leave it blank to **keep the existing value** unchanged.
- Enter a new value only if you want to **overwrite** the stored one.

## Servers

### Adding a server

When adding a server, you'll be asked for:

- **Display name** — a human-readable label
- **Server host/IP** - IP address of the server
- **Connection type** — `ssh` for Unix, `winrm` for Windows
- **Port** — defaults are `22` (SSH) and `5985` (WinRM)
- **Default credential** — optionally link a saved credential

Servers can be **edited** and **viewed** anytime as needed.

:::tip One-less step in Action node configuration
If a server has a **default credential linked**, simply selecting that server in a workflow's [Action node configuration](/workflows/nodes-and-edges/action-nodes) will **auto-select** its credential — saving you a step.
:::
