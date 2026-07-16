# Component Documentation Page Guide

Use this guide whenever creating or upgrading a component documentation page in
this app. The goal is that any agent can be given a primitive name and produce a
complete, consumer-safe docs page, navigation entry, API reference, examples,
and playground without inventing behavior.

## Required Inputs

Before writing code, collect the component facts from source-of-truth files:

- Installed package version:
  - `package.json`
  - `pnpm-lock.yaml`
- Library docs and status:
  - `../kikita-ui/CHANGELOG.md`
  - `../kikita-ui/docs/<primitive>.md`
  - `../kikita-ui/docs/component-roadmap.md`
  - `../kikita-ui/docs/state-coverage.md`

Do not document unreleased library behavior as available in the docs app. If the
library source has a newer API than the installed `@kikita-labs/ui` package,
either update the package first or mark the docs task as blocked.

## Implementation Sequence

1. Read `AGENTS.md`, every document in its Always Read list, and this file.
2. Run `angularCliKikitaDocs.list_projects` before Angular work.
3. Load Angular best practices from `instructions://best-practices` if
   `get_best_practices` returns `Unexpected response type`.
4. Check `git status --short` and keep unrelated user changes intact.
5. Inspect the existing `Button` docs page as the primary local pattern:
   - `src/app/pages/components/button/button-page.ts`
   - `src/app/pages/components/button/button-page.html`
   - `src/app/pages/components/button/button.api-schema.ts`
   - `src/app/pages/components/button/playground/button-playground-page.ts`
6. Inspect a similar component page from the same family, for example form
   primitives for form work or overlay primitives for overlay work.
7. Confirm the public imports and exported types from the installed package.
   Examples must import from `@kikita-labs/ui`, never from `../kikita-ui`.
8. Create or update the component docs manifest, page, examples, API schema,
   playground, registry-derived surfaces, generated source, and tests together.
   Until the typed registry migration lands, update the existing
   route/navigation/category sources together.
9. Verify with the relevant Angular target and review the rendered page when the
   change affects layout, responsive behavior, overlay behavior, or interaction.

## Files To Create Or Update

For a component named `<name>`:

- `src/app/pages/components/<name>/<name>-page.ts`
- `src/app/pages/components/<name>/<name>-page.html`
- `src/app/pages/components/<name>/<name>-page.scss`
- `src/app/pages/components/<name>/<name>.api-schema.ts`
- `src/app/pages/components/<name>/examples/<scenario>-example/*`
- `src/app/pages/components/<name>/playground/<name>-playground-page.*`
- `src/app/pages/components/<name>/<name>.docs-manifest.ts` once the typed
  registry migration is available
- generated Markdown mirror, agent manifest entry, `llms.txt` when curated,
  `llms-full.txt`, and MCP data through `tools/generate-agent-surface.mjs`
- local boundary `index.ts` files according to
  `.agents/imports-and-boundaries.md`
- `src/app/core/navigation/app-route-path.ts`
- `src/app/core/navigation/docs-navigation-items.ts`
- `src/app/core/components/docs-component-categories.ts`
- `src/app/app.routes.ts`

Only create a route constant if it does not already exist. Many planned
components already have `AppRoutePath` entries and draft route records.

## Left Sidebar Navigation

The left sidebar is driven by navigation data, not by the page template.

Update `AppRoutePath` and `DOCS_PATHS` before adding navigation entries:

- Add the route enum member in `src/app/core/navigation/app-route-path.ts` when
  the component does not already have one.
- Add the matching `DOCS_PATHS.components<Name>` entry in
  `src/app/core/navigation/docs-navigation-items.ts`.
- Reuse existing route constants for planned draft components.

Update `DOCS_NAVIGATION_ITEMS` in
`src/app/core/navigation/docs-navigation-items.ts`:

- Add the component under the existing `Components` child list.
- Keep the label user-facing and title case, for example `Icon Button`.
- Use the route from `DOCS_PATHS`, not an inline path string.
- Write a short description that explains the consumer use case, not internal
  implementation.

Update `DOCS_COMPONENT_CATEGORIES` in
`src/app/core/components/docs-component-categories.ts`:

- Put the component in the correct category: Actions, Forms, Feedback,
  Surfaces, Data and Identity, or a new category only if the existing taxonomy
  cannot represent it.
- Set `status: 'available'` only when the docs page is complete and routed.
- Keep `status: 'docs-pending'` for draft pages.
- Use the public import name from `@kikita-labs/ui`.
- Keep category order stable unless the task is explicitly about taxonomy.

If a component moves from draft to available, make sure its auto-generated draft
route no longer applies and an explicit page route exists.

## Right Page Menu

The right menu is automatic. `PageToc` collects `#main-content h2[id]`.

Every visible docs section must use `app-doc-section`:

```html
<app-doc-section
  anchor="usage"
  heading="Usage"
  description="Use native semantics and package-safe imports."
>
  ...
</app-doc-section>
```

Rules:

- Use stable lowercase kebab-case anchors.
- Do not rename anchors casually; external links may point to them.
- Section order controls the right menu order.
- Keep headings short and scannable.
- Do not manually add right-rail links inside the page body.
- Draft pages intentionally have no right menu.

## Page Structure

A complete component page should normally include these blocks, in this order:

1. `app-page-header`
2. `Import`
3. `Usage`
4. Main variant sections
5. State sections
6. Composition sections when relevant
7. `API`
8. `Accessibility`
9. Known gaps or migration notes when relevant

Use `Button` as the baseline structure. The exact middle sections depend on the
primitive, but the page should answer:

- What do I import?
- What is the smallest correct usage?
- Which variants and states exist?
- How do I combine it with related primitives?
- What inputs, outputs, projected slots, CSS hooks, and public types exist?
- What accessibility and native semantics does the consumer need to know?

Keep the page body capped with the shared docs layout mixin:

```scss
@use '../../../shared/styles/mixins/doc-page' as *;

.<name > -page {
  @include doc-page-layout;
}

.<name > -page__notes {
  @include doc-page-notes;
}
```

Use custom SCSS only for page-specific layout glue. Do not re-skin Kikita UI
primitives in component docs pages.

## Shared Docs UI

Use existing shared docs UI before adding new page-specific chrome:

- `app-page-header` for page title, family eyebrow, description, and status.
- `app-doc-section` for every top-level content section and right menu anchor.
- `app-live-preview` for rendered examples.
- `app-code-tabs` for syntax-highlighted snippets and copy behavior.
- `app-api-table` for API rows.
- `app-api-playground` for interactive controls, resizable preview, and live
  snippet.
- Kikita UI primitives from `@kikita-labs/ui` for controls, tables, cards,
  fields, segments, switches, buttons, and icon buttons.

For compact labels above grouped controls, use the shared
`src/app/shared/styles/mixins/_caption-label.scss` mixin. Playground control
captions, popover section labels, and similar secondary labels should use this
caption treatment instead of ad hoc bold field labels.

Do not create ad hoc cards, tabs, tables, code blocks, or control panels when a
shared docs component already exists.

## Code Examples

Examples must be practical, short, and copy-pasteable for a normal Angular
consumer app.

Code rules:

- Import only from `@kikita-labs/ui`.
- Prefer native HTML semantics before ARIA.
- Use standalone Angular components.
- Do not set `standalone: true`; Angular 22 makes it the default.
- Do not set `ChangeDetectionStrategy.OnPush`; Angular 22 makes it the default.
- Use signals for state.
- Use `input()` and `output()` for new component APIs.
- Use native control flow: `@if`, `@for`, `@switch`.
- Do not use `ngClass` or `ngStyle`; use class and style bindings.
- Apply explicit public/protected/private visibility and readonly rules from
  `.agents/angular-code-style.md`.
- Do not use direct browser globals. Examples must model the platform and async
  patterns in `.agents/platform-and-state.md`.
- Keep example components focused on one scenario.
- Keep snippets in sync with the rendered example.

Snippet rules:

- The target architecture generates snippet text from the real example source
  files. Use the generated example-source module once it is available for the
  feature; do not duplicate the source in page-owned multiline strings.
- Until a feature is migrated, store legacy snippets as
  `protected readonly CodeTab[]` and update the real example and snippet in
  the same change.
- Include file names where useful.
- Use `language: 'html'`, `language: 'ts'`, or `language: 'scss'` so Shiki can
  highlight correctly.
- Prefer one focused snippet per section. Use multiple tabs only when the
  consumer needs both template and TypeScript.
- Do not include internal docs-only imports in consumer snippets unless the
  snippet is explicitly explaining the docs app itself.
- Escape or sanitize generated snippet text in playgrounds.

Rendered examples:

- Put examples under `examples/<scenario>-example/`.
- Use the component's real public API, not CSS classes copied from the design
  concept.
- Cover one behavior per example: basic usage, sizes, appearances, composition,
  validation, overlay placement, loading, disabled, and so on.
- If the primitive is form-related, include field composition where relevant.
- If the primitive supports projected content or templates, show at least one
  realistic projection example.

## API Tables

Create `<name>.api-schema.ts` with readonly, version-verified API data. Use the
typed shared schema once it is available; do not recover playground values with
repeated type assertions.

Every public API row should include:

- `name`: exact input, output, method, slot, directive, selector, token, CSS
  custom property, or public type name.
- `type`: the public TypeScript type or literal union.
- `defaultValue`: the true runtime default, or `-` when not applicable.
- `description`: consumer-facing behavior and constraints.

Table coverage must include all relevant public surfaces:

- Inputs and model inputs.
- Outputs and emitted payloads.
- Content slots and marker directives.
- Public directives/components used in composition.
- Injection tokens or provider functions.
- CSS custom properties only when intended for consumers.
- Known non-features that prevent misuse, such as "upload transport is not built
  in" for file upload.

Verify API rows against installed package typings and the sibling library docs.
Do not infer names from visual specs alone.

## Playground

Every component with configurable inputs should get a playground page.

Use `app-api-playground`:

- Define typed playground controls that infer the value map. During the
  migration period, do not add new assertions to the legacy
  `PlaygroundValues` API; improve the shared generic contract first.
- Include every public input that can be changed by a consumer at runtime.
- Include inputs even when they seem minor, such as `size`, `disabled`,
  `readonly`, `invalid`, `clearable`, `placement`, `align`, `shape`,
  `appearance`, `multiple`, `wrap`, `loading`, `max`, `min`, or text labels.
- If the component renders consumer-owned text content, projected text, labels,
  option text, placeholder-like display text, or button text, add a string
  playground control for that text even when it is not a formal component input.
  For example, a `kuiButton` playground must let the user edit the button label.
- If a public input cannot be represented safely in the generic playground,
  document the exception in the normal page body and cover it with a focused
  rendered example.
- Use `kind: 'enum'` for literal unions.
- Use `kind: 'boolean'` for binary inputs.
- Use `kind: 'number'` for numeric inputs.
- Use `kind: 'string'` for labels, placeholder text, ids, and simple values.
- Choose defaults that match the runtime default whenever possible.
- Render the real component in the preview area.
- Provide a local preview theme toggle when the component has theme-sensitive
  visuals. The toggle must apply only to the playground preview surface, never
  to the global docs theme.
- Generate a live `CodeTab[]` snippet from current values.
- Omit default-valued attributes from generated snippets when omission is the
  normal consumer style.
- Keep preview width presets and the drag handle from `app-api-playground`; do
  not build a custom viewport selector.

For inputs that require object values, templates, async data, or arrays:

- Provide a small fixed set of meaningful options instead of raw JSON editing.
- Prefer a realistic example state over a generic "object" control.
- Explain advanced composition in a normal docs section if the playground
  control would become awkward or misleading.

The playground route should usually be nested under the component route:

```ts
{
  path: AppRoutePath.ComponentsButton,
  children: [
    {
      path: AppRoutePath.Home,
      loadComponent: () =>
        import('./pages/components/button/button-page').then((m) => m.ButtonPage),
      pathMatch: 'full',
    },
    {
      path: AppRoutePath.Playground,
      loadComponent: () =>
        import('./pages/components/button/playground/button-playground-page').then(
          (m) => m.ButtonPlaygroundPage,
        ),
    },
  ],
}
```

Add a `docSectionActions` link from the main page `Usage` section to the
playground.

## Design And Layout Expectations

Follow these expectations:

- Keep docs pages quiet, dense, and scannable.
- Use Kikita UI tokens and primitives.
- Keep component examples inside `app-live-preview`.
- Use dotted or preview-stage styling only through existing shared docs UI.
- Avoid broad visual polish that competes with the design system.
- Do not nest decorative cards inside cards.
- Keep text readable on narrow screens.
- Use real native elements where the primitive is a directive for native
  elements.

## Accessibility Section

Every component page needs an `Accessibility` section.

Cover:

- Which native element should be used and why.
- Required accessible names or labels.
- Keyboard behavior the library preserves or implements.
- Focus management for overlays, dialogs, menus, and composite widgets.
- Disabled, readonly, invalid, required, and described-by behavior.
- When ARIA is handled by the primitive and when consumers must provide text.
- Any assistive-technology review gaps from `state-coverage.md`.

Keep claims specific. Do not say "fully accessible" unless that exact review has
been completed and documented.

## Migration Or Version Notes

Add a migration or version section only when the current installed package has a
consumer-visible change that affects examples.

Use it for:

- Breaking changes in `../kikita-ui/CHANGELOG.md`.
- API renames.
- Input value moves, such as `appearance` values moving to `shape`.
- Behavior differences between installed package and unreleased source.

Do not copy unreleased changelog entries into public docs as if shipped.

## Verification

At minimum:

- Run the relevant Angular build or lint target.
- Check `git diff --check`.
- Review the changed docs page in a browser when layout or interaction changed.
- Check desktop and narrow mobile widths for text overflow and preview layout.
- Confirm code snippets match rendered examples.
- Confirm playground controls update the preview and snippet.
- Confirm right menu links scroll to the intended sections.
- Confirm left sidebar route opens the new page.
- Confirm the document has no horizontal overflow at 320, 360, and 390 pixels.
- Confirm API tables, code tabs, playground controls, and examples scroll or
  stack locally rather than widening the document.
- Confirm mobile navigation focus trap, close behavior, and focus restoration
  when the change touches the shell.
- Confirm no tracked file contains Cyrillic or mojibake.

## Final Checklist

Use this before calling the page done:

- [ ] Agent instructions and source-of-truth files were read.
- [ ] Installed `@kikita-labs/ui` version was checked.
- [ ] Public package typings were checked for all documented APIs.
- [ ] Page route exists and draft route no longer intercepts it.
- [ ] Left sidebar navigation includes the component.
- [ ] Component category status is correct.
- [ ] Page header has family, title, description, and version-aware status.
- [ ] Every top-level section uses `app-doc-section` with stable anchors.
- [ ] Right menu appears from the section headings.
- [ ] Import section uses public `@kikita-labs/ui` imports.
- [ ] Usage section contains the smallest correct example.
- [ ] Variant and state sections cover the important visual and behavioral axes.
- [ ] Examples are rendered through `app-live-preview`.
- [ ] Snippets use `app-code-tabs` and syntax-highlight correctly.
- [ ] API table covers inputs, outputs, slots, tokens, and public composition
      helpers where applicable.
- [ ] Playground exists for configurable primitives.
- [ ] Playground includes every meaningful public input.
- [ ] Playground includes editable string controls for user-visible text content
      such as button text, labels, option text, and placeholders.
- [ ] Playground preview and generated snippet stay in sync.
- [ ] Accessibility section is specific and honest about review status.
- [ ] Migration/version notes are included when the installed package requires
      them.
- [ ] Shared docs UI and Kikita UI primitives are used instead of ad hoc UI.
- [ ] Agent-surface outputs were regenerated with `pnpm generate:agent-surface`
      or the exact blocker was recorded: Markdown mirror, agent manifest,
      `llms.txt` when curated, `llms-full.txt`, and MCP data.
- [ ] `pnpm check:agent-surface` passes when generated agent files changed.
- [ ] No sibling library source imports were added.
- [ ] No unreleased behavior was documented as available.
- [ ] Angular verification ran or the exact blocker is recorded.
- [ ] Browser review covered desktop and narrow mobile when UI changed.
- [ ] `git diff --check` passes.
- [ ] Tracked files contain English text only.
