# Data Models

The repository includes reference Mongo schemas for the future API service.

## Covered models

- `User`
- `Capsule`
- `Recipient`
- `CapsuleGift`

## Intent

These templates define a stable persistence shape and index strategy before the API app is added.

## Current location

`tooling/mongo-model-template`

The files are designed to be copied into the API package without coupling the current `main` branch to an unfinished app structure.
