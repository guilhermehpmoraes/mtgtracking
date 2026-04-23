# ADR-004: Solution Boundary Documentation Baseline

## Status

Accepted

## Context

MTG Tracking is a single-product repository, but it still needs explicit boundaries so analytics, match tracking, and future shared concerns do not collapse into one undifferentiated codebase.

## Decision

The project uses a **capability-oriented boundary model**.

### Baseline rules

- Repo-wide structure and cross-cutting concerns live in `docs/architecture.md`.
- The internal architecture of the application lives in `docs/specs/apps/mtgtracking/architecture.md`.
- `docs/specs/domains/` remains available for stable capability docs when a boundary needs dedicated ownership.
- Feature specs should reference a `Domain/Area` when the capability boundary matters for scope or sequencing.

### Initial capability candidates

- tournament tracking
- match results
- deck context
- analytics and reporting

These are starting points, not hard module commitments. Domain docs should be added only when a capability needs sustained ownership or separate architectural rules.

## Consequences

- The repository gets explicit architectural boundaries without forcing formal DDD everywhere.
- Per-app architecture is documented from the start.
- Future features have a clear path to introduce domain documentation when the product shape stabilizes further.