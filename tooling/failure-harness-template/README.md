# Failure Harness Template

This template provides a controlled way to inject failures into future Express routes.

## Supported modes

- latency spike
- random 500
- timeout
- dropped response
- malformed JSON

The harness is designed to be opt-in and safe to merge before the API app exists.
