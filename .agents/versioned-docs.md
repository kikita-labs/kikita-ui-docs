# Versioned Documentation

This document is the permanent contract for publishing more than one version of
the docs site on GitHub Pages. The decision record is
`.agents/decisions/0001-versioned-docs-publishing.md`.

## Model

- One documentation version per **major** version of `@kikita-labs/ui`. Never
  per minor or patch.
- The version id is `v<major of the installed @kikita-labs/ui>` (`1.8.0` ->
  `v1`). It is derived, not typed anywhere.
- Every version is a separate Angular build. Live examples compile against the
  installed package, so a version cannot be produced from another version's
  build or from Markdown.
- The **latest** version is served from the site root
  (`https://kikita-labs.github.io/kikita-ui-docs/`). Older versions are served
  from `/<version id>/` (for example `/kikita-ui-docs/v1/`).
- An archived version is built once from its own release branch and never
  rebuilt by `main`.
- Keep at most 2-3 published versions.

## Source Of Truth Files

| File                                                     | Owner       | Purpose                                                                      |
| -------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `src/app/core/site/constants/docs-site-config.json`      | each branch | Site origin, site base path, and `versionPathPrefix` of this branch.         |
| `docs-archive.json`                                      | `main`      | Archived versions: `id`, `label`, `status` (`maintained` or `unmaintained`). |
| `versions.json` (generated into the published site root) | assemble    | Runtime list read by the switcher and banner of every version.               |
| `sitemap.xml` (generated into the published site root)   | assemble    | Pages of the latest version only.                                            |

`versionPathPrefix` is `""` on the branch that publishes the latest version and
`"/<version id>"` on a release branch. `pnpm check:site-config` enforces this.
Do not hardcode the site URL, base href, or version path anywhere else; read
them through `tools/docs-site-config.mjs` (Node) or `@core/site` (Angular).

## Branches And Publishing

```text
main              latest version, base href /kikita-ui-docs/
release/1.x        v1 docs, versionPathPrefix "/v1", base href /kikita-ui-docs/v1/
release/2.x ...      same pattern (named like the library's release branches) for each older major
```

- `deploy.yml` (push to `main`): quality gate, build for the published base
  href, `check:versioned-output`, download every archived version from the
  `docs-<id>` GitHub release, `assemble:site` into `_site`, deploy.
- `archive-docs.yml` (push to `release/*.x`): quality gate, build for
  `/<id>/`, `check:versioned-output`, upload `docs-<id>.tar.gz` to the
  `docs-<id>` release (`--clobber`), then dispatch `deploy.yml` on `main`.
- Archived builds are release assets, not git history, because every build
  rewrites all hashed files and would bloat the repository.
- `actions/deploy-pages` replaces the whole site, so every archived version is
  copied into every deployment. Never deploy a partial site.
- `deploy.yml` and `archive-docs.yml` share `.github/workflows/quality-gate.yml`. Add
  new gates there, not in one workflow.

## Runbook: Release A New Major Version

Example: `@kikita-labs/ui` 2.0.0 is published and v1 becomes an archive.

1. **Before** updating the library on `main`: GitHub Actions -> "Cut docs
   release branch" -> Run workflow (`source_ref` = `main`). It creates
   `release/1.x` with `versionPathPrefix` `"/v1"` and regenerated agent surface,
   pushes it, and starts "Archive documentation version", which publishes the
   `docs-v1` release.
2. On `main`, sync the library to 2.x (see `.agents/library-sync.md`) and add
   `{ "id": "v1", "label": "v1", "status": "maintained" }` to
   `docs-archive.json`. Push. `deploy.yml` publishes v2 at the root and v1 under
   `/v1/`.
3. One-time, after the first deployment with this setup: submit
   `https://kikita-labs.github.io/kikita-ui-docs/sitemap.xml` in Google Search
   Console (optional; crawlers also discover pages by following links).

Nothing here has to be remembered:

- `watch-ui-major.yml` runs daily. When npm's `@kikita-labs/ui` major is higher
  than the one documented on `main`, it starts "Cut docs release branch" for the
  current major by itself (once) and opens a GitHub issue with the remaining
  steps, which notifies you.
- `pnpm check:site-config` (pre-push hook and
  quality gate) fails on `main` when the installed major is N and
  `docs-archive.json` has no `v<N-1>` entry, and the message says what to run. If
  the library was already updated, run the workflow with `source_ref` set to the
  last commit that still documents the old major.

The `ai-support` page and the agent surface derive their URLs and MCP package
specifier (`@latest-1` on an archived branch) from the site config, so nothing
else needs editing. `README.md`, `mcp/package.json` `homepage`, and
`mcp/README.md` keep pointing at the latest docs on purpose.

Order matters: the archive release must exist before `main` lists it. A missing
release fails the deployment loudly instead of publishing a broken link.

## Runbook: Fix An Older Version

1. Check out `release/1.x`.
2. Update `@kikita-labs/ui` to the new 1.x patch, fix the docs, run the gates.
3. Push. `archive-docs.yml` rebuilds only `/v1/` and redeploys.
4. If the fix changes behavior documented on the latest version too, apply it on
   `main` as a separate change. There is no automatic backport.

To end support, set the version's `status` to `unmaintained` in
`docs-archive.json` on `main`. The banner reads the status from `versions.json`
at runtime, so the archived build is not rebuilt.

## Decisions

- **No `/next/` channel.** Docs are built from the published npm package and
  must not describe unreleased behavior, and `@kikita-labs/ui` publishes no
  prerelease dist-tag (only `latest`; a prerelease would be a version such as
  `2.0.0-rc.1` published to npm under the `next` tag so people can try it before
  the release). There is nothing to build a `/next/` from. Revisit only if the library starts publishing `next` or release
  candidates to npm.
- **Archived versions stay published.** Pages are static and cost nothing to
  keep, links must not rot, and the 1 GB Pages limit allows dozens of 20 MB
  versions. Support ending is a status change (`unmaintained` in
  `docs-archive.json`), never a deletion. Prune the oldest archive only when the
  assembled site approaches about 500 MB.
- **Support duration is not a docs decision.** A line stays `maintained` while
  its library line receives fixes; any such fix is a push to its release branch.
- **No `robots.txt`.** It is read only at the origin root, so a file under a
  project page is ignored, and everything is crawlable by default. The sitemap
  is submitted in Search Console instead.

## Route Stability

The switcher maps the current route onto the other version by path, so the part
of the route below the version root (`/components/button`) is what must stay
stable. The version prefix is irrelevant to the page.

- Keep a page's route when it still exists in the next major. This follows
  `.agents/architecture.md`: public URLs and section anchors are compatibility
  contracts.
- A page that moves or is renamed in a new major still works for visitors: the
  switch and the banner fall back to the other version's home page. External
  links to the old path, however, break, so prefer keeping the old route
  (redirect or alias) when renaming.
- Routes are derived from the docs registry (component slugs, foundation and
  resource slugs), so changing a slug changes its route in that version.

## Runtime Behavior

- `DocsVersionsService` (`@core/versions`) loads `versions.json` from the site
  root in the browser only and validates it. An invalid or missing file leaves
  only the current build in the list.
- `VersionSwitcher` (header) is a `kuiSelect` (named "Documentation version")
  shown only when two or more versions exist. Choosing another version goes
  through `DocsVersionNavigationService`, which probes the same page there with
  a HEAD request and falls back to that version's home when the page does not
  exist. Options are not links, so middle-click and open-in-new-tab are
  intentionally unavailable there (the banner link keeps native link behavior).
- `VersionBanner` (shell) appears for any non-latest version and links to the
  same page in the latest version, with the same fallback.
- Both components are behind `@defer (on idle)` to protect the initial bundle.
- Only a plain `<a href>` crosses versions. Versions are separate apps, so a
  switch is a full page load.

## SEO

- Every prerendered page has one absolute `<link rel="canonical">` pointing at
  itself inside its own version (`DocsCanonicalLinkService` +
  `DocsCanonicalUrlService`). Not-found pages have none.
- Canonical URLs and sitemap entries use the trailing-slash form
  (`.../components/button/`). Pages are directory indexes and GitHub Pages
  redirects `/page` to `/page/`, so only the slash form answers 200 without a
  redirect; a canonical that redirects is an inconsistent signal.
- `sitemap.xml` lists only the latest version.
- Do not use `noindex` or `robots.txt` to hide archived versions. Google
  recommends canonical signals, and `robots.txt` does not hide URLs from the
  index.
- The Google Search Console ownership file `public/google<token>.html` is
  published at the site root. Never delete it: Google re-checks it, and
  `check:versioned-output` exempts it from the page checks.
- `robots.txt` is only read at the origin root. This site is a project page
  under `/kikita-ui-docs/`, so a `robots.txt` shipped here is ignored; do not
  add one. Submit the sitemap through Search Console instead.

## Agent Surface

- `tools/agent-surface/site-config.mjs` builds absolute URLs from the shared
  site config, so an archived branch links to its own `/<id>/` copy.
- Root `/llms.txt` and `/llms-full.txt` always belong to the latest version.
  Archived versions publish theirs under `/<id>/`.
- `@kikita-labs/ui-mcp` follows the library's majors: ui 2.x docs ship `ui-mcp`
  2.x as `latest`; a fix for the 1.x line ships `ui-mcp` 1.x from `release/1.x`
  under the `latest-1` dist-tag (`npx @kikita-labs/ui-mcp@latest-1`).
  `publish-mcp.yml` picks the dist-tag automatically (older major than the
  registry's `latest` -> `latest-<major>`, prerelease -> `next`) and refuses a
  tag that does not match `mcp/package.json`. npm rejects tag names beginning
  with a number or `v`, so `v1` is not usable.
- Publishing is automatic: bumping `mcp/package.json` together with the
  regenerated data and merging to `main` or `release/<major>.x` publishes it
  (see `.agents/agent-surface.md`). Never publish by hand or push tags.

## Verification

Run for any change that touches versioning, deployment, or site URLs:

```bash
pnpm check:site-config
pnpm exec ng build --base-href "$(node tools/docs-site.mjs base-href)"
pnpm check:versioned-output
pnpm check:agent-surface
```

`check:versioned-output` verifies, for every prerendered page, the expected
`<base href>`, a self-referencing canonical, that no reference escapes the base
path, and that every referenced asset or internal page exists. It also checks
that absolute URLs in `llms.txt` and `llms-full.txt` stay inside the version's
own path. A small list of demo-only links rendered inside component examples is
exempt; do not extend it for real navigation.

On Windows Git Bash, prefix commands that pass a leading-slash argument with
`MSYS_NO_PATHCONV=1`; otherwise the shell rewrites `/kikita-ui-docs/` into a
`C:/Program Files/Git/...` path.

## Forbidden

- Hardcoding the site origin, base path, or a version path outside the shared
  config.
- Building a version from another version's output, or rewriting `base href`
  after a build (it is baked into prerendered HTML).
- Deploying a site that does not contain every archived version.
- Committing archived build output to git.
- Per-minor or per-patch documentation versions.
- Publishing `@kikita-labs/ui-mcp` without the explicit owner confirmation
  required by `.agents/library-sync.md`.
