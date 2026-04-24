# Feature Plan: Initialize MTG Tracking Full-Stack App

- **Feature ID**: 001-initialize-mtgtracking-app
- **Plan ID**: PLAN-001-initialize-mtgtracking-app
- **Status**: Ready for Implementation
- **Date**: 2026-04-23
- **Last Updated**: 2026-04-24
- **Owner**: Guilherme Moraes
- **Feature Folder**: docs/specs/features/001-initialize-mtgtracking-app/
- **Feature Spec**: docs/specs/features/001-initialize-mtgtracking-app/feature.spec.md
- **Plan File**: docs/specs/features/001-initialize-mtgtracking-app/plan.spec.md
- **Task Output Folder**: docs/specs/features/001-initialize-mtgtracking-app/tasks/
- **Related ADRs**: 003-quality-gates-and-tooling-baseline, 005-naming-and-language-conventions, 009-sdd-branching-strategy, 011-frontend-design-system-and-pencil-workflow, 012-nx-app-and-test-layout-baseline, 013-database-entity-lifecycle-baseline

## 1. Planning Goal

Materialize the first executable MTG Tracking workspace foundation so Step 3 can generate self-sufficient tasks for backend, frontend, shared packages, and validation wiring without additional discovery.

## 2. Summary

- **Feature objective**: Create the first backend app, frontend app, shared persistence package, shared UI package, and root workspace/tooling files required by the documented Nx monorepo baseline.
- **Why now**: The repository currently contains documentation and `nx.json`, but no registered Nx projects, no package-manager metadata, no Gradle build, and no app code. Future features cannot be implemented until the baseline surfaces exist.
- **Expected outcome**: The repository exposes four concrete project roots under the documented layout, and Nx can run the canonical validation targets for the initialized backend and frontend foundation without warnings.
- **Implementation direction**: Use first-party Nx generation for Angular, plain Nx project registration plus a Gradle multi-project build for Java/shared persistence, and keep the initial UI and persistence shells minimal.

## 3. Technical Context

### Project Baseline (from bootstrap)

- **Repository topology**: Nx monorepo
- **Primary stack(s)**: Java + Spring + Hibernate on the backend; Angular + Tailwind CSS v4 on the frontend
- **Build/task runner**: Nx orchestrates workspace tasks; Gradle builds Java projects
- **Dependency management**: pnpm for workspace and frontend dependencies; Gradle for backend and shared Java dependencies
- **Data stores**: Neon PostgreSQL
- **Tests**: JUnit 5, Mockito, MockMvc, Jest, Testing Library, Playwright

### Feature-Specific Context

- **Touched areas**: `package.json`, `pnpm-workspace.yaml`, `biome.json`, `nx.json`, `tsconfig.base.json`, `design/`, `apps/mtgtracking/backend`, `apps/mtgtracking/frontend`, `packages/database`, `packages/ui`, `README.md`, `docs/specs/apps/mtgtracking/architecture.md`
- **New dependencies**:
  - Workspace dev dependencies: `nx@22.6.5`, `@nx/angular@22.6.5`, `@nx/js@22.6.5`, `@biomejs/biome@latest`, `tailwindcss@^4`
  - Backend Gradle plugins: `org.springframework.boot` 3.5.x, `io.spring.dependency-management` 1.1.x, `org.flywaydb.flyway` 12.x, SpotBugs Gradle plugin latest compatible
  - Backend dependencies managed by the Spring Boot BOM: `spring-boot-starter-web`, `spring-boot-starter-actuator`, `spring-boot-starter-data-jpa`, `spring-boot-starter-validation`, `flyway-core`, `postgresql`, `spring-boot-starter-test`
- **Data impact**: No domain tables or business migrations are introduced in this feature. The feature establishes the shared mapped-superclass contract, the Flyway directory layout, and backend configuration for future migrations.
- **Design impact**: No meaningful visual or UX impact. The frontend shell is foundational and does not require a Pencil artifact.
- **Constraints**:
  - Backend and shared Java scaffolding must use plain Nx project registration plus a Gradle multi-project build, not a community Nx Java plugin.
  - Java package namespace is `com.mtgtracking`.
  - Gradle files use the Groovy DSL.
  - The backend shell exposes application startup and actuator health only; no product-facing API route is in scope.
  - The frontend styling baseline must use Tailwind CSS v4 semantics with `@import "tailwindcss";` in the global stylesheet and no dedicated workspace PostCSS configuration.
  - Do not generate or depend on a Tailwind CSS v3-style baseline such as `@tailwind base`, `@tailwind components`, `@tailwind utilities`, `postcss.config.*`, `.postcssrc.*`, or a mandatory initial `tailwind.config.js` unless a later approved feature introduces a concrete need for one of these files.
  - Generator output must be normalized to the documented app-oriented paths.

### Constraints and Assumptions

- **Inputs**:
  - Empty workspace from an application-code perspective
  - Nx 22.6.5 already present via the checked-in launcher
  - Approved feature scope and ADR baseline
- **Outputs**:
  - Registered Nx projects: `mtgtracking-backend`, `mtgtracking-frontend`, `database`, and `ui`
  - Root package-manager and formatting configuration files
  - Gradle multi-project build rooted at the repository
  - Runnable backend and frontend validation targets exposed through Nx
- **Boundary conditions**:
  - The current `./nx` invocation prompts for analytics on first use; implementation must normalize the workspace to run non-interactively in local automation.
  - No current `package.json`, `pnpm-workspace.yaml`, Gradle settings, `design/`, or app/package folders exist; these are prerequisites, not pre-existing assets.
  - No backend-to-frontend runtime integration is required in this feature; the frontend shell remains static.
  - The Angular/Nx frontend task must preserve the no-PostCSS Tailwind 4 direction even if generated defaults suggest an older integration pattern.
  - Java toolchain version is assumed to be 21 unless implementation evidence requires reducing to 17 for local compatibility.

## 3.1 Technical Design Baseline (Required)

This section is detailed enough to generate implementation-ready task specs.

### Data Design

#### Storage Objects and Actions

| Store/Schema | Object | Action (Create/Alter/Drop) | Purpose |
| ------------ | ------ | -------------------------- | ------- |
| N/A | N/A | N/A | This feature does not add domain storage objects or application tables. |

#### Fields Specification

| Object | Field | Type | Nullable | Default | PK | FK/Ref | Unique | Index | Notes |
| ------ | ----- | ---- | -------- | ------- | -- | ------ | ------ | ----- | ----- |
| `packages/database BaseEntity contract` | `created_at` | `timestamp with time zone` | No | application-assigned | No | N/A | No | Future index when entity-specific needs arise | Mapped from Java field `createdAt` |
| `packages/database BaseEntity contract` | `created_by` | `varchar(255)` | No | application-assigned | No | N/A | No | No | Mapped from Java field `createdBy` |
| `packages/database BaseEntity contract` | `updated_at` | `timestamp with time zone` | No | application-assigned | No | N/A | No | No | Mapped from Java field `updatedAt` |
| `packages/database BaseEntity contract` | `updated_by` | `varchar(255)` | No | application-assigned | No | N/A | No | No | Mapped from Java field `updatedBy` |
| `packages/database BaseEntity contract` | `deleted_at` | `timestamp with time zone` | Yes | `NULL` | No | N/A | No | Future entity-specific filtering indexes | `NULL` means active row |
| `packages/database BaseEntity contract` | `deleted_by` | `varchar(255)` | Yes | `NULL` | No | N/A | No | No | Populated together with `deleted_at` |

#### Constraints and Indexes

- No database-level constraints or indexes are created in this feature because no concrete tables are introduced.
- The shared persistence contract must reserve the rule that active records are represented by `deleted_at IS NULL`; future entity tasks must add indexes and constraints per entity rather than globally in this initialization feature.

#### Migration Strategy

- **Forward migration**: Create the Flyway directory structure under `apps/mtgtracking/backend/src/main/resources/db/migration/` and wire Spring Boot plus the Gradle Flyway plugin so future tasks can add forward-only SQL files. Do not add a domain SQL migration in this feature.
- **Rollback strategy**: Revert the wiring files and remove the empty migration directory; no applied domain migration needs reversal.
- **Backfill strategy**: N/A
- **Compatibility window**: N/A for runtime data compatibility because no domain schema is introduced.

### API and Integration Contracts

- **Endpoint/Consumer**: `GET /actuator/health`
- **Request contract**: No request body; standard Spring Boot Actuator health probe
- **Response contract**: Spring Boot Actuator health document with top-level `status` and optional nested component details when enabled by configuration
- **Error contract**: Standard actuator unavailability or server startup failure behavior only
- **Product API note**: No product-facing API route, DTO, OpenAPI document, or frontend integration is in scope for this feature

### Frontend Design Baseline

- **Design artifact location**: `design/`
- **Approved Pencil reference**: N/A - initialization shell only, no meaningful visual or UX change
- **Prototype approval state**: N/A
- **Reusable UI implementation surface**: `packages/ui`
- **Theme/token source**: `packages/ui/src/lib/theme.css` imported by the frontend global stylesheet, plus `packages/ui/src/index.ts` for future Angular exports
- **Tailwind baseline**: Tailwind CSS v4 with global stylesheet import `@import "tailwindcss";` and no dedicated PostCSS config file
- **Responsive posture**: Mobile-first, one-column app shell at small widths, bounded content width on larger screens

### UI Contracts

- **Design references**: N/A
- **Screen/Route**: `/`
- **States**: Static ready state only; loading, empty, and error states are out of scope because the shell does not fetch backend data in this feature
- **Validation rules**: N/A
- **Interaction notes**: Render a minimal application shell with project title, a placeholder description, and a reserved area for future navigation or metrics cards; no data-entry forms are included
- **Responsive behavior**: No horizontal overflow at 360px viewport width; centered content container with simple spacing adjustments above tablet width

## 4. Planning Gates (Step 2)

Must pass before the plan is approved and task breakdown (Step 3) can begin:

- [x] Feature spec status was `Approved` when planning started.
- [x] Feature scope is explicit and bounded.
- [x] Required contracts are defined or referenced.
- [x] Acceptance criteria are testable.
- [x] Dependencies are completed or properly sequenced.
- [x] Risks and edge cases are reviewed.
- [x] Technical design baseline is complete for all impacted layers.
- [x] Frontend/UI plans with meaningful visual impact include an approved Pencil reference.

### Engineering Gates

- [x] KISS-first approach is documented for major slices.
- [x] Pattern choice aligns with ADR baseline or deviation is justified.
- [x] Comment strategy is documented where comments are truly needed.
- [x] Testability is confirmed for slice boundaries.
- [x] Complexity hotspots are identified with mitigation.

## 5. Scope-to-Execution Mapping

Map feature scope into implementation slices that will become task files.

### Slice 1 - Bootstrap Workspace Tooling

- **Goal**: Materialize the root workspace files required for pnpm, Nx plugin installation, Biome, non-interactive Nx execution, and the documented repository layout.
- **Files to touch**: `package.json`, `pnpm-workspace.yaml`, `biome.json`, `tsconfig.base.json`, `nx.json`, `design/.gitkeep`
- **Requirements covered**: FR-004, FR-005
- **Acceptance covered**: AC-001, AC-002
- **Expected outputs**: Root workspace metadata, installable dependency graph, formatter/lint baseline, reserved `design/` directory

### Slice 2 - Scaffold Backend and Shared Persistence Foundation

- **Goal**: Create the Spring backend application shell plus the reusable `packages/database` Gradle subproject and their Nx registrations.
- **Files to touch**: `settings.gradle`, `build.gradle`, `gradle.properties`, `apps/mtgtracking/backend/build.gradle`, `apps/mtgtracking/backend/project.json`, `apps/mtgtracking/backend/src/main/java/com/mtgtracking/backend/MtgTrackingBackendApplication.java`, `apps/mtgtracking/backend/src/main/resources/application.yml`, `apps/mtgtracking/backend/src/main/resources/db/migration/.gitkeep`, `apps/mtgtracking/backend/src/test/java/com/mtgtracking/backend/MtgTrackingBackendApplicationTests.java`, `packages/database/build.gradle`, `packages/database/project.json`, `packages/database/src/main/java/com/mtgtracking/database/persistence/BaseEntity.java`
- **Requirements covered**: FR-001, FR-003, FR-004, FR-005
- **Acceptance covered**: AC-001, AC-002, AC-003
- **Expected outputs**: Runnable Spring Boot shell, actuator health surface, Flyway wiring, reusable mapped superclass with audit and soft-delete contract

### Slice 3 - Scaffold Frontend and Shared UI Foundation

- **Goal**: Create the Angular frontend shell, Tailwind baseline, and the `packages/ui` Angular-oriented shared UI surface.
- **Files to touch**: `apps/mtgtracking/frontend/project.json`, `apps/mtgtracking/frontend/src/main.ts`, `apps/mtgtracking/frontend/src/app/app.ts`, `apps/mtgtracking/frontend/src/app/app.routes.ts`, `apps/mtgtracking/frontend/src/app/app.html`, `apps/mtgtracking/frontend/src/app/app.css`, `apps/mtgtracking/frontend/src/styles.css`, `packages/ui/project.json`, `packages/ui/src/index.ts`, `packages/ui/src/lib/theme.css`
- **Requirements covered**: FR-002, FR-003, FR-004, FR-005
- **Acceptance covered**: AC-001, AC-002, AC-003
- **Expected outputs**: Runnable Angular shell at `/`, Tailwind CSS v4-enabled global stylesheet without dedicated PostCSS config, shared token/theme surface in `packages/ui`

### Slice 4 - Normalize Validation and Documentation Surfaces

- **Goal**: Connect all project validation commands through Nx and update developer-facing docs to match the materialized workspace.
- **Files to touch**: `apps/mtgtracking/backend/project.json`, `apps/mtgtracking/frontend/project.json`, `packages/database/project.json`, `packages/ui/project.json`, `README.md`, `docs/specs/apps/mtgtracking/architecture.md`
- **Requirements covered**: FR-003, FR-004, FR-005
- **Acceptance covered**: AC-001, AC-002, AC-003
- **Expected outputs**: Canonical Nx targets for build, lint, test, and e2e where applicable; updated architecture and setup documentation

## 6. Task Generation Matrix

Use this matrix to derive one task file per row.

| Task ID | Title | Type | Plan Slice | Parallelizable | Dependencies | Requirement Refs | Technical Scope | Output File |
| ------- | ----- | ---- | ---------- | -------------- | ------------ | ---------------- | --------------- | ----------- |
| T001 | Bootstrap root workspace tooling | Task | Slice 1 | No | N/A | FR-004, FR-005, AC-001, AC-002 | Root `package.json`, pnpm workspace files, Biome, Nx non-interactive config, `design/` scaffold | docs/specs/features/001-initialize-mtgtracking-app/tasks/T001-bootstrap-root-workspace-tooling.task.spec.md |
| T002 | Scaffold backend and database foundation | Task | Slice 2 | No | T001 | FR-001, FR-003, FR-004, FR-005, AC-001, AC-002, AC-003 | Gradle multi-project build, Spring Boot shell, actuator, Flyway wiring, `packages/database` mapped superclass | docs/specs/features/001-initialize-mtgtracking-app/tasks/T002-scaffold-backend-and-database-foundation.task.spec.md |
| T003 | Scaffold frontend and UI foundation | Task | Slice 3 | Yes | T001 | FR-002, FR-003, FR-004, FR-005, AC-001, AC-002, AC-003 | `@nx/angular` app generation, Tailwind CSS v4 setup without PostCSS config, static shell route, `packages/ui` token surface | docs/specs/features/001-initialize-mtgtracking-app/tasks/T003-scaffold-frontend-and-ui-foundation.task.spec.md |
| T004 | Wire validation targets and update docs | Task | Slice 4 | No | T002, T003 | FR-003, FR-004, FR-005, AC-001, AC-002, AC-003 | Nx target normalization, Biome/Gradle/Playwright command mapping, README and app-architecture updates | docs/specs/features/001-initialize-mtgtracking-app/tasks/T004-wire-validation-targets-and-update-docs.task.spec.md |

## 7. Task File Generation Rules

- Create one file per task under `docs/specs/features/001-initialize-mtgtracking-app/tasks/`.
- Use naming pattern: `TXXX-<short-title>.task.spec.md`.
- Use `docs/specs/templates/task.spec.md` for every task file.
- Each task must reference the same feature spec and this feature plan.
- Start each task with status `Draft`; after approval, use `Ready` only when all dependencies are `Done`.
- Keep T002 and T003 independently implementable after T001 so they can run in parallel.
- For the backend and database task, specify the Java package namespace `com.mtgtracking`, Groovy Gradle DSL paths, shared base-entity field mappings, and the absence of domain SQL migrations.
- For the frontend and UI task, specify the root route contract, Tailwind CSS v4 wiring via `@import "tailwindcss";`, the explicit absence of `.postcssrc.*` or `postcss.config.*`, shared token file paths, and the explicit absence of a Pencil requirement.

## 8. Repository Impact

List concrete paths expected to change.

```text
package.json
pnpm-workspace.yaml
biome.json
tsconfig.base.json
build.gradle
settings.gradle
gradle.properties
design/
apps/
  mtgtracking/
    backend/
    frontend/
packages/
  database/
  ui/
docs/
  specs/apps/mtgtracking/architecture.md
README.md
```

### Planned Changes by Area

- **Backend**: Spring Boot application class, backend Gradle subproject, actuator and persistence configuration, Flyway folder, Spring context smoke test
- **Frontend**: Angular app shell, root route, Tailwind CSS v4-enabled global styles via `@import "tailwindcss";`, shell render test, Playwright smoke scaffold if generated by Nx
- **Shared packages/modules**: `packages/database` mapped superclass contract, `packages/ui` shared theme/token files and Angular-compatible exports
- **Data layer**: No concrete domain migrations; only Flyway path and persistence contract scaffolding
- **QA**: Nx targets for build/lint/test/e2e; Gradle-backed backend validation; Biome-backed frontend/workspace linting

### Documentation Impact Mapping

- **New or updated ADRs (`docs/decisions/`)**: None planned. The chosen approach stays within the current ADR baseline.
- **Domain specs (`docs/specs/domains/`)**: None planned. No new domain boundary is introduced by workspace initialization.
- **Surface architecture (`docs/specs/apps/mtgtracking/architecture.md`)**: Update after implementation to record the concrete project names, validation entry points, and shared package responsibilities once the workspace is materialized.
- **Other docs**: Update `README.md` with installation, run, and validation commands; update repo-level docs only if the generated structure deviates from the current planned layout.

## 9. Validation Strategy

- **Unit tests**:
  - Backend Spring context smoke test for successful bootstrapping
  - Frontend shell component or route render test using Jest and Testing Library
  - Shared UI smoke test only if generator output creates testable Angular exports in `packages/ui`
- **Integration tests**:
  - Backend MockMvc test or equivalent health-surface verification for `/actuator/health`
  - Nx project registration verification through `pnpm nx show projects`
  - Root dependency validation through successful `pnpm install` and Gradle project discovery
- **E2E tests**:
  - Frontend Playwright smoke test that the `/` route loads the application shell without runtime errors
- **Non-functional checks**:
  - Biome reports zero warnings and zero errors on changed frontend/workspace files
  - Backend Gradle static analysis reports zero warnings from Checkstyle and SpotBugs
  - Nx commands run without prompting for analytics input after workspace normalization

## 10. Rollout and Safety

- **Feature flags**: N/A
- **Backward compatibility**: The change is additive because no application code exists yet; the only compatibility risk is future task alignment with the chosen paths and package names
- **Monitoring/observability**: Expose actuator health for local startup verification only; no extra metrics or alerting are required in this feature
- **Rollback plan**: Remove the generated project roots and root build/package-manager files; no data rollback is required because no domain migrations or persisted entities are introduced

## 11. Step 2 Completion Checklist

- [x] Plan is approved.
- [x] Technical design baseline is complete for all impacted layers.
- [x] Scope-to-execution mapping covers all feature requirements.
- [x] Task generation matrix is defined and consistent with scope.
- [x] Dependencies between planned slices are explicit.
- [x] Feature spec status is updated to `Planned`.
- [x] Plan is ready to hand off to Step 3 (Task Breakdown).

## 12. Post-Implementation Feedback

Complete after feature delivery to sharpen future planning.

### What worked in planning

- TBD

### What caused friction

- TBD

### Planning standard updates

- TBD