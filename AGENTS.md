# AGENTS.md

This repository contains Kikita UI Docs, the future public documentation and
external consumer verification app for `@kikita-labs/ui`.

## Rules

- Angular 22+ only.
- Keep all tracked content in English.
- Consume `@kikita-labs/ui` as a package dependency, not by importing source from
  the sibling `kikita-ui` repository.
- Use Kikita UI primitives for docs UI wherever possible.
- Do not invent component API. Check the installed package types and the sibling
  Kikita UI docs before writing examples.
- Keep examples practical and copy-pasteable.
- Prefer native HTML semantics before ARIA.
- Do not add broad visual polish that conflicts with the Kikita design system.
- Angular state in this app is signals-only (Angular 22). Do not introduce NgRx
  or other external state stores.

## Angular MCP

This repo uses the `angularCliKikitaDocs` MCP server from the local Codex
settings. For any question about current Angular 22+ APIs, CLI usage, or Angular
best practices, query the MCP server first. Do not guess and do not rely on local
files or training data for Angular framework questions.

Use the MCP resource `instructions://best-practices` from
`angularCliKikitaDocs` as the primary source for Angular best practices in
Codex. The Angular CLI MCP `get_best_practices` and `search_documentation` tools
may return `Unexpected response type` in Codex even while the server is healthy;
in that case, use the readable MCP resource and the working `list_projects` /
`run_target` tools.

Only fall back to local files/docs if the MCP server is connected but does not
have the answer. If the MCP server is unavailable or not connected, stop and
tell the user. Do not silently fall back to local files instead.

## Architecture

Read `docs/architecture.md` before creating shell, route, shared docs UI, or page
code. Do not add real docs pages before the shell and shared docs UI architecture
exists.

## Local Notes

`.local-notes/` (gitignored, not tracked) holds planning docs for this repo:

- `PLAN.md` - architecture, information architecture, and build-order plan for
  the docs site.
- `claude-design/briefs/design-brief.md` - brief handed to Claude Design for the
  docs site concept.

Read these before starting structural work on the docs app.

## Source Of Truth

The sibling library repository remains the implementation source of truth:

```text
C:\Users\Nikita\OneDrive\Desktop\workbench\kikita\kikita-ui
```

Use these files there before documenting a component:

- `docs/<primitive>.md`
- `docs/component-roadmap.md`
- `docs/state-coverage.md`
- `docs/component-checklist.md`
- `.local-notes/claude-design/design system/<component>.dc.html`

## Package Usage

The current docs app consumes:

```text
@kikita-labs/ui@0.1.0
```

Styles are registered in `angular.json`:

```json
"node_modules/@kikita-labs/ui/styles/kikita-ui.css"
```

Do not replace this with a SCSS `@import` unless the package style export has
been verified in a fresh Angular consumer app.

## Next Work

- Build real docs information architecture.
- Add foundation pages for installation, theming, tokens, density, and
  accessibility.
- Add component docs pages from the library docs, keeping examples consumer-safe.
- Add a small package smoke test route that proves the published package imports,
  styles, and provider work outside the library workspace.
