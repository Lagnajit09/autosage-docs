---
sidebar_position: 1
title: Overview
description: Nodes are the building blocks of a workflow; edges are the connections that wire them together. This page covers the three node types and three edge types AutoSage uses.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Nodes & Edges

Every AutoSage workflow is built from two things: **nodes** — the steps that do something — and **edges** — the lines between them that decide what runs after what.

<ThemedImage
alt="Anatomy of a workflow: a Trigger node connecting to an Action node, then a Decision node branching into two further Action nodes"
sources={{
    light: useBaseUrl('/img/diagrams/workflow-svg-light.svg'),
    dark: useBaseUrl('/img/diagrams/workflow-svg-dark.svg'),
  }}
/>

This page is the map: it names every type, says what each one is for, and points to the deep-dive page for the details.

## Nodes

A node is a single step on the canvas. AutoSage has **three** node types, and every workflow uses them in roughly the same shape — one Trigger to start, one or more Actions to do work, and Decisions wherever the flow needs to branch.

### Trigger nodes

Where a workflow **begins**. Every workflow has exactly one Trigger node, and it sits at the top of the graph with no incoming edge.

A Trigger decides _how_ the workflow gets kicked off — whether you press a button, an external service calls a webhook, or a schedule fires it on a recurring cadence. AutoSage offers three types:

- **Manual** — run on demand by clicking _Run_ from the dashboard.
- **HTTP Webhook** — fire the workflow from any system that can make an HTTP call.
- **Job Scheduler** — run on a recurring schedule defined by a cron expression.

See [Trigger Nodes](/workflows/nodes-and-edges/trigger-nodes) for how to configure each one.

### Action nodes

The steps that **do the work**. A workflow can have as many Action nodes as you need, arranged in sequence, in parallel, or both.

Each Action node performs one concrete task against exactly one target. AutoSage offers two types:

- **Script** — run a Python, PowerShell, or Shell script on a server in your Vault.
- **Email** — send a notification email, typically to report status or alert on failure.

See [Action Nodes](/workflows/nodes-and-edges/action-nodes) for every Action type and its configuration fields.

### Decision nodes

The branching point. A Decision node evaluates a true/false condition based on the output of an upstream node, then routes the run down one of two paths.

Use a Decision when the next step depends on _what just happened_ — "did the deploy succeed?", "is disk usage over 90%?", "did the script exit cleanly?".

See [Decision Nodes](/workflows/nodes-and-edges/decision-nodes) for the condition syntax and branching rules.

## Edges

An edge is a directed line between two nodes that says: **"after this finishes, run that next."** You draw an edge by dragging from a node's output handle to the next node's input handle on the canvas.

AutoSage has **three** edge types. The type is set automatically based on which node the edge leaves from — you don't pick it manually.

| Edge type        | Where it appears                                  | What it means                                                                                          |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Default Edge** | Leaves any Trigger or Action node.                | Standard "next step" connection. After the upstream node finishes, the downstream node runs.           |
| **True Edge**    | Leaves a Decision node from its `true` output.    | Followed when the Decision's condition evaluates to **true**. Drawn in **green** on the canvas.        |
| **False Edge**   | Leaves a Decision node from its `false` output.   | Followed when the Decision's condition evaluates to **false**. Drawn in **red** on the canvas.        |

### A few rules edges follow

- **Edges are directed.** They flow from an upstream node to a downstream node — never the other way.
- **Decision nodes have two outputs.** One True Edge and one False Edge. At runtime, AutoSage follows exactly one of them and prunes the other branch from that run.
- **A node can have multiple outgoing edges to fan out.** An Action node feeding three downstream Actions creates three parallel branches that run at the same time.
- **A node can have multiple incoming edges to fan in.** The downstream node waits for _all_ upstream branches to finish before it runs.

## What's next

- [Trigger Nodes](/workflows/nodes-and-edges/trigger-nodes) — Manual, HTTP Webhook, and Job Scheduler.
- [Action Nodes](/workflows/nodes-and-edges/action-nodes) — Script and Email.
- [Decision Nodes](/workflows/nodes-and-edges/decision-nodes) — branching on true/false conditions.
