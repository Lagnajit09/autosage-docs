---
sidebar_position: 1
title: Library
description: Browse and fork curated workflows, nodes, and scripts from the AutoSage Library — admin-managed, free to reuse.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Library

The Library is a curated catalog of pre-built automation building blocks. Browse it to find ready-made workflows, node configurations, and scripts you can fork into your account with a single click.

:::info Admin-managed catalog
Library content is published and maintained by the AutoSage team. Users can browse and fork items freely — adding or editing Library entries requires admin access.
:::

## What's in the Library

Four item types are available:

| Item type | What it is | How you use it |
|---|---|---|
| **Workflow** | A complete visual automation DAG with trigger, action, and decision nodes | Click **Use Workflow** to fork it into your Workflows page as a draft |
| **Node** | A single pre-configured trigger, action, or decision node | Click **Copy Node** to copy it to your clipboard, then paste it into the Workflow Editor |
| **Script** | A ready-to-run script body (PowerShell, Shell, or Python) | Click **Fork Script** to create a personal copy in your Script library |
| **Module** | Reserved for Ansible playbooks and Terraform configurations | Coming soon — items show a "Coming soon" badge |

## Browsing the Library

<!-- TODO: add screenshot of the Library page with filter tabs and grid view -->

### Filter tabs

Tabs across the top of the Library page let you narrow by type: **All**, **Workflows**, **Nodes**, and **Scripts**. Select a tab to show only that type.

### Free-text search

The search box filters by name, description, tags, and category. Results update after a ~400 ms debounce — no need to press Enter.

:::tip Combine filter + search
Select a type tab first, then type in the search box to narrow within that type. Filtering by type before searching is faster than scanning all categories.
:::

### Grid and list view

A toggle in the top-right corner of the Library switches between **grid view** (3-column card layout) and **list view** (compact horizontal rows). Both views show identical metadata.

## Library cards

<!-- TODO: add screenshot of Library item cards -->

Each card (or list row) displays:

| Field | Description |
|---|---|
| **Name** | The item's display name |
| **Type** | Workflow, Node, Script, or Module |
| **Category** | A top-level grouping (e.g. "Monitoring", "Maintenance", "Notifications") |
| **Tags** | Searchable labels describing the item's purpose or target platform |
| **Author** | The Library contributor (typically "AutoSage Team") |
| **Downloads** | Total number of times this item has been forked |
| **Verified badge** | A purple checkmark on items reviewed and approved by the AutoSage team |

## Previewing a workflow

Workflow cards include a **Preview** button. Clicking it opens a read-only canvas showing the full node graph: trigger, action, and decision nodes with their connections, color-coded by type (green = trigger, blue = action, amber = decision). No credential or secret values are shown.

<!-- TODO: add screenshot of the workflow preview modal -->

:::tip Check vault requirements before forking
The preview shows which nodes reference vault credentials. Make sure you have matching servers and credentials saved in your [Key Vault](/docs/key-vault) before forking — vault bindings are stripped on fork and must be re-linked in the Workflow Editor.
:::

## Modules (coming soon)

The **Modules** category is reserved for Ansible playbooks, Terraform configurations, and similar infrastructure-as-code items. Module cards in the current Library show a **Coming soon** badge and cannot be forked. This feature is on the roadmap.

## What's next

- [Using Library Items](/docs/library/forking) — fork workflows, copy nodes, and fork scripts into your account.
- [Workflow Editor Guide](/docs/workflows/workflow-editor-guide) — configure forked workflows in the canvas editor.
- [Plans & Pricing](/docs/plans/overview) — plan limits apply on fork (5 workflows and 10 scripts on Free).
