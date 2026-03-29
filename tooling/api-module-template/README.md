# API Module Template

This template provides a minimal Express module layout that can be copied into `apps/api/src/modules/<feature>` when the API app exists.

## Layout

- `index.ts`: module exports
- `<feature>.routes.ts`: route registration
- `<feature>.controller.ts`: request handlers
- `<feature>.service.ts`: business logic
- `<feature>.types.ts`: module-local types

## Design goals

- Route files only compose middleware and handlers
- Controllers translate HTTP requests into service calls
- Services own business rules and persistence orchestration
- Types stay close to the module until they become shared contracts

## Integration notes

- Register modules from a single `src/modules/index.ts`
- Keep middleware in `src/middleware`
- Keep app bootstrap and shared Express concerns in `src/app`
