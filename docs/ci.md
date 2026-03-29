# Continuous Integration

The repository includes a baseline GitHub Actions workflow for pull requests and pushes to `main`.

## Current scope

- checks out the repository
- configures Node.js
- verifies baseline repository structure

## Current location

`.github/workflows/ci.yml`

This workflow is intentionally lightweight so it can merge safely before full package-level scripts exist.
