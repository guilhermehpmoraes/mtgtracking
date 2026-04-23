# ADR-010: Interface Documentation Standard

## Status

Accepted

## Context

The primary interface in MTG Tracking is the HTTP API exposed by the Spring backend to the Angular frontend. That contract needs one authoritative source of truth.

## Decision

The project standardizes on **OpenAPI** for HTTP interface documentation.

### Rules

- The backend application is the source of truth for HTTP contract metadata.
- Generated API documentation should be derived from the backend contract definition rather than maintained manually in a separate document.
- Endpoints, request models, response models, and error surfaces should be documented with enough metadata to support both frontend consumption and future external review.
- Non-HTTP interfaces introduced later may use a different fit-for-purpose mechanism, but that choice must be documented explicitly.

## Consequences

- Backend and frontend development can align on one contract format.
- Interface documentation becomes a normal part of backend implementation rather than an afterthought.
- Future non-HTTP interfaces will need their own explicit documentation choice instead of piggybacking silently on OpenAPI.