# Feature Spec: Initialize MTG Tracking Full-Stack App

- **Feature ID**: 001-initialize-mtgtracking-app
- **Status**: In Implementation
- **Created**: 2026-04-23
- **Last Updated**: 2026-04-24
- **Owner**: Guilherme Moraes
- **Domain/Area**: Platform Foundation
- **Product/Surface**: mtgtracking backend, frontend, and shared packages
- **Source Inputs**: User request: "inicie o primeiro app, que vai ser o mtgtracking, sera full stack, com backend e fronted"
- **Feature Folder**: docs/specs/features/001-initialize-mtgtracking-app/
- **Feature File**: docs/specs/features/001-initialize-mtgtracking-app/feature.spec.md
- **Plan File**: docs/specs/features/001-initialize-mtgtracking-app/plan.spec.md
- **Task Folder**: docs/specs/features/001-initialize-mtgtracking-app/tasks/
- **Related ADRs**: 003-quality-gates-and-tooling-baseline, 009-sdd-branching-strategy, 011-frontend-design-system-and-pencil-workflow, 012-nx-app-and-test-layout-baseline, 013-database-entity-lifecycle-baseline

## 1. Context

The repository already defines MTG Tracking as a full-stack Nx monorepo, but the planned application surfaces do not exist yet. The first delivery step must establish the initial app structure for the Spring backend, Angular frontend, and the shared packages required by the documented architecture.

This feature matters now because all subsequent product features depend on a stable application skeleton, consistent workspace wiring, and validation targets that follow the repository standards.

## 2. Scope

### In Scope

- Create the initial `apps/mtgtracking/backend` application surface aligned with the Spring and Gradle baseline.
- Create the initial `apps/mtgtracking/frontend` application surface aligned with the Angular and Tailwind baseline.
- Create or wire the foundational shared packages `packages/database` and `packages/ui` needed by the app architecture.
- Establish Nx project configuration, naming, and validation targets needed to build, lint, and test the initial surfaces.

### Out of Scope

- Implement tournament, deck, match, or analytics business features.
- Define production-ready UI flows beyond the minimal shell needed to prove the app surfaces are wired.
- Add domain-specific database schema beyond the minimum foundation required by the shared persistence baseline.
- Deploy infrastructure, CI/CD flows, or release automation changes unrelated to app initialization.

## 3. User Scenarios (Prioritized)

### Scenario 1 - Start the Product Surfaces (P1)

As the project maintainer, I need the monorepo to contain the first backend and frontend app surfaces so that future features have concrete targets for implementation and validation.

#### Acceptance Scenarios

1. **Given** the repository contains only documentation and workspace metadata, **When** the initialization feature is completed, **Then** Nx exposes app projects for the MTG Tracking backend and frontend in the expected app-oriented structure.
2. **Given** the app surfaces exist, **When** the standard validation targets are executed, **Then** the backend and frontend foundations complete without warnings or missing configuration errors.

### Scenario 2 - Reuse Shared Foundations (P2)

As the project maintainer, I need shared database and UI packages to exist from the start so the app does not duplicate cross-cutting concerns.

#### Acceptance Scenarios

1. **Given** the initial app surfaces are scaffolded, **When** shared concerns are needed, **Then** the repository provides dedicated `packages/database` and `packages/ui` projects or equivalent shared package wiring aligned with the documented architecture.

### Scenario 3 - Keep the Foundation Ready for Feature Work (P3)

As the project maintainer, I need the initialized workspace to match the documented architecture so future feature specs can target stable paths, validation commands, and ownership boundaries.

#### Acceptance Scenarios

1. **Given** the app foundation is in place, **When** a new feature is planned, **Then** the feature can reference backend, frontend, and shared-package targets without redefining repository topology.

## 4. Functional Requirements

- **FR-001**: The system MUST provide an Nx application project for `apps/mtgtracking/backend` using the documented Java, Spring, and Gradle stack.
- **FR-002**: The system MUST provide an Nx application project for `apps/mtgtracking/frontend` using the documented Angular and Tailwind stack.
- **FR-003**: The system MUST provide shared package foundations for persistence and UI concerns under `packages/database` and `packages/ui`, or a documented equivalent aligned with Nx workspace conventions.
- **FR-004**: The system MUST expose repository-standard validation targets for the initialized projects so that build, lint, and test commands can run through Nx.
- **FR-005**: The initialized workspace MUST preserve the documented app-oriented layout and naming conventions for `mtgtracking`.

## 5. Engineering Quality Constraints

- **EQ-001 (KISS)**: The implementation MUST prefer the minimum scaffolding needed to establish stable app surfaces.
- **EQ-002 (Self-descriptive code)**: Generated and edited files MUST remain understandable through naming and structure without explanatory comments.
- **EQ-003 (Comments policy)**: Comments MUST be added only for non-obvious intent, tradeoffs, or constraints.
- **EQ-004 (Testability)**: The foundation MUST include runnable validation surfaces that support focused verification of backend and frontend setup.
- **EQ-005 (Patterns baseline)**: Project structure, naming, and validation MUST follow the current ADR baseline unless explicitly justified.

## 6. Dependencies and Risks

### Dependencies

- Nx generators and plugins compatible with the documented backend and frontend stack.
- Existing repository conventions documented in `docs/project.spec.md`, `docs/architecture.md`, and the app architecture baseline.
- Package manager and build tooling support for pnpm, Nx, Gradle, and Angular.

### Risks

- Generator choices may not map cleanly to the documented app-oriented layout -> Validate generators with dry runs before materializing projects.
- Backend and frontend toolchains may introduce default files or targets that conflict with repository standards -> Normalize generated output during implementation.
- Shared package wiring may fail if workspace dependencies are not linked correctly -> Explicitly validate Nx project graph and imports after generation.

## 7. Success Criteria

- **SC-001**: The repository contains the first `mtgtracking` backend and frontend app projects under the documented Nx layout.
- **SC-002**: The initialized app foundation exposes working Nx validation targets for the touched projects with no warnings accepted.
- **SC-003**: Shared persistence and UI foundations are present and referenced as the standard reuse points for later work.

## 8. Validation Mapping

Map each acceptance criterion to tests before implementation starts.

- **AC-001** -> Nx workspace inspection / integration validation -> backend and frontend project registration
- **AC-002** -> build, lint, and test targets through Nx -> initialized app surfaces
- **AC-003** -> Nx workspace inspection / targeted import validation -> shared package projects and dependency wiring

Also map engineering constraints to validation checks.

- **EQ-001/EQ-005** -> Design review against ADRs and generated workspace layout
- **EQ-002/EQ-003** -> Code review checklist on generated and normalized files
- **EQ-004** -> Focused Nx build, lint, and test execution for affected projects

## 9. Planning Inputs for Step 2

Use this section to make Step 2 deterministic.

### Affected Areas

- `apps/mtgtracking/backend`
- `apps/mtgtracking/frontend`
- `packages/database`
- `packages/ui`
- root Nx workspace configuration
- package-manager and build-tool integration files created by generators

### Proposed Implementation Slices

- Slice 1: scaffold and normalize the backend application surface
- Slice 2: scaffold and normalize the frontend application surface
- Slice 3: scaffold or wire shared packages and connect workspace validation

### Contracts and Constraints

- Backend must align with Spring, Hibernate, Flyway, and Gradle conventions documented in the repo.
- Frontend must align with Angular, Tailwind, mobile-first design posture, and reusable UI package conventions.
- Shared database foundation must reserve the reusable base entity pattern with audit metadata and soft-delete baseline.
- Shared UI foundation must act as the central location for reusable primitives and theme tokens.
- All runnable quality gates should execute through Nx targets where available.

### Technical Detail Baseline (Step 2 Input)

Capture enough technical detail so each generated task can be implemented without hidden context.

- **Data changes (if applicable)**: backend foundation may introduce baseline Flyway and persistence scaffolding, but no domain schema beyond what is required for shared persistence initialization.
- **API or interface contracts (if applicable)**: backend should expose only the minimum application shell needed to validate startup and future endpoint integration.
- **UI or interaction contracts (if applicable)**: frontend should provide a minimal application shell and styling baseline, not feature-specific screens.
- **Migration or rollout notes (if applicable)**: generator output must be normalized into the documented paths; any initial migration strategy should remain additive and forward-only.

### Known Dependencies

- Backend generator availability for Java and Spring in the Nx workspace
- Frontend generator availability for Angular in the Nx workspace
- Tailwind and shared-package integration approach supported by the current toolchain

### Open Questions to Resolve in Planning

- Which exact Nx generators or workspace plugins should own backend and shared-package scaffolding?
- What is the minimal shared persistence implementation that satisfies the base-entity baseline without overdesign?
- Does the frontend initialization require a Pencil artifact, or can the minimal shell be treated as non-visually-material foundation work?

## 10. Workflow and Status Gates

### Status Transition Rules

- On creation in Step 1, set **Status** to `Draft` and save the feature spec file.
- After user approval, update **Status** to `Approved`.
- When Step 2 starts, update **Status** to `In Planning`.
- After feature plan approval and task file generation, update **Status** to `Planned`.
- When implementation of the first task starts, update **Status** to `In Implementation`.
- After all scoped tasks are done and validated, update **Status** to `Done`.

### Gate to move Step 1 -> Step 2

- [x] Scope and requirements are approved.
- [x] Acceptance scenarios are testable.
- [x] Planning inputs are complete enough to derive tasks.

### Gate to move Step 2 -> Step 3

- [x] Feature plan is approved.
- [x] Task files are generated under `docs/specs/features/<feature-id>/tasks/`.
- [x] At least one task has status `Ready`.

## 11. Optional Data Impact

Fill this section only if the feature changes domain data.

### Entities

- **Base persistence abstraction**: foundation for shared audit metadata and entity lifecycle rules.

### Data Notes

- This feature should avoid premature domain modeling and restrict persistence work to the minimum reusable foundation needed by the documented architecture.

## 12. Fixed Learnings Input (SDD Evolution)

Complete this section after finishing the feature.

### Keep

- TBD

### Avoid

- TBD

### Promote to Standard

- TBD

### Process Improvement for Next Cycle

- TBD