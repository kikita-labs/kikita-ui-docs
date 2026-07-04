# Kikita UI Docs Architecture

This document is the tracked architecture baseline for the docs app. Build the
application from this structure before adding real documentation pages.

## Goals

- Publish public documentation for `@kikita-labs/ui`.
- Prove the published package works in an external Angular consumer app.
- Keep the docs app itself as a clean Angular 22 reference implementation.
- Keep examples practical, accessible, and copy-pasteable.

## Build Order

1. Project setup and tooling.
2. Shell architecture: header, sidebar, content outlet, and responsive layout.
3. Shared docs UI primitives: page header, doc section, code tabs, live preview,
   API table, and empty draft state.
4. Foundation pages: installation, theming, tokens, density, and accessibility.
5. Component overview route and component category navigation.
6. Component pages, one primitive at a time, checked against package types and
   sibling source docs.
7. Search, page table of contents, copy-link headings, and API playgrounds.

Do not skip from setup directly to content pages. The shell and shared docs
building blocks must exist first.

## Source Layout

Use this target shape as the app grows:

```text
src/app/
  core/
    theme/
    navigation/
    search/
  layout/
    shell/
    header/
    sidebar-nav/
    page-toc/
  shared/
    docs-ui/
      page-header/
      doc-section/
      code-tabs/
      live-preview/
      api-table/
      api-playground/
  pages/
    foundations/
    components/
  app.config.ts
  app.routes.ts
```

The current root app component should stay minimal until the shell exists. Do
not put docs content directly in `app.html`.

## Routing

- Route paths belong in typed route constants, not inline string literals spread
  across components.
- Navigation data should be a typed source of truth consumed by the sidebar,
  search index, and sitemap-like docs surfaces.
- Route components should be thin page containers. Shared rendering behavior
  belongs in `shared/docs-ui`.
- Unknown routes should render a real not-found page once the shell exists.

## Component Rules

- Use standalone Angular components only.
- Keep non-trivial components split into `.ts`, `.html`, and `.scss` files.
- Use `ChangeDetectionStrategy.OnPush` for docs shell and docs UI components.
- Use Angular signals for local state. Do not add NgRx or another external state
  store.
- Use Kikita UI primitives for docs chrome wherever possible.
- Prefer native HTML semantics before ARIA.
- Do not create visual patterns that fight the Kikita design system.

## Examples

- Every example must use public imports from `@kikita-labs/ui`.
- Never import source from the sibling `kikita-ui` repository.
- Do not invent component inputs, outputs, selectors, or behavior.
- Check installed package types before writing examples.
- Cross-check component docs in the sibling repository before publishing a page.
- Eventually, rendered examples and displayed source should share one source of
  truth. Avoid duplicated hand-maintained snippets when a real example file can
  be shown.

## Package Consumer Gate

Keep a dedicated smoke route once the shell exists. It should prove:

- `provideKikitaUi()` is installed.
- `node_modules/@kikita-labs/ui/styles/kikita-ui.css` is loaded through
  `angular.json`.
- Public package imports compile from the published dependency.
- Basic styled Kikita UI primitives render in an external consumer workspace.

## Review Gates

Before merging docs app feature work, run:

```bash
pnpm format:check
pnpm lint
pnpm build
pnpm test
```

When Angular API behavior is unclear, use the `angularCliKikitaDocs` MCP server
before relying on memory or local guesses.
