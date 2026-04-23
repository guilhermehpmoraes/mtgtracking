# ADR-003: Quality Gates and Tooling Baseline

## Status

Accepted

## Context

MTG Tracking is a mixed-stack Nx monorepo with Java/Spring on the backend and Angular on the frontend. The project needs one explicit quality baseline so backend and frontend work can be validated consistently without guessing tool ownership.

## Decision

The project adopts the following baseline:

- **Workspace orchestration**: Nx is the canonical task surface whenever a project exposes an Nx target.
- **Workspace and frontend formatting/lint**: Biome.
- **Backend build and verification**: Gradle.
- **Backend static analysis**: Checkstyle and SpotBugs via Gradle.
- **Backend tests**: JUnit 5 for unit tests, Mockito for mocking, and MockMvc for HTTP/integration coverage.
- **Frontend tests**: Jest for unit tests, Testing Library for component-level behavior, and Playwright for end-to-end coverage.
- **Warnings policy**: warnings are treated as issues to eliminate, not as acceptable steady-state output.

### Canonical validation direction

- Frontend and workspace validation should be exposed through Nx targets and may also use Biome directly where appropriate.
- Backend validation should be exposed through Nx targets that delegate to Gradle tasks.
- Completed implementation tasks must record the exact validation commands that were executed in the task spec's Test Evidence section.

## Consequences

- Backend and frontend validation rules are explicit from the start.
- Future Nx projects must surface lint, test, build, and e2e tasks in a way that maps cleanly to these tool choices.
- Tooling drift is easier to detect because the repository now has a declared quality baseline.