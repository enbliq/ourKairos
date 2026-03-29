# Request Validation

The repository includes a reference validation toolkit for future Express routes.

## Goals

- normalize request validation behavior
- return a consistent `400` error payload
- keep validators testable outside route files

## Current location

`tooling/request-validation-template`

## Included pattern

- `Validator<T>` for schema-like parsing
- `validateRequest()` middleware wrapper
- shared validation error payload formatting

This implementation is intentionally dependency-light so it can merge before any framework or package decisions are finalized.
