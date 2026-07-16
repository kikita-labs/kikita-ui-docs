# Agent Surface Maintenance

This document defines the permanent maintenance contract for making Kikita UI
Docs useful to AI agents without making the human documentation worse.

## Scope

The agent surface includes:

- server-rendered or prerendered HTML for public docs routes;
- `/llms.txt` at the site root;
- `/llms-full.txt` at the site root;
- Markdown mirrors for every public docs page;
- a generated manifest that maps docs routes, package imports, examples, API
  schemas, source docs, and Markdown URLs;
- the Kikita UI MCP server package and its generated data bundle;
- tests and drift checks that keep these surfaces aligned with the typed docs
  registry and the installed `@kikita-labs/ui` package.

These surfaces are derived outputs unless a file explicitly says otherwise.
Do not hand-edit generated agent files.

## Sources Of Truth

Use these sources in this order:

1. Installed `@kikita-labs/ui` package version from `package.json` and
   `pnpm-lock.yaml`.
2. Public package typings from `node_modules/@kikita-labs/ui`.
3. Docs manifests under `src/app/pages/**/**/*.docs-manifest.ts`.
4. API schemas under `src/app/pages/components/**/**/*.api-schema.ts`.
5. Real example files under `examples/` and generated example source modules.
6. Sibling library docs under `../kikita-ui/docs/*.md`.
7. Sibling library release notes and status files.

Never publish unreleased sibling library behavior as available. If the sibling
source has newer APIs than the installed package, mark the agent-surface update
blocked until the package dependency is updated.

## Required Updates

Whenever a docs page, component manifest, API schema, example, package version,
or source library documentation changes, update or regenerate:

- the page's Markdown mirror;
- the page entry in the agent manifest;
- `/llms.txt` when the page is important enough to be a curated entry;
- `/llms-full.txt` when public docs content changed;
- MCP resource output for the affected page or component;
- MCP prompt/tool behavior when public agent workflows changed;
- related tests and drift checks.

For component documentation work, the component page is not done until the agent
surface reflects the same facts.

## llms.txt Rules

`/llms.txt` is a curated Markdown index for agents. It must:

- live at the deployed site root;
- start with exactly one H1 naming Kikita UI;
- include a short blockquote summary;
- link to the most important Markdown docs and MCP installation instructions;
- keep optional or verbose links under an `## Optional` section;
- avoid secrets, internal-only paths, unpublished APIs, and generated noise;
- stay concise enough for quick model ingestion.

`/llms-full.txt` is the larger bundled context file. It may include all public
Markdown docs, but it must clearly separate pages and include route/source
metadata so agents can cite the original docs page.

## Markdown Mirror Rules

Every public route that documents package usage should have a Markdown mirror.
The mirror must be deterministic and generated from structured docs facts, not
from scraping browser-rendered text.

Each component mirror should include:

- title, route, package version, status, category, public import, and source
  library doc path;
- installation prerequisites when needed;
- import statement;
- smallest correct usage;
- rendered example source references;
- API table content;
- playground availability and important controls;
- accessibility notes;
- migration or package-version notes;
- links back to the HTML route and sibling source docs.

Draft pages may appear in the manifest but must be clearly marked as draft and
must not be advertised as complete documentation.

## MCP Rules

The first Kikita UI MCP server should be a local stdio server runnable through
`npx`. It should expose documentation context, prompts, and low-risk tools. Do
not require users to clone either repository just to consume docs context.

Required MCP resources:

- overview of the package and docs site;
- install and theming guides;
- one resource per available component;
- one resource per foundation page;
- API schema resources;
- example source resources;
- changelog and status resources;
- a compact generated index.

Required MCP prompts:

- implement a Kikita UI component in an Angular app;
- choose the right primitive;
- migrate from native markup or another UI primitive;
- review Kikita UI usage in a project;
- build an accessible form with Kikita UI.

Tools must remain read-only at first. Any future write tool must require a
separate plan, explicit user confirmation, clear input schemas, and tests.

Publish the local MCP package from this docs repo through the root script:

```bash
npm run publish:mcp
```

The script regenerates the agent surface, runs the MCP smoke check, and publishes
`./mcp` to npmjs with an explicit `@kikita-labs` registry override. Use this dry
run before changing MCP packaging:

```bash
npm run publish:mcp -- --dry-run
```

## SSR Safety

Agent-surface work must not introduce browser globals outside platform adapters.
SSR and prerender output must render meaningful docs content before client
JavaScript runs. Interactive examples may hydrate later, but headings, prose,
imports, API rows, and code snippets must be present in the HTML response.

Use Angular server-side and hybrid rendering through the official Angular SSR
APIs. Route-level rendering choices must be documented in the implementation
plan and verified with built HTML, not assumed from a green client build.

## Verification

Agent-surface changes must run or explicitly record the blocker for:

- `pnpm check:generated`;
- the agent-surface drift check;
- Angular build through Angular CLI MCP when applicable;
- SSR/prerender smoke that verifies important docs content exists in generated
  HTML before hydration;
- MCP inspector or protocol smoke for resources, prompts, and tools;
- `git diff --check`;
- English-only tracked file check.

Do not claim that a route, Markdown mirror, or MCP resource is current unless
the generator and drift checks passed.
