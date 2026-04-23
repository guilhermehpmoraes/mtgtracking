# ADR-007: Test Organization and Evidence Baseline

## Status

Accepted

## Context

MTG Tracking has different validation layers across backend and frontend. The repository needs explicit test placement rules so future Nx projects remain predictable and task evidence stays consistent.

## Decision

The project uses the following test layers:

- **Backend unit tests**: JUnit 5 and Mockito, colocated with the implementation they validate.
- **Backend HTTP/integration tests**: MockMvc-based tests, also colocated when they validate a specific controller or module boundary.
- **Frontend unit tests**: Jest, colocated with the implementation.
- **Frontend component tests**: Testing Library, colocated with the relevant component or feature.
- **Frontend end-to-end tests**: Playwright under `apps/mtgtracking/frontend/e2e`.

### Environment and execution rules

- Backend tests may require application-context and database-test setup depending on scope.
- Frontend e2e tests require the runnable frontend and backend surfaces or approved test doubles.
- Validation should be surfaced through Nx targets when available.
- Every implemented task must record the exact test commands executed and the observed result summary in the Test Evidence table.

## Consequences

- Tests stay close to the code they validate unless they are stack-level e2e flows.
- Implementation work cannot be marked complete without real execution evidence.
- Future generated projects must expose targets that respect these placement rules.