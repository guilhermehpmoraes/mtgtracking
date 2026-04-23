# Project Spec

## Overview

MTG Tracking is a personal application for recording and analyzing Magic: The Gathering tournament performance. The repository uses Nx as a full-stack monorepo and Spec Driven Development as the default delivery model.

The project baseline establishes one product with two primary deployable surfaces:

- a Spring-based backend API
- an Angular frontend for data entry, navigation, and analytics visualization

Shared cross-cutting code is expected to live in dedicated packages rather than being duplicated across app surfaces.

## Problem

Tournament and match data are often spread across notes, messaging threads, spreadsheets, or memory. That makes it hard to answer basic questions reliably:

- how performance changes over time
- which events, decks, or matchups are driving results
- whether recent outcomes reflect improvement or short-term variance

Without a dedicated system, the data is incomplete, hard to query, and difficult to trust for longitudinal analysis.

## Goals

- Provide a single source of truth for tournament participation and match history.
- Make analytical views such as win rate, trends, and evolution over time easy to derive.
- Keep the backend, frontend, and shared packages aligned inside one Nx monorepo.
- Use SDD artifacts to keep requirements, plans, tasks, and implementation traceable.
- Standardize quality, naming, persistence, and branching rules before feature implementation begins.

## Non-Goals

- Supporting multiple unrelated products in this repository.
- Treating the repository as a generic reusable kit after bootstrap.
- Allowing undocumented database or interface conventions to emerge ad hoc.
- Using hard delete as the default persistence strategy.

## High-Level Architecture

The repository baseline is an app-oriented Nx monorepo:

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
	project.spec.md
	architecture.md
	decisions/
	specs/
```

- `apps/mtgtracking/backend` will contain the Spring application, Hibernate mappings, Flyway migrations, and Neon integration.
- `apps/mtgtracking/frontend` will contain the Angular application and Tailwind-based UI.
- `packages/database` will host shared persistence abstractions, including the reusable base entity with audit metadata.
- `packages/ui` will host reusable UI building blocks and global theme implementation shared by frontend features.
- `design/` will store design artifacts and Pencil references for visually relevant work.

## Operating Model

The project follows the five-step SDD lifecycle:

1. Draft the feature spec.
2. Produce the feature plan.
3. Break the plan into task specs.
4. Implement approved tasks.
5. Finish the feature with a retrospective.

Branching is aligned with that lifecycle:

- `develop` is the integration branch.
- `main` is the release branch.
- `feature/<feature-id>` branches are created from `develop`.
- `task/<task-id>` branches are created from the parent feature branch and are published to the remote while active.

## Project Context Baseline

- Repository topology: Nx monorepo.
- Product scope: one full-stack application named `mtgtracking`.
- Workspace package manager: pnpm.
- Backend build tool: Gradle.
- Persistence: Neon PostgreSQL, Flyway migrations, `ddl-auto: validate`.
- Naming language: English across code, documentation, schema, and automation.
- Frontend design baseline: `design/` for artifacts, `packages/ui` for reusable UI, mobile-first posture, Pencil required for meaningful visual changes.

## Boundary Model

The repository uses a capability-oriented boundary model.

- Repo-wide boundaries are documented in `docs/architecture.md`.
- App-specific details live in `docs/specs/apps/mtgtracking/architecture.md`.
- Domain specs under `docs/specs/domains/` remain optional and should be added when capability boundaries such as tournaments, matches, decks, or analytics need stable ownership documentation.

## Engineering Principles

The generic engineering principles from the kit still apply, with project-specific emphasis on:

- clear persistence and analytics rules over convenience shortcuts
- explicit migrations instead of implicit schema mutation
- reusable shared packages for database and UI concerns
- warning-free code and documented validation evidence

Baseline decisions are captured in `docs/decisions/`.

## Delivery Model

This repository is now the product baseline itself. Future delivery work should extend the documentation and code incrementally rather than re-bootstrap the kit.

## References

- Agent instructions: `/.github/copilot-instructions.md`
- Repository architecture: `docs/architecture.md`
- App architecture: `docs/specs/apps/mtgtracking/architecture.md`
- ADRs: `docs/decisions/`
- Templates: `docs/specs/templates/`
- Feature work packages: `docs/specs/features/`
- Optional domain specs: `docs/specs/domains/`