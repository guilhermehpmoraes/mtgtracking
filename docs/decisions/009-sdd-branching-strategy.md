# ADR-009: SDD Branching Strategy

## Status

Accepted

## Context

MTG Tracking needs a branch model that preserves the SDD feature/task lifecycle while still supporting a standard integration-to-release flow.

## Decision

The project uses the following hierarchy:

```text
main
  └── develop
        └── feature/<feature-id>
              └── task/<task-id>
```

### Rules

- `develop` is the SDD integration branch.
- `main` is the release branch.
- Feature branches are created from `develop`.
- Task branches are created from the owning feature branch.
- Task branches are published to the remote while active.
- Task branches merge back into the parent feature branch.
- Feature branches merge back into `develop`.
- Promotion to `main` is reserved for validated release-ready work.

## Consequences

- The repository now has a concrete SDD branching baseline.
- Skills and prompts can stop treating branch names as placeholders.
- Remote collaboration and backup of active implementation work are preserved because task branches are published.