# Environment Validation

This repository uses a central manifest at `config/environment.manifest.json` to describe required and optional environment variables for each app.

## Validation behavior

- If an app directory does not exist yet, validation skips it.
- If an app directory exists and `.env.example` is missing, the validator creates one from the manifest.
- If an app directory exists and `.env` is present, required keys must be populated.
- Optional keys are documented but not enforced.

## Supported app profiles

- `api`
- `web`
- `stellar`

## Run manually

Use:

`node ./scripts/validate-env.mjs`

This script is intentionally safe for partial monorepo states so it can merge before or after app scaffolding changes.
