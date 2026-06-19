---
sidebar_position: 6
title: Customizing & LLM Keys
description: Shape how Autobot talks to you with tone, expertise, and language settings, global custom instructions, and per-thread overrides — and connect your own LLM provider key to bypass the shared quota and unlock execution mode.
---

# Customizing Autobot

Autobot ships with sensible defaults, but you can shape how it talks to you, what it assumes about your environment, and which model it runs on. It all lives in one place: the **Customize** modal, opened from the Autobot page header.

:::info Customizations *layer on top* — they never replace
Every customization here is **added on top of** Autobot's base instructions. This is deliberate: the base prompt is what gives Autobot its knowledge of how AutoSage works. If your settings could overwrite it, Autobot might forget how scripts, workflows, and vault resources fit together and start hallucinating. So your preferences refine its behavior; they don't strip its grounding.
:::

## Tone, expertise, and language

Three quick dials for *how* Autobot communicates:

- **Tone** — concise or detailed. Set "concise" if you want answers without preamble; "detailed" if you want the reasoning spelled out.
- **Expertise** — beginner or expert. This adjusts how much Autobot explains. Experts get fewer hand-holding asides; beginners get more context.
- **Language** — the natural language you'd like Autobot to reply in.

These apply across **every** conversation until you change them.

## Custom instructions

A free-text field for anything you want Autobot to remember in **every** chat. Examples:

> *"I work in UTC."*

> *"Always default to Python over shell."*

> *"Scripts should include a header comment with the date and a one-line description."*

Think of this as your standing preferences — the things you'd otherwise have to repeat at the start of every conversation. Same rule as above: this **appends** to the base prompt; it doesn't override it.

## Per-thread overrides

Inside an individual chat, you can also set a **one-off system prompt override** (in Thread settings) that affects **only that conversation**.

This is useful when you want a specific behavior for one project without changing your global defaults — for example, a terse, expert tone for a quick debugging thread while keeping your usual detailed style everywhere else.

| Scope | Where you set it | Applies to |
| --- | --- | --- |
| Tone / expertise / language | Customize modal | All chats |
| Custom instructions | Customize modal | All chats |
| System prompt override | Thread settings | That one thread |

## Bring your own LLM key (BYO) {#bring-your-own-llm-key}

By default, Autobot runs on a **shared AutoSage admin pool** (Gemini / Groq / OpenRouter). That pool has a **daily quota per user** — the [Autobot Dashboard](/docs/autobot/dashboard) shows your current `used / limit`. When you hit the cap, the chat surface tells you and points you here.

From **Customize → LLM Configurations**, you can connect **your own provider key** so your conversations don't touch the shared quota at all.

### Why use BYO?

- **No daily cap.** Turns on a BYO key are uncapped by AutoSage's quota — you pay your own provider directly.
- **Your choice of model.** Pick the exact provider and model you trust for the job.
- **Heavy-use friendly.** Tool-using chats — especially workflow generation — can burn tokens quickly. The shared quota is meant as a starter; if you're a heavy user, BYO is the answer.
- **Unlocks execution mode.** Running scripts and workflows from chat — the [execution copilot](/docs/autobot/execution-copilot) — is **only** available on a BYO key. The shared admin pool can read and generate, but it can't run automation.

### Setting up a BYO config

1. Open **Customize → LLM Configurations → Add new**.
2. Pick a **provider**: Gemini, Groq, OpenRouter, Anthropic, OpenAI, Azure OpenAI, or a **custom OpenAI-compatible endpoint**.
3. Paste your **API key**.
4. Optionally set this config as your **default**.

Once a BYO key is the default, **every chat turn uses it** — those turns are uncapped by AutoSage's quota and don't share usage with the shared pool.

:::info Your key is encrypted at rest
Your API key is stored **encrypted at rest** (Fernet — the same encryption AutoSage uses for [Vault](/docs/key-vault) credentials). It's decrypted only in-memory at chat time, is **never logged**, and is **never returned to the browser in plaintext**.
:::

### Managing multiple configs

You can have **multiple BYO configs** and switch the default at any time — for example, one for Anthropic and one for a self-hosted endpoint.

- **Switching the default** changes which config new chats use.
- **Deleting the config that's currently your default** falls back to the shared admin pool automatically — you won't be left without a working setup.

:::info Connecting a key unlocks execution mode
[Execution mode](/docs/autobot/execution-copilot) — running scripts and workflows from chat — is only available on your own key, never the shared admin pool. As soon as you've connected and defaulted a BYO config, the execution mode becomes available in the chat. See [the execution quota](/docs/autobot/limits-and-privacy#execution-quota).
:::

## A note on existing threads

Some settings — particularly which LLM a chat uses — are **locked in when a thread is created**. If you change a global default (tone, expertise, or your default BYO config), **start a new chat** to pick it up. Existing threads keep the configuration that was active when they began.

## What's next

- [The Autobot Dashboard](/docs/autobot/dashboard) — see your admin vs BYO token split and how close you are to the quota.
- [Execution copilot](/docs/autobot/execution-copilot) — what a BYO key unlocks: running and fixing automation from chat.
- [Chat interface](/docs/autobot/chat-interface) — where thread settings and the Customize modal live.
- [Limits & Privacy](/docs/autobot/limits-and-privacy) — the quotas BYO lets you sidestep.
