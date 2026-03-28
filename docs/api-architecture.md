# API Architecture

This repository uses a feature-module pattern for the Express API.

## Proposed structure

When `apps/api` is added, use this layout:

- `src/app`
  - `create-app.ts`
  - `register-routes.ts`
- `src/middleware`
  - shared middleware and error handling
- `src/modules`
  - one folder per feature

Example:

- `src/modules/health`
- `src/modules/auth`
- `src/modules/capsules`

Each feature module should contain:

- routes
- controller
- service
- types

## Registration flow

1. App bootstrap creates the Express app.
2. Shared middleware is attached.
3. Feature routers are mounted from a single module registry.
4. Error middleware is mounted last.

## Why this is merge-safe

- New features can add a module without editing unrelated business logic.
- Routing stays centralized while implementation remains feature-scoped.
- Services can evolve independently from controllers and middleware.

## Template

Use `tooling/api-module-template` as the starting point for new modules.
