# Task Spec: Scaffold Backend and Database Foundation

- **Feature ID**: 001-initialize-mtgtracking-app
- **Task ID**: T002
- **Status**: Done
- **Type**: Task
- **Parallelizable**: No
- **Parallelization Notes**: This task depends on `T001` for root pnpm/Nx tooling and can then proceed independently of the frontend task, but it should not start before the workspace root is installable.
- **Date**: 2026-04-24
- **Last Updated**: 2026-04-24
- **Owner**: Guilherme Moraes
- **Feature Folder**: docs/specs/features/001-initialize-mtgtracking-app/
- **Feature Spec**: docs/specs/features/001-initialize-mtgtracking-app/feature.spec.md
- **Feature Plan**: docs/specs/features/001-initialize-mtgtracking-app/plan.spec.md
- **Task File**: docs/specs/features/001-initialize-mtgtracking-app/tasks/T002-scaffold-backend-and-database-foundation.task.spec.md
- **Related ADRs**: 003-quality-gates-and-tooling-baseline, 005-naming-and-language-conventions, 012-nx-app-and-test-layout-baseline, 013-database-entity-lifecycle-baseline
- **Dependencies**: T001
- **Design References**: N/A

## 1. Purpose

Create the first runnable backend surface and the shared persistence foundation used by future MTG Tracking entities. This task must establish the root Gradle multi-project build, register the backend and database projects with Nx, provide a Spring Boot shell under `apps/mtgtracking/backend`, expose actuator health, wire Flyway and JPA for future schema work, and implement the reusable base entity contract in `packages/database` with the six lifecycle fields and soft-delete baseline.

Rules for this team:

- Use only issue types: **Task** and **Bug**.
- Do not use **Story**.
- Keep this file complete enough that another developer can implement it without hidden context.

## 2. Scope

### In Scope

- Create the root Gradle files: `settings.gradle`, `build.gradle`, and `gradle.properties` using the Groovy DSL.
- Create `apps/mtgtracking/backend` as a Spring Boot application shell with `com.mtgtracking.backend` package naming under the top-level namespace `com.mtgtracking`.
- Register `mtgtracking-backend` as an Nx application project with build, test, lint, and serve-like commands delegated through Gradle.
- Create `packages/database` as a Gradle subproject and Nx library project.
- Implement `packages/database/src/main/java/com/mtgtracking/database/persistence/BaseEntity.java` as the shared mapped superclass carrying the lifecycle metadata baseline.
- Add the backend configuration, Flyway directory layout, and smoke tests needed to validate backend startup and `/actuator/health`.

### Out of Scope

- Creating any product-facing API endpoints, DTOs, or controllers beyond the Spring Boot shell and actuator health surface.
- Creating domain tables, domain Flyway migrations, repository interfaces, or business entities.
- Wiring backend-to-frontend integration, authentication, or Neon deployment automation.
- Updating frontend Angular code or the shared `packages/ui` surface.

## 3. Context from Feature Plan

- **Plan slice**: Slice 2 - Scaffold Backend and Shared Persistence Foundation
- **Requirement refs**: FR-001, FR-003, FR-004, FR-005, AC-001, AC-002, AC-003
- **Affected Paths**: `settings.gradle`, `build.gradle`, `gradle.properties`, `apps/mtgtracking/backend/build.gradle`, `apps/mtgtracking/backend/project.json`, `apps/mtgtracking/backend/src/main/java/com/mtgtracking/backend/MtgTrackingBackendApplication.java`, `apps/mtgtracking/backend/src/main/resources/application.yml`, `apps/mtgtracking/backend/src/main/resources/db/migration/.gitkeep`, `apps/mtgtracking/backend/src/test/java/com/mtgtracking/backend/MtgTrackingBackendApplicationTests.java`, `packages/database/build.gradle`, `packages/database/project.json`, `packages/database/src/main/java/com/mtgtracking/database/persistence/BaseEntity.java`
- **Why this task exists**: The feature requires a stable Spring backend and shared persistence package before business features can introduce entities, migrations, or APIs. This task also establishes the canonical Java package namespace and persistence lifecycle baseline documented in ADR-013.

## 4. Technical Specification (Required)

This section must be detailed enough for another developer to implement without additional discovery.

If a subsection does not apply, explicitly write `N/A` and explain why.

### 4.1 Backend and API Contracts (when applicable)

- **Use case flow**: HTTP request -> Spring Boot Actuator endpoint mapping -> health contributor aggregation -> JSON health response
- **Endpoint/Event**: `GET /actuator/health`
- **Request contract**:

| Field | Type | Required | Validation | Notes |
| ----- | ---- | -------- | ---------- | ----- |
| Request body | N/A | No | N/A | The endpoint is a standard Spring Boot Actuator health probe and accepts no request body. |
| Query parameters | N/A | No | N/A | No query contract is required for the initialization feature. |
| Headers | Standard HTTP headers | No | N/A | No custom header contract is introduced in this feature. |

- **Response contract**:

| Field | Type | Nullable | Source | Notes |
| ----- | ---- | -------- | ------ | ----- |
| `status` | `string` | No | Spring Boot Actuator health document | Expected top-level health status such as `UP`. |
| `components` | `object` | Yes | Spring Boot Actuator health document | Optional nested component details when enabled by configuration. |

- **Error contract**: Standard actuator unavailability or server startup failure behavior only. No custom error body, error code mapping, or product-specific API contract is introduced in this task.

### 4.2 Database Specification (mandatory when data impact exists)

#### Storage Objects and Actions

| Store/Schema | Object | Action (Create/Alter/Drop) | Purpose |
| ------------ | ------ | -------------------------- | ------- |
| N/A | N/A | N/A | This task does not create domain tables or application storage objects. |
| `packages/database BaseEntity contract` | `BaseEntity` mapped superclass | Create | Establish the shared persistence abstraction for lifecycle metadata and soft-delete semantics. |

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

- **Constraints**: No database-level constraints are created in this task because no concrete tables are introduced.
- **Indexes**: No database-level indexes are created in this task because no concrete tables are introduced. Future entity tasks must add indexes per entity instead of globally in the initialization feature.

#### Migration and Data Safety

- **Migration files**: Create the Flyway directory structure at `apps/mtgtracking/backend/src/main/resources/db/migration/.gitkeep`. Do not add a versioned SQL migration in this task.
- **Forward migration steps**:
  1. Add Spring Boot Flyway and JPA dependencies to `apps/mtgtracking/backend/build.gradle`.
  2. Configure `application.yml` with `ddl-auto: validate` and the standard Flyway classpath location.
  3. Configure the root or backend Gradle Flyway plugin block to point at `classpath:db/migration` for future migrations.
  4. Commit the empty migration directory placeholder only; do not add a domain SQL file.
- **Rollback steps**:
  1. Remove the Flyway plugin/dependency wiring from Gradle.
  2. Remove the empty migration directory and placeholder file.
  3. Remove the persistence configuration lines from `application.yml`.
- **Backfill strategy**: N/A. No persisted domain data or schema rows are introduced.
- **Validation queries**: N/A. This task validates wiring and startup behavior rather than database contents.

### 4.3 Frontend and UX Contracts (when applicable)

- **Approved Pencil reference**: N/A. This task has no browser-visible frontend changes.
- **Screens/routes affected**: N/A
- **UI states**: N/A
- **Field validations and messages**: N/A
- **Interaction and edge behavior**: N/A
- **Theme/token usage**: N/A
- **Responsive behavior**: N/A

### 4.4 Cross-Cutting Constraints

- **Security/authorization**: Do not expose any product endpoint or management surface beyond the required actuator health baseline. Avoid committing database credentials in `application.yml`; use placeholder environment-backed properties where a connection string is needed later.
- **Performance expectations**: Backend startup must be lightweight enough for a smoke test and health check. No business data loading, caching, or metrics expansion is required.
- **Observability**: Actuator health must be reachable through `GET /actuator/health`. Logs should remain framework-default unless extra logging is required to make tests deterministic.
- **Compatibility constraints**:
  - Use Spring Boot `3.5.x`, dependency management `1.1.x`, Flyway Gradle plugin `12.x`, and Groovy DSL as approved in the plan.
  - Java package namespace must remain under `com.mtgtracking`.
  - Java toolchain target is Java 21 unless local evidence during implementation requires lowering to 17 and the plan is updated accordingly.
  - Persistence baseline must implement soft delete as `deleted_at IS NULL` for active rows and must not document any hard-delete exception.

## 5. Implementation Steps

1. Create the root Gradle multi-project baseline in `settings.gradle`, `build.gradle`, and `gradle.properties`, including project inclusion for `apps/mtgtracking/backend` and `packages/database`, shared repositories, and common Java/test/static-analysis conventions.
2. Create `apps/mtgtracking/backend/build.gradle` with Spring Boot, dependency management, Flyway, JPA, validation, actuator, PostgreSQL runtime, and Spring Boot test dependencies based on the approved versions from the plan. Use Context7-verified Spring Boot and Flyway configuration rather than guessing plugin blocks.
3. Add `apps/mtgtracking/backend/project.json` so Nx exposes canonical backend targets that delegate to Gradle for `build`, `test`, `lint`, and local run/startup validation.
4. Create `apps/mtgtracking/backend/src/main/java/com/mtgtracking/backend/MtgTrackingBackendApplication.java` as the minimal Spring Boot entry point.
5. Create `apps/mtgtracking/backend/src/main/resources/application.yml` with the minimal shell configuration: Spring application name, JPA `ddl-auto: validate`, Actuator health exposure, and Flyway defaults pointing at the standard migration classpath location.
6. Create `apps/mtgtracking/backend/src/main/resources/db/migration/.gitkeep` to reserve the Flyway migration path without introducing a domain schema migration.
7. Create `apps/mtgtracking/backend/src/test/java/com/mtgtracking/backend/MtgTrackingBackendApplicationTests.java` as a Spring context smoke test and add a MockMvc-based verification for `GET /actuator/health` if the chosen backend test structure makes that feasible in the same slice.
8. Create `packages/database/build.gradle` and `packages/database/project.json` so the shared persistence foundation is a first-class Gradle subproject and Nx library.
9. Implement `packages/database/src/main/java/com/mtgtracking/database/persistence/BaseEntity.java` as a mapped superclass carrying `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `deletedAt`, and `deletedBy`, with explicit snake_case column mapping and soft-delete semantics documented in code structure rather than comments.
10. Run Gradle-backed validation through Nx targets and confirm the backend starts and the health route responds as expected without warnings from Checkstyle or SpotBugs.

## 6. Acceptance Criteria

- The repository contains a registered backend application project at `apps/mtgtracking/backend` aligned with the documented Java, Spring, and Gradle baseline.
- The repository contains a registered shared persistence project at `packages/database` aligned with the documented base-entity lifecycle contract.
- The backend starts successfully and exposes `GET /actuator/health` through the Spring Boot shell.
- Flyway wiring and the migration directory structure exist, but no domain SQL migration or business table is introduced.
- Nx exposes backend validation targets that delegate cleanly to Gradle with no accepted warnings.

## 7. Test Scenarios

- Happy path: the backend Spring context boots successfully and returns a healthy response from `GET /actuator/health`.
- Validation path: Nx backend build/test/lint targets delegate to Gradle and complete without missing-project or missing-plugin errors.
- Edge case: the shared `BaseEntity` compiles cleanly with the exact lifecycle field mappings and no concrete table or migration is created prematurely.

## 8. Definition of Ready (to start Step 4)

A task is ready for implementation only if:

- [x] Status is `Ready`.
- [x] Scope is explicit and bounded.
- [x] Required contracts are defined (API, DTO, event, UI state, schema).
- [x] Technical specification is detailed enough for independent implementation.
- [x] For data-impact tasks, table/field/type/constraint/index/migration details are fully documented.
- [x] For visually relevant UI tasks, an approved Pencil reference is present.
- [x] Acceptance criteria are testable.
- [x] Open questions are resolved or captured as explicit assumptions.
- [x] All dependency tasks are `Done` (if any dependencies exist).

## 9. Definition of Done

- [x] Status moved to `Done`.
- [x] All related tests (unit and integration) pass — no test failures allowed.
- [x] **Section 10 (Test Evidence) is filled** with the exact command(s) executed and their output summary proving all tests pass.
- [x] Biome reports zero warnings and zero errors on all changed files.
- [x] Acceptance criteria are validated by tests or clear verification evidence.
- [x] For visually relevant UI changes, the Pencil artifact remains synchronized with the delivered code. N/A for this task.

## 10. Test Evidence

This section is **mandatory** before marking the task as `Done`. Paste the exact test command(s) executed and a summary of their output. If tests were not executed, this section must remain empty and the task **cannot** transition to `Done`.

| # | Command | Result | Timestamp |
| - | ------- | ------ | --------- |
| 1 | `pnpm nx run mtgtracking-backend:lint` | `mtgtracking-backend:lint` succeeded; Gradle wrapper ran 8 actionable tasks, 0 failed, 0 warnings accepted. | 2026-04-24 14:23 -0300 |
| 2 | `CI=true pnpm nx run-many -t build test lint -p mtgtracking-backend database --parallel=1 --outputStyle=static` | 6 of 6 targets succeeded across 2 projects (`database:lint`, `database:build`, `database:test`, `mtgtracking-backend:lint`, `mtgtracking-backend:build`, `mtgtracking-backend:test`); 0 failed. | 2026-04-24 14:23 -0300 |
| 3 | `grep -R '<testsuite ' apps/mtgtracking/backend/build/test-results/test --include='*.xml'` | Backend JUnit report recorded `tests="2"`, `skipped="0"`, `failures="0"`, `errors="0"` for `MtgTrackingBackendApplicationTests`. | 2026-04-24 14:24 -0300 |
| 4 | `./gradlew :packages:database:test --console=plain` | `:packages:database:test NO-SOURCE`; build successful with 0 test classes and 0 failures. | 2026-04-24 14:24 -0300 |
| 5 | `curl -fsS http://localhost:8080/actuator/health` | Live serve validation returned `{"status":"UP"}` from the running backend. | 2026-04-24 14:24 -0300 |
| 6 | `pnpm exec biome check apps/mtgtracking/backend/project.json packages/database/project.json` | Checked 2 files after formatting; 0 fixes applied, 0 errors, 0 warnings. | 2026-04-24 14:25 -0300 |

**Rules**:
- Every test suite relevant to the task must have a row in this table.
- "Result" must include pass/fail/skip counts copied from actual terminal output.
- If any test fails, the task stays `In Progress` — do not fill this section with failing results and mark Done.
- This section is never pre-filled during Step 3 (Task Breakdown) — it is populated only during Step 4 (Implementation).
- [x] Edge cases listed in this task are covered.
- [x] Links to changed files/PR/tests are registered.
- [x] Feature spec and plan traceability remains intact.

## 11. Jira Mapping (Optional)

- **Issue Type**: Task
- **Summary**: Scaffold the backend shell and shared database foundation
- **Description**: Materialize the Spring Boot backend, Gradle multi-project baseline, Flyway/JPA wiring, and the reusable base entity contract under `packages/database`.
- **Priority**: Highest
- **Labels**: Backend, Database, Platform
- **Custom field (Tipo)**: Technical Debt
- **Custom field (Tamanho)**: 2 Dias

## 12. Status Log

Record status transitions to keep execution history visible.

| Date       | Status | Notes |
| ---------- | ------ | ----- |
| 2026-04-24 | Draft  | Task created from approved feature plan |
| 2026-04-24 | Awaiting Dependency | Reviewed and approved, waiting for T001 to reach Done before implementation can start |
| 2026-04-24 | Ready | Dependency `T001` is done; backend and database foundation can start. |
| 2026-04-24 | In Progress | Implementation started on task branch `task/T002`. |
| 2026-04-24 | Done | Gradle multi-project build, backend shell, database base entity, Nx targets, and live actuator health validation completed successfully. |

## 13. Observations

Capture runtime observations during implementation — environment issues, library surprises, deviations from plan, workarounds applied, or any other notes that don't fit in other sections. This section feeds into the feature retrospective (Step 5).

- This task must remain strictly foundation-only: no product API routes, no business entities, and no domain migration file belong here.
- If local Java compatibility forces a move from Java 21 to Java 17, update the plan and task evidence explicitly before marking the task done.
- A Gradle wrapper was added so Nx backend targets do not depend on a machine-level Gradle installation.
- The backend defaults to an in-memory H2 datasource for local startup and test execution while keeping PostgreSQL on the runtime classpath for future environment-backed deployment wiring.