# ADR-008: Repository and Project Naming Conventions

## Status

Accepted

## Context

MTG Tracking starts with one application but will still contain multiple repository-level artifacts: backend, frontend, shared packages, and test surfaces. The naming rules need to scale before the repository grows.

## Decision

The repository adopts the following baseline:

- Product and primary app name: `mtgtracking`.
- App-oriented Nx paths: `apps/mtgtracking/backend` and `apps/mtgtracking/frontend`.
- Shared cross-cutting code: `packages/<purpose>`.
- Repository and path-based identifiers: kebab-case.
- Test surfaces should mirror the owning application and stack in their names.

### Naming rules

- Names must indicate purpose clearly.
- The same surface should keep the same name across docs, paths, tasks, and automation.
- New shared packages should be named by responsibility rather than implementation detail.

## Consequences

- Repository artifacts can scale without ad hoc naming.
- Future Nx project names have a documented baseline.
- Automation and specs can derive scope from stable identifiers.