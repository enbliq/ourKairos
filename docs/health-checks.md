# Health Checks

The repository includes a template for API liveness and readiness endpoints.

## Current location

`tooling/health-routes-template`

## Behavior

- liveness is intended to confirm the process can respond
- readiness is intended to confirm required dependencies are available
- MongoDB readiness can be added through the provided dependency factory

This allows health and readiness behavior to be standardized before the API application is created.
