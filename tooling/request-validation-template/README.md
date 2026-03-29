# Request Validation Template

This template provides a lightweight validation pattern for future Express routes.

## Included pieces

- schema-like validator helpers
- request payload guards
- normalized error formatting

## Intended usage

Copy these files into the API app when route handlers are added.

The template avoids coupling to a specific validation library so it can merge safely before the API package exists.
