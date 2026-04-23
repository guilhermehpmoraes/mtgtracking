# ADR-013: Database Entity Lifecycle Baseline

## Status

Accepted

## Context

MTG Tracking stores business data in Neon PostgreSQL and uses Flyway migrations with `ddl-auto: validate`. The repository needs one reusable persistence baseline for audit metadata and deletion behavior.

## Decision

The project adopts a shared base entity pattern in `packages/database`.

### Required lifecycle fields

All persistent entities should carry the following audit fields or an equivalent documented representation:

- `created_at`
- `created_by`
- `updated_at`
- `updated_by`
- `deleted_at`
- `deleted_by`

### Persistence rules

- Database naming stays in English snake_case.
- Soft delete is the default deletion strategy.
- Any hard-delete exception must be documented explicitly in the relevant spec, plan, task, or ADR.
- Flyway is the authoritative mechanism for schema evolution.
- Hibernate validation must not replace migrations; `ddl-auto: validate` exists to verify mappings against the migrated schema.

## Consequences

- Audit metadata is standardized before entities are introduced.
- Shared persistence code has a documented home.
- Database work must stay explicit about soft delete behavior and migration safety.