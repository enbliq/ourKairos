# Mongo Model Template

This template provides merge-safe reference models for the future API application.

## Included domains

- user
- capsule
- recipient delivery
- capsule gift

## Design rules

- keep persistence shape explicit
- define indexes close to the schema
- split model fields from business services
- keep timestamps enabled consistently

Copy these templates into `apps/api/src/models` when the API package is present.
