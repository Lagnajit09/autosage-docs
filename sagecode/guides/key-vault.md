---
sidebar_position: 5
title: Key Vault
description: Create and manage vaults, servers and keys from the terminal, with secrets entered at hidden prompts or read from files — never passed as flags.
---

# Key Vault

The [Key Vault](/docs/key-vault) holds the servers your scripts run on and the keys (credentials) that log in to them. SageCode manages all three, and it handles secrets carefully: they're typed at hidden prompts or read from a file you point to, never passed as flags and never written to disk.

## Set up a vault

```sh
sagex create vault prod
sagex create key deploy-key --vault prod -t ssh --key-file ~/.ssh/id_ed25519
sagex create server web-1 --vault prod --host 10.0.0.12 -m ssh --key deploy-key
```

- **Key types** are `username_password`, `ssh_key` and `certificate` (`ssh` and `cert` work as short forms).
  - Passwords and passphrases are typed at **hidden prompts**.
  - SSH keys and certificates come from a **file** (`--key-file`, `--cert-file`), or `-` to paste them in.
- **Servers** connect over `ssh` (port 22 by default) or `winrm` (5985). Attach a key with `--key` so scripts on that server use it by default; the key must be in the same vault.

## Look things up

| To… | Run |
|---|---|
| List vaults, servers or keys | `sagex list vault` · `sagex list server` · `sagex list key` |
| See a vault and everything in it | `sagex show vault prod` |
| See a server (host, method, attached key) | `sagex show server web-1` |
| See a key | `sagex show key deploy-key` |

`show key` keeps secret values hidden. Add `--reveal` to see them, after confirming.

## Change and rotate

```sh
sagex update key deploy-key --set-passphrase          # rotate a passphrase at a hidden prompt
sagex update key deploy-key --key-file ~/.ssh/new_key  # replace the SSH key
sagex update server web-1 --host 10.0.0.13 --key ops-key
sagex rename server web-1 web-01
```

`update server --unlink-key` detaches its key. When a server or key name exists in more than one vault, add `--vault` to say which one.

## Delete

`sagex delete key`, `delete server` and `delete vault` ask for confirmation first. **Deleting a vault deletes every server and key inside it**, so SageCode asks you to type the vault's name before going ahead.

:::info Keys can't be copied
`sagex copy key` deliberately refuses: credentials never leave AutoSage's encrypted vault for your local disk. To use a key on another machine, run your script through AutoSage instead.
:::
