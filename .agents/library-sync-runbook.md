# Library Sync Runbook

The step-by-step procedure for a sync request. The rules behind it live in
`.agents/library-sync.md`, `.agents/versioned-docs.md` and
`.agents/agent-surface.md`; this file is the order of work. It is the single
source for the procedure: skills and prompts must point here instead of copying
it.

## Trigger

Any of these means "run this runbook end to end":

- "sync", "sync with the library", "update to the new library version",
  "синхронизируй";
- a GitHub issue titled "Sync docs to @kikita-labs/ui <major>.x (new major)".

A sync request authorizes committing and pushing to the current branch once the
gates pass. Do not ask for confirmation of routine steps (dependency bump, MCP
version bump, push). Ask only when a breaking library change has no clear docs
mapping, or when a gate fails and the cause is unclear.

## 0. Preconditions

1. Read `AGENTS.md` and its Always Read list. For Angular work call
   `angularCliKikitaDocs.list_projects` first; stop and tell the user if that MCP
   server is unavailable.
2. `git status --short`: preserve unrelated changes. `git branch --show-current`:
   `main` documents the newest major, `release/<major>.x` documents an older
   major.
3. Read the installed version from `package.json` and `pnpm-lock.yaml`.

## 1. Decide what the sync is

Query npm for exact data (the explicit registry flag is required, see
`.agents/library-sync.md`):

```bash
npm view @kikita-labs/ui dist-tags.latest license --@kikita-labs:registry=https://registry.npmjs.org
npm view @kikita-labs/ui versions --json --@kikita-labs:registry=https://registry.npmjs.org
```

| Situation                                         | Action                                                  |
| ------------------------------------------------- | ------------------------------------------------------- |
| Installed equals latest                           | No-op. Report it, stop (unless an audit was asked).     |
| Latest is older than installed                    | Stop and report the mismatch.                           |
| Newer patch or minor of the same major, on `main` | Normal sync, continue with step 2.                      |
| Newer **major** while on `main`                   | Major sync, see "Major sync" below first.               |
| On `release/<major>.x`                            | Sync only versions of that major; never the next major. |

### Major sync

The previous major must be archived before `main` moves to the new one.

1. Check whether the archive exists: branch `release/<old major>.x` and the
   `docs-v<old major>` GitHub release (`gh release view docs-v<old major>`).
   `watch-ui-major.yml` normally starts it automatically within a day of the npm
   release.
2. If it is missing, run `gh workflow run cut-docs-release-branch.yml -f
source_ref=<last commit documenting the old major>` and wait until "Archive
   documentation version" succeeds on that branch (`gh run list --workflow archive-docs.yml`). If `gh` is
   unavailable, tell the user to run the "Cut docs release branch" workflow from
   the Actions tab; this is the only manual action in the whole flow.
3. Then continue with step 2 on `main`, and also add
   `{ "id": "v<old major>", "label": "v<old major>", "status": "maintained" }` to
   `docs-archive.json`, and set `mcp/package.json` to `<new major>.0.0`.

`pnpm check:site-config` fails on `main` when the archive entry is missing.

## 2. Fetch the library facts over the network

Never read a local sibling checkout. For the target version `<v>`:

- `https://raw.githubusercontent.com/kikita-labs/kikita-ui/main/CHANGELOG.md`
  (ignore sections newer than `<v>`);
- `https://raw.githubusercontent.com/kikita-labs/kikita-ui/v<v>/docs/<primitive>.md`
  for every affected primitive;
- `.../v<v>/docs/component-roadmap.md` and `.../v<v>/docs/state-coverage.md`.

Keep three states apart in notes and reports: installed behavior, newer
published behavior, and unreleased library source. Never document the last one.

## 3. Update the dependency

1. `pnpm add @kikita-labs/ui@<v> --@kikita-labs:registry=https://registry.npmjs.org`.
2. Confirm `package.json` and `pnpm-lock.yaml` both moved to `<v>`.
3. Read the updated typings in `node_modules/@kikita-labs/ui`.
4. Update the version in the README "Package Sync" code block.

## 4. Apply changelog-driven docs changes

For every published changelog entry between the old and new version decide whether
these change: component examples, API schemas, playground controls, setup and
provider guidance, foundation and smoke pages, migration notes, package-consumer
checks, docs manifests, registry and navigation data.

Update coupled surfaces together (see `.agents/component-doc-page.md`):

- page content, examples, playgrounds, API schemas, manifests;
- generated example sources: `pnpm generate:examples`;
- generated token tables: `pnpm generate:library-tables`;
- generated agent surface: `pnpm generate:agent-surface`.

Never hand-edit generated files. Keep route paths stable: a renamed or removed
page breaks the cross-version switch and external links (see
`.agents/versioned-docs.md`, "Route Stability").

## 5. Version the MCP package

If `git status --short mcp/` shows `mcp/generated/kikita-agent-data.json`
changed, bump `mcp/package.json` in the same commit: patch bump for content
changes, `<major>.0.0` when the library major changed (the MCP major always equals
the library major). Merging that commit publishes the package automatically; never
run `npm publish` or push `mcp-v*` tags. If nothing in `mcp/` changed, say the MCP
package is unaffected.

## 6. Verify

Run, using Angular CLI MCP `run_target` for configured targets, and record any
command that cannot run:

```bash
pnpm format:check
pnpm lint
pnpm test
pnpm check:boundaries
pnpm check:generated
pnpm check:inventory
pnpm check:package-consumer
pnpm check:migration-debt
pnpm check:site-config
pnpm check:mcp-version
pnpm check:agent-surface
pnpm check:library-tables
pnpm build
pnpm check:performance
pnpm test:browser
```

Also `git diff --check` and a scan that tracked files contain no Cyrillic. Visual
baselines are regenerated only through the `update-snapshots.yml` workflow on
Linux, never locally. Never report a gate as passing unless it ran.

## 7. Commit and push

1. Commit in small logical slices with concise English messages, for example
   `chore(deps): sync @kikita-labs/ui to <v>`, docs slices, and
   `chore(mcp): bump MCP package to <version>`. Mention the library changelog in
   the body. Never add AI attribution (`.agents/git-policy.md`).
2. Push the current branch. The pre-push hook runs lint, checks, tests, build and
   performance; fix failures, do not bypass the hook.
3. Watch the result with `gh run list` / `gh run view`: the deploy on `main`
   (or `archive-docs.yml` on a release branch), and `publish-mcp.yml` when `mcp/`
   changed. Confirm the published MCP version with
   `npm view @kikita-labs/ui-mcp dist-tags --json --@kikita-labs:registry=https://registry.npmjs.org`.

What happens by itself after the push: the site deploys with every archived
version, the MCP package publishes under `latest` (or `latest-<major>` on an older
release branch) and is tagged `mcp-v<version>`.

## 8. Report

Give a short report: old and new version (or no-op) with the npm evidence, the
changelog entries considered, what changed and why, verification results,
the MCP version that will be or was published, and the deployment status. Put
anything that needs the user at the top, not at the end.
