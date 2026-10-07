# ADR 0001: Publish Multiple Documentation Versions On GitHub Pages

Status: accepted (2026-10-06). MCP distribution decided 2026-10-07.

## Context

`@kikita-labs/ui` 2.0.0 is about to ship while 1.x still needs critical fixes
after that (for example 1.8.1 after 2.0.0). The docs must keep both versions
online with a version selector, and the older line must stay updatable.

Constraints that shaped the decision:

- Every version needs its own Angular build: live examples compile against the
  installed `@kikita-labs/ui`, and prerendered HTML bakes in `<base href>`.
- The site is a GitHub Pages project site (`/kikita-ui-docs/`) deployed with
  `actions/deploy-pages`, which replaces the entire site on every deployment.
- Existing public URLs (`/llms.txt`, README links, the MCP package homepage,
  absolute links inside the published MCP data) point at the site root and must
  keep describing the latest version.
- A full build is about 21 MB and rewrites all hashed files on every build.
- Pages limits: 1 GB site, 10 minute deployment timeout.

Research summary (full notes in `.local-notes/VERSIONED-DOCS-PLAN.md`): mike
(immutable per-version directories plus a root `versions.json`), Docusaurus
(version only major changes, banners for unmaintained or unreleased versions,
keep versions below 10), angular.dev (one `versions.json`, per-major sites),
pydata-sphinx-theme (switcher to the same page with a home fallback, one
persistent switcher file for all versions), Read the Docs (hidden or inactive
versions, warning banners), Google (self-referencing absolute canonical,
no `noindex` or `robots.txt` for canonicalization).

## Decision

1. Version by `@kikita-labs/ui` major. Latest at the site root, older majors at
   `/<id>/`.
2. Each older major has a `release/<major>.x` branch. Pushing it builds that
   branch for its `/<id>/` path and stores the result as the `docs-<id>`
   GitHub release asset, then redeploys.
3. `main` deploys the latest version, downloads every archived asset listed in
   `docs-archive.json`, and assembles one site containing all versions plus a
   generated root `versions.json`, `sitemap.xml`, and `404.html`.
4. Runtime UI reads `versions.json` from the site root: a header version menu
   (only with two or more versions) and a banner on non-latest versions. Both
   are deferred. Switching probes the target page and falls back to the target
   version's home.
5. Canonical links are self-referencing inside each version. The sitemap lists
   only the latest version. No `noindex`, no `robots.txt`.
6. The site origin, base path, and per-branch version prefix live in one config
   file consumed by Angular, the build tools, and CI.

## Alternatives Considered

- **`gh-pages` branch as the Pages source (mike style).** Works, but replaces the
  existing Actions deployment with its environment protection, and stores
  full builds in git history.
- **Orphan `docs-archive` branch of built HTML.** Same git bloat: every
  rebuild of an archived version rewrites all hashed files.
- **Subdomain or repository per version (angular.dev style).** Needs a custom
  domain or a second repository and splits CI and MCP publishing.
- **Rebuild all versions from tags on every deployment.** Slow, and old
  toolchains rot; immutable archived output avoids both.
- **One app switching content at runtime (GitHub Docs style).** Would need two
  library versions in one bundle.
- **Markdown snapshots (Docusaurus style).** The docs are an Angular app with
  live components, not Markdown.
- **`noindex` or `robots.txt` for archived versions.** Not recommended by
  Google, and `robots.txt` is ignored below the origin root.

## Consequences

- Updating an old version is a normal push to its release branch; nothing else
  is rebuilt.
- A deployment fails loudly when an archived release asset is missing.
- Fixes that apply to several versions must be applied on each branch by hand.
- Initial bundle grew by about 7 kB (see `.agents/progress.md`); the version
  controls themselves are deferred chunks.
- Search engines see one canonical page per URL; duplicate content across
  versions is expected and tolerated.
- Release-day order of operations is mandatory (see
  `.agents/versioned-docs.md`).

## Migration

1. Land the runtime code, shared config, tools, and workflows with an empty
   `docs-archive.json`. Behavior is unchanged: one version, no switcher.
2. On the v2 release day follow the runbook in `.agents/versioned-docs.md`.

## Rollback

- Before v2 ships: revert the change; nothing was published.
- After: set `versionPathPrefix` back and remove entries from
  `docs-archive.json`. Re-running `archive-docs.yml` on a release branch
  restores a previous archived build. Deleting a `docs-<id>` release removes
  that version at the next deployment.

## MCP Distribution

`@kikita-labs/ui-mcp` bundles the agent data of one library version, so it
follows the library's majors: `ui-mcp` 2.x for ui 2.x (`latest`), and 1.x fixes
published from `release/1.x` under the `latest-1` dist-tag. Publishing without
`--tag` moves `latest`, so `publish-mcp.yml` chooses the tag from the version and
the registry's current `latest`. npm rejects tag names that begin with a number
or `v` (`v1` is a valid semver range), hence `latest-<major>`.

## Other Decisions

- No `/next/` channel: nothing to build it from (no npm prerelease dist-tag, and
  docs must not describe unreleased behavior).
- Archived versions stay published; ending support is a status change.
- No `robots.txt` (ignored under a project page); sitemap via Search Console.
