---
sidebar_position: 2
title: Pro Day Pass
description: Get 24 hours of full Pro access for ₹99 — no subscription required, no recurring commitment.
---

# Pro Day Pass

The Pro Day Pass is a one-time purchase that grants **24 hours of full Pro-tier access** for ₹99. It is designed for users who need a short burst of higher limits without committing to a monthly or annual subscription.

## What it is

Purchasing a Day Pass temporarily overlays your Free account with Pro-level limits for exactly 24 hours from the moment the payment is confirmed. Your base plan stays Free — the pass is a time-limited upgrade, not a plan change.

:::info Priced in Indian Rupees
The Day Pass is priced at ₹99 (INR) and processed via Razorpay. The Pro subscription plans are priced in USD ($15/month or $120/year). Both use the same Razorpay checkout flow.
:::

## Who can use it

- **Free users only.** The Day Pass option is hidden for users already on a Pro or Enterprise plan.
- **Once per 7 days.** After a pass expires, there is a 7-day cooldown before you can purchase another.
- **Not available during an active pass.** You cannot stack or extend a pass that is already running.

:::caution Free users only
If you are on a Pro or Enterprise plan, the Day Pass widget does not appear. It is specifically a bridge for users who want occasional Pro access without subscribing.
:::

## How to purchase

1. Open the **Plans** page from the left navigation.
2. Scroll to the **Pro Day Pass** widget below the Free plan column.
3. Click **Get Day Pass**.
4. The Razorpay checkout overlay appears — complete the ₹99 payment.
5. The **Pro Activation** overlay polls for confirmation and closes automatically once your 24-hour window is active.

<!-- TODO: add screenshot of the Day Pass widget on the Plans page -->

## What you get for 24 hours

While a Day Pass is active your account operates under the same limits as a Pro subscription:

| Limit | During Day Pass |
|---|---|
| Workflows | 50 |
| Scripts | 100 |
| Script executions / month | 500 (shared with the current month's usage) |
| Workflow runs / month | 300 (shared with the current month's usage) |
| Autobot turns / day (admin key) | 100 |
| Threads | Unlimited |
| HTTP triggers | 20 |
| Schedule triggers | 20 |
| Vault entries | 50 |
| Execution mode (Autobot) | Enabled |

:::info Monthly caps are shared
Script executions and workflow runs have monthly caps. Any usage during a Day Pass counts toward the same monthly total as your Free-plan usage. If you have already used 45 of your 50 Free-plan executions this month, a Day Pass gives you an additional 450 — not a fresh 500.
:::

## Restrictions

- **One per 7 days.** The cooldown begins when the previous pass expires, not when you purchase it.
- **Non-refundable.** Completed Razorpay payments cannot be reversed.
- **No stacking.** Purchasing a Day Pass while one is active has no effect — the purchase will be blocked by the eligibility check.

## After 24 hours

Your account automatically reverts to Free-plan limits. **Resources you created during the Day Pass are not deleted** — they stay in your account. However, if their count exceeds your Free-plan cap, AutoSage will block creation of new resources in that category until you reduce usage below the limit or upgrade to Pro.

:::warning Created items are retained
For example: if you forked 8 Library workflows during a Day Pass (Free limit is 5), all 8 remain after the pass expires. You will not be able to create additional workflows until you delete some or upgrade to Pro.
:::

## What's next

- [Plans & Pricing](/docs/plans/overview) — compare all plans and subscribe to Pro.
- [Billing & Invoices](/docs/plans/billing) — Day Pass receipts appear in the Invoices tab.
