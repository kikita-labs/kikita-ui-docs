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
2. Check the exact public npmjs package state when the task depends on a
   published version:
   - `npm view @kikita-labs/ui version license dist-tags.latest --@kikita-labs:registry=https://registry.npmjs.org`
   - `npm view @kikita-labs/ui versions --json --@kikita-labs:registry=https://registry.npmjs.org`
3. Check the sibling library changelog:
   - `../kikita-ui/CHANGELOG.md`
4. Check source documentation in the library:
   - `../kikita-ui/docs/<primitive>.md`
   - `../kikita-ui/docs/component-roadmap.md`
   - `../kikita-ui/docs/state-coverage.md`

The latest metadata must match the target version and license, and
`versions --json` must include the target version. If npm CLI metadata appears
stale or contradictory, verify the direct registry document before burning a new
version:

```powershell
Invoke-RestMethod -Uri 'https://registry.npmjs.org/@kikita-labs%2Fui' |
  Select-Object -ExpandProperty versions |
  Get-Member -MemberType NoteProperty |
  Select-Object -ExpandProperty Name
```

Prefer `versions --json` or the direct-registry check over
`npm view @kikita-labs/ui@<target-version>` because some Windows npm shells parse
scoped package exact-version selectors incorrectly. If the docs app depends on a
version that npmjs does not serve exactly, stop and report the mismatch. Do not
regenerate `llms.txt`, update public docs metadata, or claim a fresh consumer can
install that version.

Use `--@kikita-labs:registry=https://registry.npmjs.org` for scoped package
checks, installs, and publishes. A user-level `.npmrc` scope override can beat a
plain `--registry` flag and accidentally send `@kikita-labs/*` to GitHub
Packages.

## Changelog Handling

Use `../kikita-ui/CHANGELOG.md` to detect user-visible library changes. If a
change affects docs examples, API tables, migration notes, installation, theme
setup, or component behavior, update the docs in the same docs-site task.

Do not copy unreleased changelog entries into public release notes as if they
were published. Distinguish:

- installed package behavior
- unreleased library source behavior
- planned/future behavior

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

## Generated Agent Surface

After dependency, component manifest, route, API schema, generated example,
foundation page, source docs, or package version changes, run:

```bash
pnpm generate:agent-surface
pnpm check:agent-surface
```

The generator owns:

- `public/llms/`;
- `public/llms.txt`;
- `public/llms-full.txt`;
- `public/llms/agent-manifest.json`.

Do not hand-edit those files. Fix the source manifest, source docs, examples,
API schema, foundation page, or generator instead.
