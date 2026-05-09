---
sidebar_position: 2
title: Workflow Editor Guide
description: A tour of every part of the AutoSage workflow editor — the nodes menu, the canvas, configuration sidebars, and the toolbar.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Workflow Editor Guide

The **workflow editor** is where you actually build a workflow — drop in nodes, wire them together, configure each one, and save. This page is a tour of what every part of the editor does and where to find it.

A typical workflow editor looks like this:

<ThemedImage
alt="The AutoSage workflow editor with the nodes menu on the left, the canvas in the center, and the toolbar in the top-right corner"
sources={{
    light: useBaseUrl('/img/screenshots/workflow-editor-overview-light.svg'),
    dark: useBaseUrl('/img/screenshots/workflow-editor-overview-dark.svg'),
  }}
/>

The screen is divided into a few regions:

- **[Nodes menu](#nodes-menu)** — left sidebar. Drag-and-drop source for the three node types.
- **[Workflow canvas](#workflow-canvas)** — center. Where your workflow lives.
- **[Configuration sidebar](#configuration-sidebar)** — right sidebar. Opens when you click a node or edge.
- **[Toolbar](#toolbar)** — top-right corner. Import, Vault, profile, theme, and the more menu.
- **[Autobot button](#autobot-button)** — bottom-right corner. AI-powered workflow generator (coming soon).

---

## Nodes menu

The **nodes menu** sits on the left side of the editor. It's the source palette for everything you can drop onto the canvas.

<ThemedImage
alt="The left-sidebar nodes menu, showing the Trigger, Action, and Decision categories"
sources={{
    light: useBaseUrl('/img/screenshots/editor-nodes-menu-light.svg'),
    dark: useBaseUrl('/img/screenshots/editor-nodes-menu-dark.svg'),
  }}
/>

It groups nodes into the three categories you'll work with:

- **Trigger** — the starting point of a workflow. Pick one of _Manual_, _HTTP Webhook_, or _Cron Scheduler_. Every workflow needs exactly one.
- **Action** — the steps that do work: _Script_ (run code on a server) and _Email_ (send a notification).
- **Decision** — branches the flow on a true/false condition.

To use a node, **drag it from the menu and drop it onto the canvas**. The node appears at the drop location with default settings; click it to configure.

For a deeper look at each node type, see [Nodes & Edges](/workflows/nodes-and-edges/overview).

---

## Workflow canvas

The **canvas** is the central area where you assemble your workflow. It's an infinite, pannable surface — drag with the mouse to scroll around, scroll-wheel to zoom.

<ThemedImage
alt="The workflow canvas with several nodes connected by edges"
sources={{
    light: useBaseUrl('/img/screenshots/editor-canvas-light.svg'),
    dark: useBaseUrl('/img/screenshots/editor-canvas-dark.svg'),
  }}
/>

What you can do on the canvas:

- **Add a node** — drag from the [nodes menu](#nodes-menu).
- **Move a node** — click and drag the node body.
- **Connect two nodes** — drag from a node's output handle to the next node's input handle. The line you draw is an **edge**.
- **Delete a node or edge** — select it and press <kbd>Delete</kbd> (or <kbd>Backspace</kbd>).
- **Pan** — drag empty canvas.
- **Zoom** — scroll wheel, or pinch on a trackpad.

---

## Configuration sidebar

The right sidebar is **context-sensitive**: it stays empty until you click something on the canvas, and then it shows the configuration form for whatever you selected.

<ThemedImage
alt="The right-sidebar configuration panel open, showing fields for the selected node"
sources={{
    light: useBaseUrl('/img/screenshots/editor-config-sidebar-light.svg'),
    dark: useBaseUrl('/img/screenshots/editor-config-sidebar-dark.svg'),
  }}
/>

- **Click a node** — the form for that node type opens. The fields depend on the node: a Script Action shows server, language, and script; an HTTP Webhook trigger shows the trigger URL and secret; and so on.
- **Click an edge** — the form for that edge opens. Useful for edges out of a Decision node, where you set the `true`/`false` label.
- **Click the canvas background** — the sidebar closes.

The full field reference for each type lives in the [Nodes & Edges](/workflows/nodes-and-edges/overview) section.

---

## Toolbar

The **toolbar** sits in the top-right corner of the editor. It's a single dock of buttons, in this order:

<ThemedImage
alt="The top-right toolbar with Import, Vault, Profile, theme toggle, and the more menu"
sources={{
    light: useBaseUrl('/img/screenshots/editor-toolbar-light.svg'),
    dark: useBaseUrl('/img/screenshots/editor-toolbar-dark.svg'),
  }}
/>

### Import workflow

Bring an existing workflow into the editor. Two ways to provide the workflow definition:

- **Upload a JSON file** — pick an exported workflow file from your computer.
- **Paste JSON** — paste the workflow JSON directly into a text box.

Either way, AutoSage parses the JSON and reconstructs the nodes and edges on the canvas. Useful for sharing workflows between accounts, importing templates, or restoring from a backup.

:::caution Import only restores the design, not the configuration
A workflow JSON stores the **structure** — nodes, edges, and references by ID — but not the underlying resources those references point to. After importing, AutoSage will:

- Recreate every node and edge on the canvas.
- **Leave configuration fields blank** wherever the referenced ID (a Vault entry, a credential, a saved script) doesn't exist in your account.

You'll need to **manually re-link** these on each affected node before the workflow can run. This typically means picking the right server, credential, or script from your own Vault — the labels and connections are preserved, but the bindings have to be set again.
:::

### Vault

Opens the **Vault** — your central store for **servers** and **credentials** that your workflows reference. From here you can add a new server, save a credential, or link an existing credential to a server so it auto-fills the next time you pick that server in an Action node.

The Vault opens in the same browser tab; close it to return to the editor.

<!-- TODO: link "Vault" to its deep-dive page once it exists -->

### Profile

A direct link to your **user profile**. Use this to update your account details and manage sign-in methods.

### Theme toggle

Switches between **light and dark** appearance. The choice is saved per browser, so AutoSage remembers it the next time you sign in.

### More menu

A dropdown that holds less-frequent editor actions:

- **New workflow** — start a fresh, empty workflow on a new canvas.
- **Clear canvas** — wipe every node and edge from the current workflow without deleting the workflow itself. Useful when you want to redesign from scratch.
- **Delete workflow** — permanently remove the current workflow. Asks for confirmation.
- **Open Script Editor** — jumps to the [Script editor](/quick-tour#script-editor), where you can write or edit the scripts that Action nodes run.

---

## Autobot button

In the **bottom-right corner** there's a floating button for **Autobot**, the AutoSage AI workflow generator.

<ThemedImage
alt="The Autobot floating button in the bottom-right of the editor"
sources={{
    light: useBaseUrl('/img/screenshots/editor-autobot-button-light.svg'),
    dark: useBaseUrl('/img/screenshots/editor-autobot-button-dark.svg'),
  }}
/>

Click it to open a modal where you can describe what you want a workflow to do, and Autobot drafts the nodes and edges for you.

:::note Coming soon
Autobot is on the roadmap and **not yet available**. The button is reserved on the editor for now; clicking it shows a "coming soon" message.
:::

---

## What's next

- [Nodes & Edges — Overview](/workflows/nodes-and-edges/overview) — the building blocks in detail.
- [Trigger Nodes](/workflows/nodes-and-edges/trigger-nodes), [Action Nodes](/workflows/nodes-and-edges/action-nodes), [Decision Nodes](/workflows/nodes-and-edges/decision-nodes) — per-type configuration references.
