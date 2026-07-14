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
- Do not make a root mega-barrel that exports all pages or all examples.
- Route loaders import a concrete page entry or a feature route entry; they do
  not import a barrel that eagerly references the whole component catalog.

Example:

```ts
export { CodeTabs } from './code-tabs';
export type { CodeTab } from './code-tab';
export type { CodeTabLanguage } from './code-tab-language';
```

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
