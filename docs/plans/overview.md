---
sidebar_position: 1
title: Plans & Pricing
description: Compare AutoSage's Free, Pro, and Enterprise plans — limits, features, and how to upgrade.
---

# Plans & Pricing

AutoSage has three tiers and a one-time day pass. All accounts start on the **Free** plan with no credit card required.

## Choose a plan

| Feature | Free | Pro | Enterprise |
|---|---|---|---|
| **Price** | $0 / month | $15 / month or $120 / year | Custom |
| **Workflows** | 5 | 50 | Unlimited |
| **Scripts** | 10 | 100 | Unlimited |
| **Script executions / month** | 50 | 500 | Unlimited |
| **Workflow runs / month** | 30 | 300 | Unlimited |
| **Autobot turns / day** (admin key) | 10 | 100 | Unlimited |
| **Threads** | 10 | Unlimited | Unlimited |
| **HTTP triggers** | 1 | 20 | Unlimited |
| **Schedule triggers** | 1 | 20 | Unlimited |
| **Vault entries** | 5 | 50 | Unlimited |
| **Execution mode (Autobot)** | No | Yes | Yes |
| **Pro Day Pass** | Available | — | — |

## Free plan

The Free plan is the default for every new AutoSage account. No credit card is required to sign up, and the plan never expires.

:::info Free is the default
All new accounts start on the Free plan automatically. You only need a payment method when upgrading to Pro or purchasing a Day Pass.
:::

Per-day limits (Autobot turns) reset at midnight UTC. Per-month limits (script executions, workflow runs) reset on the first day of each calendar month.

## Pro plan

The Pro plan unlocks higher limits across the board and enables **Execution mode** in Autobot, allowing Autobot to trigger workflow runs and script executions on your behalf.

Pro is available on a **monthly** ($15/month) or **annual** ($120/year) billing cycle. The annual plan saves ~33% compared to paying monthly.

### Subscribing

1. Open the **Plans** page from the left navigation.
2. Click **Subscribe Monthly** or **Subscribe Yearly** under the Pro column.
3. The Razorpay checkout overlay appears — enter your card or UPI details.
4. On payment, Razorpay fires a webhook that activates your Pro plan server-side.
5. The **Pro Activation** overlay appears and polls for confirmation — it closes automatically once activation is confirmed (usually within a few seconds).
6. Your plan badge in the top-right profile menu updates to **Pro** immediately.

:::tip Activation is automatic
You don't need to reload the page. The overlay polls in the background and dismisses itself once your plan is active.
:::

### Cancelling

Open **Billing** from the left navigation and click **Cancel Subscription**. Your Pro access continues until the end of the current billing period, then the account reverts to Free.

## Enterprise plan

Enterprise provides unlimited resources across all categories and is negotiated individually. There is no self-serve purchase — click **Contact Us** on the Plans page to open the contact form.

:::info Contact us for Enterprise pricing
Enterprise pricing is tailored to your use case. Fill in the contact form on the Plans page (name, email, and a brief description of your needs) and the AutoSage team will follow up.
:::

## What happens when you hit a plan limit

Plan limits are enforced on the server. If you attempt to create a workflow, script, trigger, or vault entry beyond your plan's cap, AutoSage returns an error and shows an inline upgrade prompt linking to the Plans page.

:::caution Limits are enforced at the server
The error is returned before the resource is created — nothing is partially saved. Deleting existing resources or upgrading your plan both resolve the block.
:::

## What's next

- [Pro Day Pass](/docs/plans/pro-day-pass) — ₹99 for 24 hours of full Pro access, no subscription.
- [Billing & Invoices](/docs/plans/billing) — manage your subscription and download payment receipts.
- [Autobot limits](/docs/autobot/limits-and-privacy) — Autobot-specific turn quotas and rate limits.
