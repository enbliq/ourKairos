# Health Routes Template

This template provides liveness and readiness endpoints for a future Express API.

## Endpoints

- `/health/live`
- `/health/ready`

## Design

- liveness returns process-level availability
- readiness can include dependency checks such as MongoDB
- responses stay small and machine-readable

The template is merge-safe and can be copied into the API app when it is created.
