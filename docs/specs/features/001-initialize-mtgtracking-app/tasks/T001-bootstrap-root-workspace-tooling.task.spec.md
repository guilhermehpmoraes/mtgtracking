# Task Spec: Bootstrap Root Workspace Tooling

- **Feature ID**: 001-initialize-mtgtracking-app
- **Task ID**: T001
- **Status**: Ready
- **Type**: Task
- **Parallelizable**: No
- **Parallelization Notes**: This task establishes the root pnpm, Nx, Biome, and TypeScript baseline required before backend and frontend project scaffolding can run deterministically.
- **Date**: 2026-04-24
- **Owner**: TBD
- **Feature Folder**: docs/specs/features/001-initialize-mtgtracking-app/
- **Feature Spec**: docs/specs/features/001-initialize-mtgtracking-app/feature.spec.md
- **Feature Plan**: docs/specs/features/001-initialize-mtgtracking-app/plan.spec.md
- **Task File**: docs/specs/features/001-initialize-mtgtracking-app/tasks/T001-bootstrap-root-workspace-tooling.task.spec.md
- **Related ADRs**: 003-quality-gates-and-tooling-baseline, 005-naming-and-language-conventions, 009-sdd-branching-strategy, 011-frontend-design-system-and-pencil-workflow, 012-nx-app-and-test-layout-baseline
- **Dependencies**: N/A
- **Design References**: N/A

## 1. Purpose

Create the root workspace files that turn the current documentation-only repository into an installable Nx monorepo baseline. This task must materialize pnpm workspace metadata, Nx plugin/dev dependency installation points, Biome configuration, the shared TypeScript base config used by the frontend and shared UI surface, and the reserved `design/` directory.

Rules for this team:

- Use only issue types: **Task** and **Bug**.
- Do not use **Story**.
- Keep this file complete enough that another developer can implement it without hidden context.

## 2. Scope

### In Scope

- Create root workspace metadata files: `package.json`, `pnpm-workspace.yaml`, and `tsconfig.base.json`.
- Add root formatting/lint configuration in `biome.json` aligned with the repository Biome baseline.
- Update `nx.json` only as needed to keep Nx non-interactive and ready for generated projects.
- Create `design/.gitkeep` so the frontend design workflow baseline exists in the repository.
- Install and record the approved workspace dev dependencies needed for later backend and frontend scaffolding.

### Out of Scope

- Creating any backend, frontend, or shared package project roots.
- Writing Gradle build files or Spring Boot source code.
- Writing Angular application code, shared UI code, or Tailwind CSS files.
- Updating feature or plan status metadata outside the documentation work performed in Step 3.

## 3. Context from Feature Plan

- **Plan slice**: Slice 1 - Bootstrap Workspace Tooling
- **Requirement refs**: FR-004, FR-005, AC-001, AC-002
- **Affected Paths**: `package.json`, `pnpm-workspace.yaml`, `biome.json`, `tsconfig.base.json`, `nx.json`, `design/.gitkeep`
- **Why this task exists**: The repository currently has `nx.json` and launcher files but no package manager metadata, no installed Nx plugins, no formatting baseline, and no reserved `design/` directory. Backend and frontend scaffolding depend on these root artifacts existing first.

## 4. Technical Specification (Required)

This section must be detailed enough for another developer to implement without additional discovery.

If a subsection does not apply, explicitly write `N/A` and explain why.

### 4.1 Backend and API Contracts (when applicable)

- **Use case flow**: N/A. This task does not expose or change any backend runtime behavior.
- **Endpoint/Event**: N/A
- **Request contract**:

| Field | Type | Required | Validation | Notes |
| ----- | ---- | -------- | ---------- | ----- |
| N/A | N/A | N/A | N/A | No API contract is introduced in this task. |

- **Response contract**:

| Field | Type | Nullable | Source | Notes |
| ----- | ---- | -------- | ------ | ----- |
| N/A | N/A | N/A | N/A | No API response is introduced in this task. |

- **Error contract**: N/A. Any failure is limited to local tooling setup such as dependency installation or configuration parsing.

### 4.2 Database Specification (mandatory when data impact exists)

N/A. This task does not create data objects, tables, migrations, or persistence mappings. It only prepares root workspace/tooling files that later tasks depend on.

### 4.3 Frontend and UX Contracts (when applicable)

- **Approved Pencil reference**: N/A. This task only creates the reserved `design/` directory baseline and has no browser-visible behavior.
- **Screens/routes affected**: N/A
- **UI states**: N/A
- **Field validations and messages**: N/A
- **Interaction and edge behavior**: N/A
- **Theme/token usage**: N/A. Theme and token work starts in `T003` under `packages/ui`.
- **Responsive behavior**: N/A

### 4.4 Cross-Cutting Constraints

- **Security/authorization**: No secrets may be committed. Root config files must not hardcode registry credentials, tokens, or environment-specific machine paths.
- **Performance expectations**: Dependency installation and Nx config must support later `pnpm nx` invocations without analytics prompts or manual normalization steps.
- **Observability**: N/A for runtime observability. The only required evidence is clean command output from workspace setup and validation commands.
- **Compatibility constraints**:
  - Root workspace dependencies must align with the approved plan baseline: `nx@22.6.5`, `@nx/angular@22.6.5`, `@nx/js@22.6.5`, `@biomejs/biome@latest`, `tailwindcss@^4`.
  - `pnpm-workspace.yaml` must include `apps/*`, `apps/**`, `packages/*`, and `packages/**` coverage appropriate for the app-oriented layout.
  - `tsconfig.base.json` must be valid for future Angular and shared UI TypeScript compilation and must not add speculative path aliases for packages that do not exist yet.
  - `nx.json` must preserve `neverConnectToCloud: true` and `analytics: false` so Nx commands remain non-interactive.

## 5. Implementation Steps

1. Create `package.json` at the repository root with the workspace name, `private: true`, a `packageManager` field for pnpm, and root scripts that delegate to `pnpm nx` for common workflows such as `nx`, `format`, `lint`, and `test` where appropriate.
2. Add the root dev dependencies defined by the approved plan: `nx@22.6.5`, `@nx/angular@22.6.5`, `@nx/js@22.6.5`, `@biomejs/biome@latest`, and `tailwindcss@^4`. Use Context7-verified Nx guidance for generator ownership and avoid undocumented plugin guesses.
3. Create `pnpm-workspace.yaml` so pnpm recognizes the app-oriented layout under `apps/` and `packages/`.
4. Create `biome.json` with the repository formatting/lint baseline for workspace and frontend files, keeping the configuration minimal and warning-free.
5. Create `tsconfig.base.json` with a conservative base compiler configuration that the future Angular app and shared UI package can extend. Do not add speculative aliases for backend Java paths or unpublished packages.
6. Review `nx.json` and keep only the minimal root normalization required by the plan. Preserve the existing non-interactive settings and add no speculative target defaults unless later tasks need them.
7. Create `design/.gitkeep` so the required design artifact location exists before any visually relevant frontend work.
8. Run `pnpm install` to materialize the lockfile and confirm the root dependency graph is installable.
9. Validate the root setup with `pnpm nx show projects` and a Biome check against the changed workspace files so later project registration tasks start from a clean baseline.

## 6. Acceptance Criteria

- The repository contains installable root workspace files for pnpm, Nx, Biome, and shared TypeScript configuration.
- `pnpm install` succeeds without requiring manual Nx analytics input or temporary workarounds.
- `pnpm nx show projects` runs successfully from the normalized root workspace, even if no projects are registered yet.
- The reserved `design/` directory exists so the documented frontend design workflow has a concrete home.

## 7. Test Scenarios

- Happy path: `pnpm install` completes successfully and produces a consistent lockfile with the approved root dev dependencies.
- Validation path: `pnpm nx show projects` runs without analytics prompts or configuration errors.
- Edge case: Biome configuration parses correctly and does not report warnings on the root workspace files introduced by this task.

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
- **Summary**: Bootstrap root workspace tooling for MTG Tracking
- **Description**: Create the root pnpm, Nx, Biome, TypeScript, and design-directory baseline required before backend and frontend project scaffolding can begin.
- **Priority**: Highest
- **Labels**: Platform, Workspace, Tooling
- **Custom field (Tipo)**: Technical Debt
- **Custom field (Tamanho)**: 1 Dia

## 12. Status Log

Record status transitions to keep execution history visible.

| Date       | Status | Notes |
| ---------- | ------ | ----- |
| 2026-04-24 | Draft  | Task created from approved feature plan |
| 2026-04-24 | Ready  | Reviewed and approved for implementation; no dependencies block execution |

## 13. Observations

Capture runtime observations during implementation — environment issues, library surprises, deviations from plan, workarounds applied, or any other notes that don't fit in other sections. This section feeds into the feature retrospective (Step 5).

- Nx is already pinned in `nx.json`; implementation should treat this as an existing baseline rather than reinitializing the workspace.
- This task should stay minimal and should not start project scaffolding that belongs in `T002` or `T003`.