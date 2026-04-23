# ADR-011: Frontend Design System and Pencil Workflow Baseline

## Status

Accepted

## Context

MTG Tracking includes a user-facing Angular application and needs a deliberate design workflow so analytics screens and data-entry flows do not evolve through ad hoc UI decisions.

## Decision

The frontend baseline is:

- `design/` stores design artifacts, prototypes, and Pencil references.
- `packages/ui` stores reusable UI implementation and shared visual building blocks.
- Global theme values and reusable visual tokens should be centralized in the shared UI layer.
- Mobile-first is the default responsive posture.

### Pencil rules

- Pencil is required for frontend work with meaningful visual or UX impact.
- Plans and tasks for visual changes must reference the approved Pencil artifact before implementation is considered ready.
- If implementation uncovers a material visual change, update Pencil first and then reflect it in code.
- Purely technical frontend tasks with no meaningful visual impact may proceed without Pencil when the task spec states that explicitly.

## Consequences

- Design ownership is explicit from the start.
- Reusable UI code has a documented home in the monorepo.
- Frontend tasks that affect users visually now have a stricter readiness bar.