# MTG Tracking

MTG Tracking is a personal full-stack application for registering and analyzing performance in Magic: The Gathering tournaments. The product focus is tournament data tracking and analytics: results, win rate, trends, and longitudinal player evolution.

This repository is already bootstrapped for Spec Driven Development and now serves as the project baseline for the product itself, not as a generic kit.

## Product Scope

- Register tournament participation and match outcomes.
- Track historical performance by event, deck, and time period.
- Produce analytics that help explain win rate and progression over time.
- Keep product, architecture, and implementation decisions explicit through SDD artifacts.

## Stack Baseline

| Surface | Baseline |
|---------|----------|
| Monorepo | Nx |
| Workspace package manager | pnpm |
| Backend | Java, Spring, Hibernate, Gradle |
| Frontend | Angular, Tailwind CSS |
| Database | Neon PostgreSQL |
| Database migrations | Flyway with `ddl-auto: validate` |
| Frontend formatting/lint | Biome |
| Backend static analysis | Gradle-driven Checkstyle and SpotBugs |
| Backend tests | JUnit 5, Mockito, MockMvc |
| Frontend tests | Jest, Testing Library, Playwright |

## Planned Repository Layout

```text
apps/
  mtgtracking/
    backend/
    frontend/
packages/
  database/
  ui/
design/
docs/
```

- `apps/mtgtracking/backend` hosts the Spring API and persistence logic.
- `apps/mtgtracking/frontend` hosts the Angular application.
- `packages/database` is the planned home for shared persistence abstractions, including the reusable base entity.
- `packages/ui` is the planned home for reusable UI primitives and shared theme implementation.
- `design/` is the source of truth for design artifacts and Pencil references.

## Workflow Baseline

The repository follows the SDD five-step flow:

1. `/feature`
2. `/plan <feature-id>`
3. `/tasks <feature-id>`
4. `/implement <feature-id> <task-id>`
5. `/finish <feature-id>`

Branching follows the SDD hierarchy with `develop` as the integration branch and `main` as the release branch.

## Quality Baseline

- Use Nx targets as the canonical task surface whenever a project exposes them.
- Keep frontend and workspace formatting/lint clean with Biome.
- Keep backend code warning-free by treating style and static-analysis findings as issues to resolve, not to ignore.
- Record real test execution evidence in task specs before any task is marked `Done`.

## Documentation Map

- Project baseline: `docs/project.spec.md`
- Repository architecture: `docs/architecture.md`
- App architecture: `docs/specs/apps/mtgtracking/architecture.md`
- Decisions: `docs/decisions/`
- Feature work packages: `docs/specs/features/`

## Current State

The repository currently contains the documented project baseline and SDD scaffolding. Application code and Nx projects will be materialized in subsequent feature work.