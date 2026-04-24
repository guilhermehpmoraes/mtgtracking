# Task Spec: Wire Validation Targets and Update Docs

- **Feature ID**: 001-initialize-mtgtracking-app
- **Task ID**: T004
- **Status**: Awaiting Dependency
- **Type**: Task
- **Parallelizable**: No
- **Parallelization Notes**: This task depends on both backend and frontend foundations because it consolidates project targets and updates documentation based on the materialized workspace.
- **Date**: 2026-04-24
- **Owner**: TBD
- **Feature Folder**: docs/specs/features/001-initialize-mtgtracking-app/
- **Feature Spec**: docs/specs/features/001-initialize-mtgtracking-app/feature.spec.md
- **Feature Plan**: docs/specs/features/001-initialize-mtgtracking-app/plan.spec.md
- **Task File**: docs/specs/features/001-initialize-mtgtracking-app/tasks/T004-wire-validation-targets-and-update-docs.task.spec.md
- **Related ADRs**: 003-quality-gates-and-tooling-baseline, 009-sdd-branching-strategy, 011-frontend-design-system-and-pencil-workflow, 012-nx-app-and-test-layout-baseline
- **Dependencies**: T002, T003
- **Design References**: N/A

## 1. Purpose

Normalize the workspace so backend, frontend, and shared packages all expose the canonical validation entry points through Nx, then update developer-facing documentation to match the generated repository. This task must close the loop between the materialized code and the approved architecture by aligning `project.json` targets, README commands, and the app-specific architecture document.

Rules for this team:

- Use only issue types: **Task** and **Bug**.
- Do not use **Story**.
- Keep this file complete enough that another developer can implement it without hidden context.

## 2. Scope

### In Scope

- Normalize `project.json` targets for backend, frontend, `database`, and `ui` so the workspace exposes canonical build, lint, test, and e2e flows through Nx where applicable.
- Ensure backend targets delegate to Gradle and frontend/workspace targets align with Biome, Jest, Testing Library, and Playwright.
- Update `README.md` with installation, run, and validation commands for the initialized workspace.
- Update `docs/specs/apps/mtgtracking/architecture.md` with the concrete project names, shared package responsibilities, and validation entry points created by the feature.

### Out of Scope

- Adding new backend or frontend business behavior.
- Introducing new ADRs unless implementation proves a baseline decision is insufficient.
- Refactoring generator output beyond what is necessary to expose canonical Nx validation targets and keep documentation accurate.
- Creating CI pipelines, release automation, or branch-management changes.

## 3. Context from Feature Plan

- **Plan slice**: Slice 4 - Normalize Validation and Documentation Surfaces
- **Requirement refs**: FR-003, FR-004, FR-005, AC-001, AC-002, AC-003
- **Affected Paths**: `apps/mtgtracking/backend/project.json`, `apps/mtgtracking/frontend/project.json`, `packages/database/project.json`, `packages/ui/project.json`, `README.md`, `docs/specs/apps/mtgtracking/architecture.md`
- **Why this task exists**: Even after scaffolding backend and frontend foundations, the feature is incomplete until Nx target entry points and developer documentation reflect the actual workspace. This task turns the generated surfaces into a coherent, documented baseline for future features.

## 4. Technical Specification (Required)

This section must be detailed enough for another developer to implement without additional discovery.

If a subsection does not apply, explicitly write `N/A` and explain why.

### 4.1 Backend and API Contracts (when applicable)

- **Use case flow**: N/A. This task does not introduce or modify backend runtime endpoints; it standardizes validation orchestration and documentation.
- **Endpoint/Event**: N/A
- **Request contract**:

| Field | Type | Required | Validation | Notes |
| ----- | ---- | -------- | ---------- | ----- |
| N/A | N/A | N/A | N/A | No API contract is introduced in this task. |

- **Response contract**:

| Field | Type | Nullable | Source | Notes |
| ----- | ---- | -------- | ------ | ----- |
| N/A | N/A | N/A | N/A | No API contract is introduced in this task. |

- **Error contract**: N/A. Failures are limited to target misconfiguration, documentation drift, or missing validation wiring.

### 4.2 Database Specification (mandatory when data impact exists)

N/A. This task does not change storage objects, fields, migrations, or persistence mappings.

### 4.3 Frontend and UX Contracts (when applicable)

- **Approved Pencil reference**: N/A. Documentation and target wiring only; no meaningful visual or UX change is introduced here.
- **Screens/routes affected**: N/A for implementation surface. The frontend `/` shell is only referenced in validation/documentation.
- **UI states**: N/A
- **Field validations and messages**: N/A
- **Interaction and edge behavior**: N/A
- **Theme/token usage**: N/A
- **Responsive behavior**: N/A

### 4.4 Cross-Cutting Constraints

- **Security/authorization**: Documentation examples must not embed secrets, private registry URLs, or machine-specific paths.
- **Performance expectations**: Validation targets should be narrowly scoped to their projects and avoid redundant work where Nx already orchestrates the task graph.
- **Observability**: The documented validation flows must include Playwright for browser-visible frontend smoke validation and Gradle-backed static analysis for the backend, matching ADR-003.
- **Compatibility constraints**:
  - Keep target names and documentation aligned with the actual generated project names.
  - Prefer `pnpm nx <target> <project>` or equivalent `pnpm nx run <project>:<target>` invocation patterns in README examples.
  - Do not introduce alternative direct-tool commands as the primary workflow when an Nx target exists.

## 5. Implementation Steps

1. Review the generated `project.json` files for `mtgtracking-backend`, `mtgtracking-frontend`, `database`, and `ui`, and normalize target naming so build, lint, test, serve, and e2e entry points are consistent with ADR-003 and the approved plan.
2. Ensure backend targets delegate to Gradle commands for build, test, and static analysis, and ensure frontend targets map cleanly to the generated Angular, Jest, Biome, and Playwright flows.
3. Verify that shared package projects expose the minimal Nx targets they need, avoiding speculative targets that are not yet supported by their implementation.
4. Update `README.md` with the exact workspace setup, project run, and validation commands a developer needs after this feature lands, using Nx-first command examples.
5. Update `docs/specs/apps/mtgtracking/architecture.md` to reflect the now-concrete app layout, project names, target entry points, and the responsibilities of `packages/database` and `packages/ui`.
6. Run the canonical Nx validation surfaces across the affected projects and use the results to confirm that the documentation matches reality before marking the task complete.

## 6. Acceptance Criteria

- Backend, frontend, and shared package projects expose canonical Nx targets that match the approved quality baseline.
- Backend validation delegates to Gradle and frontend validation delegates to the generated Angular/Jest/Playwright/Biome flows.
- `README.md` documents installation, run, and validation commands that work against the materialized workspace.
- `docs/specs/apps/mtgtracking/architecture.md` reflects the concrete initialized project structure and shared package responsibilities.

## 7. Test Scenarios

- Happy path: Nx build/test/lint/e2e targets resolve correctly for all affected projects and documentation examples match the working commands.
- Validation path: backend static analysis and frontend browser-visible smoke validation are reachable through documented Nx commands.
- Edge case: shared package projects expose only the targets they actually support, avoiding dead or misleading workspace commands.

## 8. Definition of Ready (to start Step 4)

A task is ready for implementation only if:

- [ ] Status is `Ready`.
- [x] Scope is explicit and bounded.
- [x] Required contracts are defined (API, DTO, event, UI state, schema).
- [x] Technical specification is detailed enough for independent implementation.
- [x] For data-impact tasks, table/field/type/constraint/index/migration details are fully documented.
- [x] For visually relevant UI tasks, an approved Pencil reference is present.
- [x] Acceptance criteria are testable.
- [x] Open questions are resolved or captured as explicit assumptions.
- [ ] All dependency tasks are `Done` (if any dependencies exist).

## 9. Definition of Done

- [ ] Status moved to `Done`.
- [ ] All related tests (unit and integration) pass — no test failures allowed.
- [ ] **Section 10 (Test Evidence) is filled** with the exact command(s) executed and their output summary proving all tests pass.
- [ ] Biome reports zero warnings and zero errors on all changed files.
- [ ] Acceptance criteria are validated by tests or clear verification evidence.
- [ ] For visually relevant UI changes, the Pencil artifact remains synchronized with the delivered code.

## 10. Test Evidence

This section is **mandatory** before marking the task as `Done`. Paste the exact test command(s) executed and a summary of their output. If tests were not executed, this section must remain empty and the task **cannot** transition to `Done`.

| # | Command | Result | Timestamp |
| - | ------- | ------ | --------- |

**Rules**:
- Every test suite relevant to the task must have a row in this table.
- "Result" must include pass/fail/skip counts copied from actual terminal output.
- If any test fails, the task stays `In Progress` — do not fill this section with failing results and mark Done.
- This section is never pre-filled during Step 3 (Task Breakdown) — it is populated only during Step 4 (Implementation).
- [ ] Edge cases listed in this task are covered.
- [ ] Links to changed files/PR/tests are registered.
- [ ] Feature spec and plan traceability remains intact.

## 11. Jira Mapping (Optional)

- **Issue Type**: Task
- **Summary**: Normalize Nx validation targets and update developer docs
- **Description**: Wire backend, frontend, and shared package validation targets through Nx and update README plus app architecture documentation to match the initialized workspace.
- **Priority**: High
- **Labels**: Documentation, QA, Integration
- **Custom field (Tipo)**: Technical Debt
- **Custom field (Tamanho)**: 1 Dia

## 12. Status Log

Record status transitions to keep execution history visible.

| Date       | Status | Notes |
| ---------- | ------ | ----- |
| 2026-04-24 | Draft  | Task created from approved feature plan |
| 2026-04-24 | Awaiting Dependency | Reviewed and approved, waiting for T002 and T003 to reach Done before implementation can start |

## 13. Observations

Capture runtime observations during implementation — environment issues, library surprises, deviations from plan, workarounds applied, or any other notes that don't fit in other sections. This section feeds into the feature retrospective (Step 5).

- This task should use the already materialized project names and commands rather than redefining architecture from scratch.
- If generator output exposes redundant target names, normalize them here instead of forcing future tasks to remember special cases.