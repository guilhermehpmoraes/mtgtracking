# Architecture Overview

## Purpose

This document describes the repository-wide architecture for MTG Tracking: its deployable surfaces, shared packages, topology, and cross-cutting rules. Detailed implementation structure for the application itself lives in `docs/specs/apps/mtgtracking/architecture.md`.

## System Context

MTG Tracking is a personal analytics product focused on Magic: The Gathering tournament data. The system is planned as a single full-stack application inside an Nx monorepo, with shared packages for persistence and reusable UI.

The repository currently contains the baseline documentation and SDD scaffolding. Application code will be added through normal feature delivery.

## Guiding Principles

- Keep backend, frontend, and shared package boundaries explicit.
- Prefer repository conventions that work cleanly with Nx orchestration.
- Use migrations as the only schema-change mechanism.
- Keep analytics logic traceable to persisted source data rather than derived spreadsheets or external notes.
- Record durable decisions in ADRs before they become implicit conventions.

## Repository Layout

The planned repository layout is:

```text
design/
  <pencil-artifacts-and-references>
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
docs/
  architecture.md
  project.spec.md
  decisions/
  specs/
```

### Surface responsibilities

- `apps/mtgtracking/backend`: Spring application, domain orchestration, Hibernate mappings, Flyway migrations, and database access.
- `apps/mtgtracking/frontend`: Angular application, analytics screens, user interactions, and Tailwind-based presentation.
- `packages/database`: reusable persistence abstractions, including the base entity and future shared database helpers.
- `packages/ui`: reusable UI primitives, theme implementation, and shared visual building blocks.
- `design/`: Pencil artifacts and design references for visually relevant work.

## Documentation Hierarchy

| Level | Location | Purpose |
|-------|----------|---------|
| Repo-wide | `docs/architecture.md` | Repository topology, layers, shared packages, and cross-cutting rules |
| Project-wide | `docs/project.spec.md` | Product scope, goals, operating model, and bootstrap baseline |
| App-wide | `docs/specs/apps/mtgtracking/architecture.md` | Internal architecture for the MTG Tracking app |
| Optional domain | `docs/specs/domains/<domain>.md` | Stable capability ownership when needed |
| Feature | `docs/specs/features/<feature-id>/` | Feature spec, plan, and task artifacts |

## Architectural Building Blocks

- **Deployable surfaces**: one backend API and one frontend web application under the same app root.
- **Capability boundaries**: capability-oriented areas such as tournaments, matches, decks, and analytics, documented further as the product grows.
- **Shared assets**: database base abstractions, UI primitives, global theme implementation, and interface definitions.
- **Operational surfaces**: Nx task orchestration, Gradle backend builds, Flyway migrations, and release flow through `main`.

## Logical Layers

### Presentation Layer

- Angular frontend for user-facing workflows and analytics visualization.
- Tailwind-based styling backed by shared UI primitives from `packages/ui`.
- OpenAPI-documented HTTP surface exposed by the backend.

### Application Layer

- Spring services and use-case orchestration.
- Validation, transaction boundaries, and application-level coordination.
- API controllers exposing stable contracts to the frontend.

### Domain or Capability Layer

- Core product concepts such as tournaments, matches, deck context, and derived performance analytics.
- Business rules that decide how tracked data becomes meaningful metrics.

### Data and Integration Layer

- Hibernate-based persistence against Neon PostgreSQL.
- Flyway migrations as the authoritative schema evolution mechanism.
- Shared entity lifecycle metadata via a reusable base entity in `packages/database`.

## Cross-Cutting Concerns

- **Dependency management**: pnpm owns workspace and frontend dependencies; Gradle owns backend dependencies and backend build lifecycles.
- **Naming**: English across code, docs, database objects, and automation identifiers.
- **Entity lifecycle**: shared base entity with `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, and `deleted_by`; soft delete is the default.
- **Testing**: backend unit and MockMvc integration tests colocated near the implementation; frontend unit and component tests colocated; Playwright tests under `apps/mtgtracking/frontend/e2e`.
- **Interface documentation**: OpenAPI is the source of truth for HTTP contracts.
- **Design workflow**: `design/` stores artifacts and Pencil references; Pencil is mandatory for meaningful visual or UX changes.
- **Responsive baseline**: mobile-first.
- **Shared package strategy**: place long-lived cross-cutting code in `packages/database` and `packages/ui` before duplicating it inside app code.

## Architectural Decision Process

Any long-lived repository, tooling, persistence, or interface rule should be captured in `docs/decisions/`. Feature specs, plans, and tasks should reference those ADRs rather than re-stating the same rationale.

## Non-Functional Expectations

- Schema safety through explicit migrations and `ddl-auto: validate`.
- Reliable analytics derived from consistent persisted data.
- Responsive frontend behavior with a mobile-first baseline.
- Maintainable code with warning-free quality gates.
- Clear release flow from `develop` to `main`.

## Evolution Rules

- Update this document when repository topology or cross-cutting rules change materially.
- Add or update the app architecture doc when repo-wide documentation becomes too coarse.
- Introduce domain docs only when capability boundaries need explicit ownership.
- Use ADRs for the rationale, feature specs for intent, and plans/tasks for implementation detail.