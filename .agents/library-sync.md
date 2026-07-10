# Library Sync Rules

The sibling library repository is the source of truth:

```text
../kikita-ui
```

The docs app is an external consumer. It must track the published package, not
private source state.

## Before Docs Work

Before creating or changing docs for a Kikita UI primitive:

1. Check the installed `@kikita-labs/ui` version:
   - `package.json`
   - `pnpm-lock.yaml`
2. Check the sibling library changelog:
   - `../kikita-ui/CHANGELOG.md`
3. Check pending migration notes:
   - `.local-notes/LIBRARY-BREAKING-CHANGES.md`
4. Check source documentation in the library:
   - `../kikita-ui/docs/<primitive>.md`
   - `../kikita-ui/docs/component-roadmap.md`
   - `../kikita-ui/docs/state-coverage.md`
5. If the docs need a component visual/API detail, check the matching design spec
   in the library:
   - `../kikita-ui/.local-notes/claude-design/design system/<component>.dc.html`

## Changelog Handling

Use `../kikita-ui/CHANGELOG.md` to detect user-visible library changes. If a
change affects docs examples, API tables, migration notes, installation, theme
setup, or component behavior, update the docs in the same docs-site task.

Do not copy unreleased changelog entries into public release notes as if they
were published. Distinguish:

- installed package behavior
- unreleased library source behavior
- planned/future behavior

## Breaking Changes

If `.local-notes/LIBRARY-BREAKING-CHANGES.md` exists, read it before coding.
Every unresolved entry should be either:

- migrated in the docs app;
- marked as not applicable with a short reason;
- left open with a clear blocker.

Do not delete migration notes unless the migration is complete and verified.

## Examples

Examples must use package-consumer imports:

```ts
import { KuiButtonDirective } from '@kikita-labs/ui';
```

Do not use sibling source imports:

```ts
import { KuiButtonDirective } from '../../kikita-ui/projects/ui/src/...';
```

Examples must be copy-pasteable for a normal Angular consumer app.
