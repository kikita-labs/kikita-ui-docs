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
pnpm check:performance
```

## Package Sync

The installed package version is the docs source of truth:

```text
@kikita-labs/ui@0.4.6
```

When `@kikita-labs/ui` is released:

1. Update the dependency in `package.json`.
2. Run the library sync workflow.
3. Regenerate examples and agent surface.
4. Verify package-consumer, generated, agent-surface, build, and performance
   checks.
5. Publish `@kikita-labs/ui-mcp` when the agent surface changed.

See [.agents/library-sync.md](.agents/library-sync.md) and
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

The local MCP server is published from `./mcp`:

```bash
npm run publish:mcp
```

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

## Deployment

GitHub Actions deploys `main` to GitHub Pages after the full verification suite
passes. The local pre-push hook runs lint, generated checks, production build,
and performance budgets so common CI failures are caught before pushing.
