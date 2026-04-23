# ADR-006: Dependency Management Policy Baseline

## Status

Accepted

## Context

MTG Tracking mixes JavaScript/TypeScript workspace tooling with a Java backend. Dependency ownership must be explicit so Nx, Angular, Spring, and shared packages do not compete for the same source of truth.

## Decision

The dependency policy is split by stack, with one clear owner per dependency surface:

- **pnpm** owns workspace dependencies, Nx plugins, frontend dependencies, and shared JavaScript/TypeScript packages.
- **Gradle** owns backend dependencies, backend plugins, and backend build lifecycles.

### Coordination rules

- Shared frontend and workspace versions should be centralized through the pnpm workspace.
- Shared backend versions should be centralized through Gradle-native mechanisms once backend projects are materialized.
- Internal cross-cutting code should be referenced through workspace packages or project boundaries, not duplicated ad hoc.
- Dependency upgrades should be coordinated at the repository level so frontend, backend, and tooling remain compatible.

## Consequences

- Each stack has a clear dependency-resolution owner.
- Future generators and project setup work must preserve this split rather than collapsing everything into one tool.
- Tooling and upgrade discussions can point to an explicit dependency policy instead of implied habits.