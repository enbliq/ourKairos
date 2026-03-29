# Authorization

The repository includes a reusable owner-scoped authorization template.

## Current location

`tooling/authorization-template`

## Behavior

- owners can read and mutate their own resources
- admins can bypass owner checks
- non-owners should receive redacted or forbidden responses depending on the route
