---
sidebar_position: 7
title: CI/CD
description: Run AutoSage workflows from a CI pipeline with SageCode and an access token, so a failed deploy fails the build. Includes a GitHub Actions example.
---

# CI/CD

SageCode slots into any pipeline: give it an access token, run a workflow, and the job's exit code follows the run, so a failed deploy fails the build.

## 1. Create an access token

On your profile's **SageCode** tab, click **Create token**, name it after the pipeline (for example `GitHub Actions`), and copy it. It's shown once. Store it in your CI provider's secrets as `SAGEX_API_KEY`. See [Access tokens for CI](/sagecode/getting-started/sessions-and-tokens#access-tokens-for-ci).

## 2. Run SageCode in the pipeline

Here's a GitHub Actions job:

```yaml title=".github/workflows/deploy.yml"
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/setup-python@v5
        with: { python-version: "3.12" }
      - run: pip install sagex-cli
      - name: Deploy
        env:
          SAGEX_API_KEY: ${{ secrets.SAGEX_API_KEY }}
        run: sagex run workflow "Deploy Production" -p VERSION=${{ github.sha }} --no-log
```

SageCode reads `SAGEX_API_KEY` ahead of any saved sign-in, so no `auth login` step is needed. Any CI system works the same way: install `sagex-cli`, set `SAGEX_API_KEY`, run your command.

## Things to know

- **Exit codes:** `run workflow` exits `0` on success, `1` on failure and `130` if cancelled. `run script` exits with the script's own code.
- **Pipelines can't answer prompts**, so every parameter needs a value, either saved in the workflow or passed with `-p NAME=VALUE`.
- **Secret parameters must be saved in the workflow.** SageCode won't take a secret as a flag, even in CI.
- **`--no-log`** skips saving logs into the job's workspace. Leave it off and upload `logs/` as a build artifact if you want them.
- **Use `--json`** with `list` and `show` commands to feed results into `jq` or other steps.
- **Each run counts** toward your plan's [monthly limits](/docs/plans/overview), and the token's activity shows on your profile.

## Without installing anything

Prefer not to install SageCode in the pipeline? Give the workflow an [HTTP trigger](/sagecode/guides/triggers#expose-a-webhook) and call it with `curl`, using your commit SHA as the `Idempotency-Key` so a retried job never starts a second deploy:

```sh
curl -X POST "$DEPLOY_WEBHOOK_URL" \
  -H "X-Trigger-Secret: $DEPLOY_WEBHOOK_SECRET" \
  -H "Idempotency-Key: $GITHUB_SHA" \
  -H "Content-Type: application/json" \
  -d '{"inputs": {"param-1": "'"$GITHUB_SHA"'"}}'
```

The response includes a `polling_url` you can check, with the same secret, until the run finishes.
