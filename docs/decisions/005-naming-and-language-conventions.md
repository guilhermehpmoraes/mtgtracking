# ADR-005: Naming and Language Conventions Baseline

## Status

Accepted

## Context

MTG Tracking combines documentation, Java backend code, Angular frontend code, database objects, and automation identifiers. Without one explicit language and naming baseline, repository artifacts would drift quickly.

## Decision

The project uses **English everywhere** unless an explicit exception is documented.

### Naming matrix

- **Source code identifiers**: English.
- **Documentation**: English.
- **Applications, packages, and libraries**: English, descriptive, and kebab-case where path-based naming applies.
- **Database objects**: English snake_case for tables, columns, indexes, and constraints.
- **API contracts**: English, using clear resource and field names.
- **Branches and automation identifiers**: English.

### Additional rules

- Prefer descriptive names over abbreviations.
- Keep the same concept under the same name across specs, code, schema, and automation.
- Document any exception explicitly in an ADR or architecture document before using it.

## Consequences

- The repository now has one unambiguous naming language.
- Schema and code naming can be aligned without translation layers.
- Future features can reference a stable naming policy instead of redefining it.