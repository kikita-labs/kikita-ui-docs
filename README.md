# Kikita UI Docs

Public documentation, examples, SSR surface, and AI-agent context for
[`@kikita-labs/ui`](https://www.npmjs.com/package/@kikita-labs/ui).

## Links

- Documentation: https://kikita-labs.github.io/kikita-ui-docs/
- AI support: https://kikita-labs.github.io/kikita-ui-docs/ai-support
- `llms.txt`: https://kikita-labs.github.io/kikita-ui-docs/llms.txt
- Full agent context: https://kikita-labs.github.io/kikita-ui-docs/llms-full.txt
- UI package: https://www.npmjs.com/package/@kikita-labs/ui
- Local MCP package: https://www.npmjs.com/package/@kikita-labs/ui-mcp
- Source library: https://github.com/kikita-labs/kikita-ui
- Sitemap (latest version): https://kikita-labs.github.io/kikita-ui-docs/sitemap.xml

## Purpose

This repository is the public consumer documentation app for Kikita UI. It
intentionally consumes the published `@kikita-labs/ui` package from npmjs
instead of importing source files from the sibling `kikita-ui` repository.

That makes the docs a real external-consumer verification surface:

- examples use the package API that users can install;
- SSR/prerendered routes expose meaningful HTML before hydration;
- generated Markdown mirrors keep agent-readable docs aligned with the site;
- `llms.txt`, `llms-full.txt`, and the MCP data bundle point agents at the same
  public package facts as humans;
- CI checks package consumption, generated examples, agent-surface drift,
  performance budgets, browser behavior, and accessibility flows.

## Local Setup

```bash
pnpm install
pnpm start
```

The dev server runs the example-source generator before Angular starts.

Useful commands:

```bash
pnpm build
pnpm lint
pnpm test
pnpm check:package-consumer
pnpm check:agent-surface
pnpm check:site-config
pnpm check:performance
```

## Package Sync

The installed package version is the docs source of truth:

```text
@kikita-labs/ui@2.0.0
```

When `@kikita-labs/ui` is released, ask an agent to "sync". Any agent follows
[.agents/library-sync-runbook.md](.agents/library-sync-runbook.md): update the
dependency, apply the changelog to docs, regenerate examples and the agent
surface, bump the MCP version when its data changed, verify, commit and push.
Deployment and the MCP release then happen automatically.

See also [.agents/library-sync.md](.agents/library-sync.md) and
[.agents/agent-surface.md](.agents/agent-surface.md).

## AI Agent Surface

Agent-facing outputs are generated from the docs registry, API schemas, examples,
and installed package metadata:

- `public/llms.txt`
- `public/llms-full.txt`
- `public/llms/**`
- `public/llms/agent-manifest.json`
- `mcp/generated/kikita-agent-data.json`

Do not hand-edit generated agent files. Update the source docs or schemas, then
run:

```bash
pnpm generate:agent-surface
pnpm check:agent-surface
```

The local MCP server is published from `./mcp`. Publishing is automatic:
regenerate the agent surface, bump `mcp/package.json` in the same commit, and
merge to `main`. `.github/workflows/publish-mcp.yml` publishes the new version to
npmjs via npm Trusted Publishing when that version is not on npm yet, and tags it
`mcp-v<version>`. Older majors are released the same way from `release/<major>.x`
branches under the `latest-<major>` dist-tag.

Users can install it with:

```json
{
  "mcpServers": {
    "kikita-ui": {
      "command": "npx",
      "args": ["-y", "@kikita-labs/ui-mcp@latest"]
    }
  }
}
```

## Documentation Workflow

Component documentation changes should update the human docs, examples,
playground controls, API schema, generated Markdown mirrors, and MCP/LLM
surface together.

Read these permanent agent instructions before large docs work:

- [Architecture](.agents/architecture.md)
- [Component docs](.agents/component-doc-page.md)
- [SSR](.agents/ssr.md)
- [Testing and quality](.agents/testing-and-quality.md)
- [Workflow](.agents/workflow.md)

## Versioned Documentation

One documentation version exists per `@kikita-labs/ui` major. The latest version
is served from the site root; older majors are served from `/<version id>/`
(for example `/v1/`) and can be switched from the header. Older versions are
built from `release/<major>.x` branches and stored as GitHub release assets, so
they can still receive critical fixes after a new major ships.

Read [.agents/versioned-docs.md](.agents/versioned-docs.md) before changing
deployment, site URLs, or release branches. The decision record is
[.agents/decisions/0001-versioned-docs-publishing.md](.agents/decisions/0001-versioned-docs-publishing.md).

## Deployment

GitHub Actions deploys `main` to GitHub Pages after the full verification suite
passes, together with every archived version. The local pre-push hook runs lint, generated checks, production build,
and performance budgets so common CI failures are caught before pushing.
