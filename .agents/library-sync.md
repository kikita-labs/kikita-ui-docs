# Library Sync Rules

The published `kikita-labs/kikita-ui` package and its GitHub repository are the
source of truth. Never depend on a local sibling checkout -- fetch what's
needed over the network.

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
3. Check the library changelog:
   - `https://raw.githubusercontent.com/kikita-labs/kikita-ui/main/CHANGELOG.md`
4. Check source documentation in the library, at the release tag matching the
   installed version (`kikita-labs/kikita-ui` tags every release
   `v<version>`):
   - `https://raw.githubusercontent.com/kikita-labs/kikita-ui/v<installed-version>/docs/<primitive>.md`
   - `https://raw.githubusercontent.com/kikita-labs/kikita-ui/v<installed-version>/docs/component-roadmap.md`
   - `https://raw.githubusercontent.com/kikita-labs/kikita-ui/v<installed-version>/docs/state-coverage.md`

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

Use `https://raw.githubusercontent.com/kikita-labs/kikita-ui/main/CHANGELOG.md`
to detect user-visible library changes. If a
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
on npm is stale relative to the repo, so the same commit must bump
`mcp/package.json` (a patch bump for content-only changes, `<major>.0.0` when the
library major changes).

Publishing is automatic: when that commit reaches `main` (or a
`release/<major>.x` branch), `.github/workflows/publish-mcp.yml` publishes the new
version with npm Trusted Publishing and tags it `mcp-v<version>`. There is no tag
to push and no `npm publish` to run; never publish locally (a stale `~/.npmrc`
token surfaces as a misleading 404, not 401).

`pnpm check:mcp-version` (quality gate) fails when the data changed without a
version bump or when the MCP major differs from the library major, so a stale
package cannot go unnoticed. State the bump and the resulting publish in the
sync report.

## Older Major Versions (Release Branches)

Each older major of `@kikita-labs/ui` is documented from its own
`release/<major>.x` branch (the same naming as the library); see `.agents/versioned-docs.md`.

- `main` always tracks the newest published major. A new major is a library
  sync on `main` plus the release-day runbook, not a normal sync.
- On `release/<major>.x` pin `@kikita-labs/ui` to that major (`1.x`). Only sync
  patch and minor releases of the same major there, and only critical fixes
  unless the owner asks for more.
- Fetch library docs from the release tag matching the version installed on
  that branch, never from `main`'s version.
- Pushing a release branch rebuilds and republishes only its own
  `/<id>/` directory. Do not run the sync flow for it on `main`.
- A change that applies to several versions is made on each branch separately.
- `@kikita-labs/ui-mcp` follows the same majors. A release-branch sync that
  changes `mcp/generated/kikita-agent-data.json` bumps the 1.x MCP version on
  that branch; `publish-mcp.yml` publishes it under `latest-<major>` so `latest`
  stays on the newest major.
