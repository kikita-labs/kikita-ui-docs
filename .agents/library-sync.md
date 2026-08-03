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

## Keep README In Sync

`README.md`'s "Package Sync" section hard-codes the installed
`@kikita-labs/ui` version in a fenced code block. Nothing checks this string
automatically, so it silently drifts if skipped. Whenever the dependency
version changes, update that line in the same commit.

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

## MCP Package Republishing

`pnpm generate:agent-surface` writes `mcp/generated/kikita-agent-data.json`. If
that file changed (`git status --short mcp/`), the `@kikita-labs/ui-mcp` package
on npm is now stale relative to the repo.

Never publish `@kikita-labs/ui-mcp` (or any package) silently, and never bury a
pending-publish decision inside a longer report. Stop and ask the user
explicitly — a standalone question, not a trailing bullet in a summary — before
bumping `mcp/package.json` or publishing. This applies every time the sync
detects drift, even if a prior sync in the same session already asked and was
told yes.

Publishing happens through `.github/workflows/publish-mcp.yml` (Trusted
Publishing / OIDC), triggered by pushing a `mcp-v*` tag — not by running
`npm publish` locally. A local publish will fail (a stale `~/.npmrc` npm token
surfaces as a misleading 404, not 401) and is not how this package is meant to
ship. After the user confirms, the flow is: bump `mcp/package.json`, commit,
push to `main`, then `git tag mcp-v<version>` and
`git push origin mcp-v<version>`.
