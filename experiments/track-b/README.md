# Track B Sandbox

This folder is an isolated contributor sandbox. It is intentionally separate from the main delivery path so work can happen in parallel without affecting the OG issues.

## Goals

- Keep contributor activity alive with low coupling to production code.
- Provide a clean place for tangent prototypes and experiments.
- Make cleanup simple and low-risk.

## Boundaries

- Keep all new code under `experiments/track-b`.
- Do not import from:
  - `apps/api`
  - `apps/web`
  - `apps/stellar`
- Do not add runtime wiring to the main app.
- If shared contracts are needed, only import from shared packages.

## Quickstart

```bash
cd experiments/track-b
pnpm install
pnpm dev
```

## Available Scripts

- `pnpm dev`
- `pnpm dev:b02`
- `pnpm dev:b03`
- `pnpm build`
- `pnpm build:b02`
- `pnpm build:b03`
- `pnpm typecheck`
- `pnpm typecheck:b02`
- `pnpm typecheck:b03`
- `pnpm lint`
- `pnpm lint:b02`
- `pnpm lint:b03`
- `pnpm test`
- `pnpm test:b02`
- `pnpm test:b03`
- `pnpm run:b03 -- --url <endpoint> --concurrency 5 --duration 20 --profile create-capsule`

## Cleanup

This sandbox is intentionally disposable:

1. Remove this folder: `experiments/track-b`
2. No app/runtime cleanup should be required outside this path.
