# Imports, Path Aliases, Barrels, And Boundaries

The goal is short imports with visible architecture, not hiding dependencies
behind unrestricted barrels.

## Approved Aliases

Add these aliases to the shared TypeScript configuration:

```json
{
  "compilerOptions": {
    "paths": {
      "@app/*": ["./src/app/*"],
      "@core/*": ["./src/app/core/*"],
      "@layout/*": ["./src/app/layout/*"],
      "@pages/*": ["./src/app/pages/*"],
      "@shared/*": ["./src/app/shared/*"],
      "@generated/*": ["./src/app/generated/*"]
    }
  }
}
```

TypeScript 6 resolves `paths` relative to this root configuration without
`baseUrl`; targets therefore start with `./`. Do not add the deprecated
`baseUrl` option or silence its deprecation.

Rules:

- Use aliases when crossing an architectural boundary.
- Use `./` and at most one shallow `../` inside the same feature.
- Do not use an alias to reach another feature's private implementation.
- Do not add aliases per component or for arbitrary folders.
- Tests follow the same boundary rules as production code.
- Lazy route imports may use an alias only when the build confirms the lazy
  boundary remains intact.

## Kind Folders Inside A Component

A `shared/docs-ui/<component>/`, `layout/<component>/`, `core/<capability>/`,
or page component folder does not hold implementation files flat. Split by
kind into subfolders next to the primary `.ts`/`.html`/`.scss`:

- `interfaces/` — `interface` declarations;
- `types/` — `type` alias declarations (unions, mapped types, ...);
- `constants/` — exported constant values and lookup tables;
- `helpers/` — plain functions that are not Angular artifacts;
- `services/` — an Angular service that only this component uses;
- `enums/`, `tokens/` — when the component has either.

Put a symbol in a kind folder only once it has its own file; a single
one-line type used by one sibling can still stay in that kind folder rather
than inline in the consuming file — see `angular-code-style.md`'s ban on
inline interfaces/functions/constants inside component and service files.

Example (`shared/docs-ui/code-tabs/`):

```text
code-tabs/
  code-tabs.ts
  code-tabs.html
  code-tabs.scss
  index.ts
  interfaces/
    code-tab.ts
    shiki-highlighter.ts
    shiki-theme.ts
    index.ts
  types/
    code-tab-language.ts
    index.ts
  constants/
    shiki-language-by-tab.ts
    shiki-theme-loaders.ts
    index.ts
  helpers/
    low-contrast-theme-override.ts
    index.ts
  services/
    code-highlighter.service.ts
    code-highlighter.service.spec.ts
    index.ts
```

## Barrel Policy

Every directory that intentionally exposes importable TypeScript artifacts has
an `index.ts`. The barrel is an architectural boundary, not a directory dump.

Required boundary barrels:

- each `core/<capability>/`;
- each `shared/docs-ui/<component>/`;
- `shared/docs-ui/`, `shared/models/`, and shared utility groups;
- each `layout/<component>/`;
- each docs feature root;
- each feature's `examples/` and `playground/` when they expose more than one
  artifact;
- each kind folder (`interfaces/`, `types/`, `constants/`, `helpers/`,
  `enums/`, `tokens/`) inside a component;
- generated artifacts.

Barrel rules:

- Export only symbols meant for consumers outside the directory.
- Use explicit named exports. Do not use `export *`.
- Export types with `export type`.
- Never export private helpers, test fixtures, implementation-only adapters, or
  generated internals accidentally.
- A barrel must not import from its parent.
- Files inside a directory import sibling files directly, not through their own
  `index.ts`.
- A file that imports across a kind-folder boundary inside the same component
  (e.g. `code-tabs.ts` needing `CodeTab` from `interfaces/`, or
  `constants/shiki-language-by-tab.ts` needing `CodeTabLanguage` from
  `types/`) imports through that kind folder's `index.ts`
  (`from './interfaces'`, `from '../types'`), never a deep path into one of
  its files.
- Do not make a root mega-barrel that exports all pages or all examples.
- Route loaders import a concrete page entry or a feature route entry; they do
  not import a barrel that eagerly references the whole component catalog.

Example (component root barrel, re-exporting kind-folder barrels):

```ts
export { CodeTabs } from './code-tabs';
export type { CodeTab } from './interfaces';
export { CodeHighlighterService } from './services';
export type { CodeTabLanguage } from './types';
```

`CodeHighlighterService` is exported from the component barrel because a
second component (`ApiPlayground`'s test) needs it directly, not because
being used _inside_ `CodeTabs`'s own template makes it shared -- see
`architecture.md`'s promotion rule.

## Import Order

Use automatic sorting. The semantic groups are:

1. Angular and Angular CDK;
2. RxJS and Angular interop;
3. `@kikita-labs/ui`;
4. other external packages;
5. project aliases;
6. parent/sibling relative imports;
7. side-effect imports.

Within a group, the sorter owns ordering. Named specifiers are sorted. Type-only
imports use `import type`.

Do not hand-format imports against the configured sorter. Add
`eslint-plugin-simple-import-sort` and enable:

- `simple-import-sort/imports`;
- `simple-import-sort/exports`;
- `@typescript-eslint/consistent-type-imports`.

Prettier owns layout; ESLint owns semantic import rules.

## Boundary Enforcement

Configure directory-specific restricted imports:

- `core/**` cannot import `@layout`, `@shared`, or `@pages`.
- `shared/**` cannot import `@layout` or `@pages`.
- `layout/**` cannot import concrete `@pages` implementations.
- `pages/components/<a>/**` cannot import
  `pages/components/<b>/**`.
- no file imports sibling library source under `../kikita-ui`.
- no file deep-imports `@kikita-labs/ui` internals.

Add a circular dependency check to CI. A barrel cycle is still a cycle.

## Migration Sequence

1. Add aliases to `tsconfig.json` and confirm app/spec configs inherit them.
2. Add import-sort and boundary lint rules.
3. Add boundary barrels from the lowest layer upward: core, shared, layout,
   then pages.
4. Migrate one feature at a time.
5. Run lint, test, and build after every feature wave.
6. Search for deep relative ladders and legacy direct imports.
7. Tighten restricted-import rules only after each migration wave reaches zero
   violations.

Do not apply a blind repository-wide import rewrite. It makes cycles and lazy
chunk regressions hard to diagnose.

## Acceptance Criteria

- No cross-layer relative import ladders.
- No unapproved aliases.
- No `export *` barrels.
- No barrel self-imports or parent imports.
- No new cycles.
- Import order is machine-enforced.
- Type-only imports are machine-enforced.
- Production build preserves expected route-level lazy chunks.
