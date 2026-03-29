# Capsule Lifecycle

The repository includes a capsule service template that defines draft, sealed, and unlocked transitions.

## Current location

`tooling/capsule-service-template`

## Transition rules

- only drafts can be updated
- only drafts can be sealed
- only sealed capsules can be unlocked
- unlock is gated by the configured unlock date
