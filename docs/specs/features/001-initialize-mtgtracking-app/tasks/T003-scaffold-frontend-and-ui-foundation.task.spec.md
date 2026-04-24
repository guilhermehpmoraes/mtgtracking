# Task Spec: Scaffold Frontend and UI Foundation

- **Feature ID**: 001-initialize-mtgtracking-app
- **Task ID**: T003
- **Status**: Ready
- **Type**: Task
- **Parallelizable**: Yes
- **Parallelization Notes**: After `T001` completes, this task can run independently of `T002` because it touches the Angular frontend and shared UI surface only.
- **Date**: 2026-04-24
- **Owner**: TBD
- **Feature Folder**: docs/specs/features/001-initialize-mtgtracking-app/
- **Feature Spec**: docs/specs/features/001-initialize-mtgtracking-app/feature.spec.md
- **Feature Plan**: docs/specs/features/001-initialize-mtgtracking-app/plan.spec.md
- **Task File**: docs/specs/features/001-initialize-mtgtracking-app/tasks/T003-scaffold-frontend-and-ui-foundation.task.spec.md
- **Related ADRs**: 003-quality-gates-and-tooling-baseline, 005-naming-and-language-conventions, 011-frontend-design-system-and-pencil-workflow, 012-nx-app-and-test-layout-baseline
- **Dependencies**: T001
- **Design References**: N/A - initialization shell only, no meaningful visual or UX change

## 1. Purpose

Create the first runnable Angular frontend surface and the shared UI foundation used by future MTG Tracking features. This task must generate the frontend app under `apps/mtgtracking/frontend`, keep the root route limited to a static shell, wire Tailwind CSS v4 using `@import "tailwindcss";` with no dedicated PostCSS configuration, and create `packages/ui` as the shared location for theme tokens and future Angular-friendly UI exports.

Rules for this team:

- Use only issue types: **Task** and **Bug**.
- Do not use **Story**.
- Keep this file complete enough that another developer can implement it without hidden context.

## 2. Scope

### In Scope

- Generate and normalize the Angular frontend project under `apps/mtgtracking/frontend`.
- Register `mtgtracking-frontend` as an Nx application with canonical build, test, lint, serve, and e2e targets as supported by the generated project.
- Implement a static application shell at route `/` with project title, placeholder copy, and a reserved area for future navigation or metrics cards.
- Configure Tailwind CSS v4 through the frontend global stylesheet using `@import "tailwindcss";`.
- Create `packages/ui` with an Nx project registration, a shared `src/index.ts`, and `src/lib/theme.css` as the token/theme source imported into the frontend global stylesheet.

### Out of Scope

- Building any product workflow, data entry form, analytics screen, or backend integration.
- Introducing a Pencil artifact or visually rich prototype for this initialization shell.
- Adding a Tailwind v3-style baseline such as `@tailwind base`, `@tailwind components`, `@tailwind utilities`, `.postcssrc.*`, or `postcss.config.*`.
- Creating Angular Material adoption, authentication, or API data services.

## 3. Context from Feature Plan

- **Plan slice**: Slice 3 - Scaffold Frontend and Shared UI Foundation
- **Requirement refs**: FR-002, FR-003, FR-004, FR-005, AC-001, AC-002, AC-003
- **Affected Paths**: `apps/mtgtracking/frontend/project.json`, `apps/mtgtracking/frontend/src/main.ts`, `apps/mtgtracking/frontend/src/app/app.ts`, `apps/mtgtracking/frontend/src/app/app.routes.ts`, `apps/mtgtracking/frontend/src/app/app.html`, `apps/mtgtracking/frontend/src/app/app.css`, `apps/mtgtracking/frontend/src/styles.css`, `packages/ui/project.json`, `packages/ui/src/index.ts`, `packages/ui/src/lib/theme.css`
- **Why this task exists**: The feature requires a concrete Angular app surface and a reusable UI/theme surface before future frontend features can land in a stable place. This task also locks in the Tailwind CSS v4 baseline and documents that no Pencil artifact is required because the shell is foundational rather than a meaningful UX change.

## 4. Technical Specification (Required)

This section must be detailed enough for another developer to implement without additional discovery.

If a subsection does not apply, explicitly write `N/A` and explain why.

### 4.1 Backend and API Contracts (when applicable)

- **Use case flow**: N/A. This task does not call or define a backend API.
- **Endpoint/Event**: N/A
- **Request contract**:

| Field | Type | Required | Validation | Notes |
| ----- | ---- | -------- | ---------- | ----- |
| N/A | N/A | N/A | N/A | No API request contract is introduced in this task. |

- **Response contract**:

| Field | Type | Nullable | Source | Notes |
| ----- | ---- | -------- | ------ | ----- |
| N/A | N/A | N/A | N/A | No API response contract is introduced in this task. |

- **Error contract**: N/A. Runtime failures in this task are limited to frontend build/test setup or route rendering issues.

### 4.2 Database Specification (mandatory when data impact exists)

N/A. This task does not create or alter tables, migrations, entities, or database contracts.

### 4.3 Frontend and UX Contracts (when applicable)

- **Approved Pencil reference**: N/A - initialization shell only, no meaningful visual or UX change
- **Screens/routes affected**: `/` rendered by the root Angular app shell defined through `apps/mtgtracking/frontend/src/app/app.routes.ts` and the root standalone component
- **UI states**: Static ready state only; loading, empty, and error states are out of scope because the shell does not fetch backend data in this feature
- **Field validations and messages**: N/A. No forms or user-entered fields are introduced.
- **Interaction and edge behavior**:
  - Render a minimal application shell with the MTG Tracking title, a short placeholder description, and a reserved container for future navigation or metric cards.
  - Do not add data fetching, forms, or interactive workflows.
  - Keep the shell resilient at small widths with no horizontal overflow at 360px.
- **Theme/token usage**:
  - `packages/ui/src/lib/theme.css` is the shared token/theme source.
  - `packages/ui/src/index.ts` is the public export surface for future Angular-friendly UI primitives.
  - `apps/mtgtracking/frontend/src/styles.css` must import the shared theme file and `@import "tailwindcss";`.
- **Responsive behavior**:
  - Mobile-first layout.
  - One-column shell at small widths.
  - Centered bounded content width on larger screens.
  - No horizontal overflow at 360px viewport width.

### 4.4 Cross-Cutting Constraints

- **Security/authorization**: No authentication, token storage, or API credential handling is allowed in this task.
- **Performance expectations**: The shell must be static and lightweight, with no data fetching or unnecessary runtime dependencies.
- **Observability**: Browser-visible validation is required through Playwright smoke coverage for the `/` route and route load without runtime errors.
- **Compatibility constraints**:
  - Use Nx Angular generation aligned with `@nx/angular@22.6.5`.
  - Use Tailwind CSS v4 with `@import "tailwindcss";` and no dedicated PostCSS config file.
  - Preserve the standalone Angular bootstrap shape using `bootstrapApplication(...)` and `provideRouter(...)` as generated or normalized for the root shell.
  - Do not add `.postcssrc.*`, `postcss.config.*`, or a Tailwind v3 directive set.

## 5. Implementation Steps

1. Generate the Angular application using the Nx Angular application generator under `apps/mtgtracking/frontend`. Use Context7-verified Nx guidance for generator usage and do not rely on guessed flags.
2. Normalize the generated project so the final project name is `mtgtracking-frontend` and the root remains `apps/mtgtracking/frontend` with the expected Nx `project.json` targets.
3. Keep or normalize the standalone Angular bootstrap flow in `apps/mtgtracking/frontend/src/main.ts` so the root app boots via `bootstrapApplication(...)` and routes are provided through `provideRouter(...)`.
4. Implement `apps/mtgtracking/frontend/src/app/app.routes.ts` with a root route for `/` and keep routing intentionally minimal.
5. Implement the static shell content in `apps/mtgtracking/frontend/src/app/app.html` and supporting styles in `apps/mtgtracking/frontend/src/app/app.css`, ensuring the title, placeholder description, and reserved content area render cleanly on mobile-first breakpoints.
6. Create `packages/ui/project.json`, `packages/ui/src/index.ts`, and `packages/ui/src/lib/theme.css` so shared token/theme responsibilities have a concrete home from the start.
7. Update `apps/mtgtracking/frontend/src/styles.css` to import the shared `packages/ui` theme surface and `@import "tailwindcss";`. Do not create `.postcssrc.*`, `postcss.config.*`, or legacy Tailwind v3 directives.
8. Normalize generated tests so the frontend has a passing shell-render validation through Jest and Testing Library. If Nx generates Playwright e2e support, keep it under `apps/mtgtracking/frontend/e2e` per ADR-012.
9. Run frontend build, lint, unit test, and Playwright smoke validation through Nx targets and verify the `/` route loads without browser runtime errors.

## 6. Acceptance Criteria

- The repository contains a registered frontend application project at `apps/mtgtracking/frontend` aligned with the documented Angular and Tailwind baseline.
- The repository contains a registered shared UI surface at `packages/ui` aligned with the documented theme/token ownership baseline.
- The root route `/` renders a static MTG Tracking shell with no backend dependency.
- Tailwind CSS v4 is wired through `@import "tailwindcss";` in the global stylesheet, with no dedicated PostCSS configuration or legacy Tailwind v3 directives.
- Frontend validation targets run through Nx and the browser-visible shell loads successfully in Playwright smoke validation.

## 7. Test Scenarios

- Happy path: the Angular app builds and the `/` route renders the static shell with the expected title and placeholder text.
- Validation path: Nx frontend lint and unit test targets pass with no warnings and no missing project configuration.
- Edge case: the global styling setup works with Tailwind CSS v4 import syntax and does not rely on `.postcssrc.*`, `postcss.config.*`, or legacy Tailwind directives.

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
- **Summary**: Scaffold the frontend shell and shared UI foundation
- **Description**: Materialize the Angular frontend, static root route, Tailwind CSS v4 baseline, and shared `packages/ui` theme/token surface.
- **Priority**: Highest
- **Labels**: Frontend, UI, Platform
- **Custom field (Tipo)**: Technical Debt
- **Custom field (Tamanho)**: 2 Dias

## 12. Status Log

Record status transitions to keep execution history visible.

| Date       | Status | Notes |
| ---------- | ------ | ----- |
| 2026-04-24 | Draft  | Task created from approved feature plan |
| 2026-04-24 | Awaiting Dependency | Reviewed and approved, waiting for T001 to reach Done before implementation can start |
| 2026-04-24 | Ready | Dependency `T001` is done; frontend and UI foundation can start. |

## 13. Observations

Capture runtime observations during implementation — environment issues, library surprises, deviations from plan, workarounds applied, or any other notes that don't fit in other sections. This section feeds into the feature retrospective (Step 5).

- This task explicitly does not require Pencil because the initialization shell has no meaningful visual or UX impact beyond foundational layout.
- If Nx generator defaults try to introduce legacy Tailwind or PostCSS wiring, normalize the output back to the approved Tailwind CSS v4 baseline before considering the task complete.