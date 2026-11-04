---
sidebar_position: 3
title: Billing & Invoices
description: View your current plan, manage your subscription, and download payment receipts from the AutoSage Billing page.
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Billing & Invoices

The **Billing** page (accessible from the left navigation) is where you manage your subscription and review payment history.

## The Billing page

The Billing page has two tabs: **Overview** and **Invoices**.

<ThemedImage
  alt="The Billing page's Overview tab for a Pro subscriber: the current plan at $15 a month with its renewal date and limits, Change Plan and Cancel Subscription, the Pro Day Pass row, and this month's usage bars"
  sources={{
    light: useBaseUrl('/img/screenshots/billing-overview-light.png'),
    dark: useBaseUrl('/img/screenshots/billing-overview-dark.png'),
  }}
/>

### Overview tab

The Overview tab shows your current subscription state and provides upgrade and cancellation controls.

| Field | What it shows |
|---|---|
| **Current plan** | Free, Pro (Monthly), Pro (Annual), or Enterprise |
| **Next renewal** | Date of your next charge (Pro subscriptions only) |
| **Billing cycle** | Monthly or Annual |
| **Period end** | When the current paid period ends (shown for active Pro or cancelled-but-still-active subscriptions) |

**Available actions on the Overview tab:**

- **Upgrade to Pro** (Monthly / Annual) — visible for Free users; opens the Razorpay checkout flow.
- **Get Day Pass** — visible for eligible Free users; see [Pro Day Pass](/docs/plans/pro-day-pass).
- **Cancel Subscription** — visible for active Pro users; cancels at the end of the current billing period. Your Pro access continues until the period end date.

:::info Cancellation is not immediate
Clicking **Cancel Subscription** schedules the cancellation for the end of the current billing period. You retain Pro access until that date. There is no partial refund for unused time.
:::

### Invoices tab

The Invoices tab shows a unified, chronologically sorted list of all your payment records. It combines two sources:

- **Razorpay subscription invoices** — generated automatically for each Pro subscription charge (monthly or annual).
- **Local Day Pass receipts** — stored by AutoSage for one-time ₹99 Day Pass purchases (Razorpay Orders do not generate invoices natively, so AutoSage stores its own receipts).

:::info Two invoice sources, one list
Subscription invoices come from Razorpay; Day Pass receipts are stored locally by AutoSage. Both are merged and sorted newest-first in the Invoices tab. The currency column will show USD for subscription charges and INR for Day Pass receipts.
:::

| Column | Description |
|---|---|
| **Invoice** | Reference number for the payment record |
| **Date** | Date the payment was processed |
| **Amount** | Charged amount with currency (USD for subscriptions, INR for Day Pass receipts) |
| **Status** | Payment status (paid, pending, etc.) |

<ThemedImage
  alt="The Billing page's Invoices tab: a billing history table of invoice number, date, amount and status, with two USD Pro subscription invoices and an INR Day Pass receipt, all paid"
  sources={{
    light: useBaseUrl('/img/screenshots/billing-invoices-light.png'),
    dark: useBaseUrl('/img/screenshots/billing-invoices-dark.png'),
  }}
/>

## Plans & Subscription on your profile

Your **Profile** page has a **Plans & Subscription** tab ([autosagex.web.app/profile#plan](https://autosagex.web.app/profile#plan)) that shows:

- Your current plan badge (Free / Pro / Enterprise)
- Billing interval (Monthly / Annual) for Pro subscribers
- The features your plan includes
- A usage summary with progress bars for workflows, workflow runs, and script executions
- An **Upgrade to Pro** shortcut button (for Free users) that navigates to the Billing page

<ThemedImage
  alt="The Profile page's Plans & Subscription tab: the Free plan badge and its features on the left, and usage bars for workflows, workflow runs and script executions with an Upgrade to Pro button on the right"
  sources={{
    light: useBaseUrl('/img/screenshots/profile-plan-light.png'),
    dark: useBaseUrl('/img/screenshots/profile-plan-dark.png'),
  }}
/>

The **Dashboard** also shows your plan in a thin bar under the SageCode and Autobot cards: **Upgrade to Pro** on the Free plan, or your plan and its renewal date on a paid one. Click it to open the Plans or Billing page.

## What's next

- [Plans & Pricing](/docs/plans/overview) — compare all plans and subscribe.
- [Pro Day Pass](/docs/plans/pro-day-pass) — ₹99 for 24 hours of Pro access without a subscription.
