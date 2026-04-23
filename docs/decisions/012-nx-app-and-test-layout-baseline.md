# ADR-012: Nx App and Test Layout Baseline

## Status

Accepted

## Context

MTG Tracking uses Nx and groups backend and frontend under one application root. The repository needs a stable layout before code generation starts.

## Decision

The project adopts the following baseline:

```text
apps/
  mtgtracking/
    backend/
    frontend/
packages/
  database/
  ui/
```

### Backend test placement

- Unit tests stay colocated with the implementation they validate.
- MockMvc integration tests also stay colocated when they validate a concrete module or controller boundary.
- If backend stack-level e2e tests are introduced later, they live under `apps/mtgtracking/backend/test/e2e`.

### Frontend test placement

- Unit tests stay colocated with components, services, and other local units.
- Component and page-level tests stay colocated with the feature they validate.
- Playwright tests live under `apps/mtgtracking/frontend/e2e`.

## Consequences

- The repository gets a predictable app-oriented Nx structure.
- Test placement is explicit for both stacks before implementation begins.
- Shared code has documented homes outside the app root, reducing duplication pressure.