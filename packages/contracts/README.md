# Shared Contracts

This package contains transport-level contracts that can be consumed by the API, web app, background workers, and mobile clients.

## Included artifacts

- TypeScript interfaces in `src/index.ts`
- JSON Schema documents in `schemas/`

## Current domain coverage

- Capsule creation payload
- Capsule update payload
- Capsule response record

The package is intentionally framework-agnostic so it can merge safely before any app-specific integration code exists.
