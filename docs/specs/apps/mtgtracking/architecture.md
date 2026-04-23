# MTG Tracking App Architecture

## Purpose

This document describes the internal architecture baseline for the `mtgtracking` application inside the Nx monorepo.

The application combines:

- a Spring backend responsible for persistence, domain orchestration, and API contracts
- an Angular frontend responsible for data entry, navigation, and analytics visualization

## Planned Layout

```text
apps/
  mtgtracking/
    backend/
      src/
      test/
    frontend/
      src/
      e2e/
packages/
  database/
  ui/
design/
```

## Surface Responsibilities

### Backend

- expose HTTP endpoints consumed by the frontend
- coordinate application use cases around tournament tracking and analytics
- manage persistence through Hibernate and Neon PostgreSQL
- evolve schema through Flyway migrations only
- inherit shared lifecycle metadata from the reusable persistence base abstraction

### Frontend

- provide user-facing flows for registering tournament and match data
- present analytics views such as win rate and progression over time
- consume backend contracts documented through OpenAPI-derived metadata
- use shared UI primitives and theme values from `packages/ui`

### Shared Packages

- `packages/database`: reusable persistence abstractions, entity lifecycle baseline, and future shared data helpers
- `packages/ui`: reusable UI components, theme tokens, and shared presentation primitives

## Capability Areas

The initial capability map is intentionally lightweight:

- tournament tracking
- match results
- deck context
- analytics and reporting

If any of these areas requires dedicated ownership, `docs/specs/domains/` should gain a dedicated domain document.

## Persistence Baseline

- database engine: Neon PostgreSQL
- schema evolution: Flyway
- Hibernate mode: `ddl-auto: validate`
- audit fields: `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`
- deletion strategy: soft delete by default

## Testing Baseline

### Backend

- unit tests: JUnit 5 + Mockito, colocated with implementation
- HTTP/integration tests: MockMvc, colocated when scoped to a concrete boundary
- stack-level e2e tests, if introduced later: `apps/mtgtracking/backend/test/e2e`

### Frontend

- unit tests: Jest, colocated with implementation
- component tests: Testing Library, colocated with relevant features
- end-to-end tests: Playwright in `apps/mtgtracking/frontend/e2e`

## Design Baseline

- Pencil is the source of truth for meaningful visual or UX changes
- design artifacts live in `design/`
- mobile-first is the default responsive posture

## Evolution Rules

- Update this document when the internal structure of the app changes materially.
- Keep long-lived cross-cutting code in `packages/database` and `packages/ui` rather than duplicating it in app code.
- Add domain docs only when a capability needs stable architectural ownership.