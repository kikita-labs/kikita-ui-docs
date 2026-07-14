# Kikita UI Docs Architecture

This document is the normative target architecture for the Angular 22 docs
application. Existing code may be transitional. New code must move toward this
model and must not deepen a documented violation.

## Architecture Goals

- Be the public documentation and external package-consumer proof for
  `@kikita-labs/ui`.
- Be a reference-quality Angular 22 application: standalone, zoneless-ready,
  signals-first, typed, accessible, responsive, lazy, and testable.
- Keep library API facts, rendered examples, displayed source, API tables,
  playground controls, navigation, routes, breadcrumbs, and search metadata
  synchronized through explicit sources of truth.
- Make architectural boundaries enforceable with TypeScript aliases, barrels,
  lint rules, tests, and review gates.
- Allow incremental refactoring. The target is not permission for an unverified
  repository-wide rewrite.

## Dependency Direction

```text
bootstrap/app
  -> layout
  -> pages/features
  -> shared/docs-ui
  -> core

pages/features -> @kikita-labs/ui
shared/docs-ui -> @kikita-labs/ui
layout         -> @kikita-labs/ui
core           -> Angular/CDK/platform abstractions only
```

Rules:

- `core` does not import `layout`, `shared`, or `pages`.
- `shared` does not import `layout` or `pages`.
- `layout` may import `core` and `shared`, but not concrete page
  implementations.
- One page feature does not import another page feature. Reusable behavior moves
  to `shared` or `core`.
- Examples inside one component docs feature are private to that feature.
- The app consumes only the public `@kikita-labs/ui` package entrypoint.
- Cross-boundary imports use approved aliases and boundary barrels. Local files
  within a feature use `./` or a shallow `../`.

## Target Source Layout

```text
src/app/
  bootstrap/
    app.config.ts
    app.routes.ts
  core/
    docs-registry/
    navigation/
    platform/
      anchor/
      clipboard/
      media/
      scheduler/
      storage/
    search/
    theme/
  layout/
    header/
    page-toc/
    shell/
    sidebar-nav/
    theming/
  shared/
    docs-ui/
      api-playground/
      api-table/
      code-tabs/
      doc-section/
      draft-state/
      live-preview/
      page-header/
    models/
    styles/
    utilities/
  pages/
    components/
      <component>/
        <component>-page.*
        <component>.api-schema.ts
        <component>.docs-manifest.ts
        examples/
        playground/
        index.ts
    foundations/
    home/
    not-found/
    smoke/
  generated/
    example-sources.generated.ts
  app.ts
```

`bootstrap/` is the final target for root configuration. Moving the existing
root files is optional until it can be done as a dedicated verified slice.

## Typed Documentation Registry

The current route enum, path object, navigation tree, component categories,
breadcrumbs, search index, and route table repeat the same facts. Replace that
duplication with feature manifests aggregated by a typed registry.

Each component docs feature owns a manifest similar to:

```ts
export const BUTTON_DOCS = defineComponentDocs({
  slug: 'button',
  title: 'Button',
  category: DocsComponentCategory.Actions,
  description: 'Primary command primitive for buttons and links.',
  publicImports: ['KuiButtonDirective'],
  packageStatus: 'available',
  loadPage: () => import('./button-page').then((module) => module.ButtonPage),
  loadPlayground: () =>
    import('./playground/button-playground-page').then((module) => module.ButtonPlaygroundPage),
});
```

From the registry, derive:

- component child routes;
- canonical paths and playground paths;
- left navigation and overview categories;
- breadcrumbs;
- search commands;
- draft routes and availability state;
- route/manifest invariant tests.

Do not put component classes in the manifest or barrel imported by the root.
Only lazy loader functions may reference page implementations. Preserve one
lazy chunk per route feature unless measurements justify another grouping.

Foundation and resource pages use the same principle with a smaller page
manifest type. App-level constants remain only for root segments such as home,
components, foundations, smoke, playground, and wildcard.

## Page Feature Contract

A component docs feature owns:

- one thin overview page that composes shared docs UI;
- focused rendered example components;
- one verified API schema;
- an optional typed playground;
- one docs manifest;
- local styles and tests;
- a local `index.ts` that exports the feature's intended public surface.

Page classes contain composition data, not infrastructure. They must not own
clipboard, history, storage, viewport, syntax-engine, or DOM-query behavior.
They must not duplicate example source in multiline string literals after the
example-source generator is available.

## Example Source Of Truth

Rendered examples and displayed source must use the same files.

The target flow is:

1. An example is implemented in real `.ts`, `.html`, and optional `.scss`
   files under `examples/`.
2. A deterministic prebuild generator reads those files.
3. It emits a typed `example-sources.generated.ts` module.
4. The page imports generated source by a stable example id.
5. CI runs a check mode that fails when generated source is stale.

Do not rely on undocumented builder-specific raw-import behavior. Do not hand
edit the generated module. Until the generator migration reaches a feature,
every snippet edit must update and verify the rendered example in the same
change.

## API Schema And Playground

The generic playground must be type-safe. Its schema uses discriminated control
types and a generic value map inferred from the controls. Feature pages must not
recover values with repeated `as string`, `as boolean`, or library-union
casts.

The component API source of truth must:

- identify the installed package version used for verification;
- cover inputs, models, outputs, slots, providers, public composition helpers,
  and supported CSS hooks;
- feed both the static API table and configurable playground where possible;
- provide explicit serializers/parsers for non-trivial control values;
- reject unsupported values before they reach a rendered primitive;
- keep snippet generation pure and deterministic.

## Platform Boundary

Only `core/platform` adapters may touch browser-specific facilities. See
`.agents/platform-and-state.md`.

Components request semantic capabilities such as copying text, storing a
setting, navigating to an anchor, observing headings, scheduling a delayed
example result, or reading a breakpoint. They do not access browser globals or
injected `DOCUMENT` directly.

The boundary exists for SSR safety, deterministic tests, consistent fallback
behavior, and removal of duplicated browser error handling.

## State Ownership

- Local visual state stays in the owning component.
- Shared application state exists only when multiple independent consumers need
  the same source.
- Derived state is a `computed()`, not another writable signal synchronized by
  an effect.
- Router, media, and async stream interop is converted at the boundary with
  Angular RxJS interop utilities.
- Effects perform side effects only and live as close as possible to the side
  effect boundary.
- Services expose readonly signals and intentional command methods.

## Component Size And Extraction

These are review thresholds, not reasons for meaningless file splitting:

- component/page TypeScript: target at most 150 lines, review required above
  200;
- template: target at most 120 lines;
- component SCSS: target at most 160 lines, never bypass the configured style
  budget;
- function: target at most 30 lines and one responsibility;
- one primary Angular artifact per implementation file.

Extract when a block has its own state, behavior, accessibility contract,
responsive rules, or reusable meaning. Do not extract markup solely to satisfy
a line count.

## Routing And Lazy Loading

- Feature routes are lazy.
- Root route configuration stays declarative and short.
- Route metadata is typed and derived from manifests where practical.
- Public URLs and stable section fragments are compatibility contracts.
- Unknown routes render the not-found page.
- Navigation must use router APIs, not history/location mutation.
- Route state must not be duplicated by unmanaged subscriptions.

## Styling Ownership

- Global styles contain reset, document-level layout, shared tokens, and
  intentionally global utilities only.
- Layout owns page regions and breakpoints.
- Shared docs UI owns reusable documentation chrome.
- Feature styles contain only feature-specific example or page glue.
- Use Kikita tokens, logical properties, and documented library extension
  points. Do not re-skin package primitives with broad selectors.
- Every component host must have an intentional layout role.

## Architectural Enforcement

The migration is complete only when architecture is enforced by:

- TypeScript path aliases;
- boundary barrels;
- sorted imports and consistent type imports;
- restricted-import and restricted-global lint rules;
- circular-dependency checks;
- registry invariant tests;
- generated-source drift checks;
- build, test, lint, accessibility, responsive, and bundle gates.

Written guidance without automated enforcement is not considered a completed
architecture change.

## Forbidden Patterns

- Direct sibling-library source imports.
- Direct browser globals outside `core/platform`.
- NgRx, Subjects, or mutable services used as component state stores.
- Giant route, navigation, or page-data files that repeat registry facts.
- Broad `index.ts` barrels that export private internals or destroy lazy
  boundaries.
- Cross-feature relative import ladders such as `../../../../shared/...`.
- Hand-maintained displayed snippets once generated source exists.
- Repeated type assertions used to compensate for an untyped shared API.
- Visual breakpoints defined independently in many component files.
- Effects used to copy one signal into another.
- Unverified repository-wide moves or mixed architecture/visual/content
  rewrites.

## Architecture Decision Records

Any future change that alters layer direction, state ownership, registry shape,
example generation, browser abstraction, routing strategy, or public alias
scheme requires a short ADR under `.agents/decisions/`. Record context,
decision, alternatives, consequences, migration, and rollback. Minor local
implementation choices do not need an ADR.
