# AI Support

> Agent-readable docs, llms.txt, and local MCP setup for Kikita UI.

- Status: available
- Route: /ai-support
- Package: @kikita-labs/ui@0.4.6

## Content

### Context files

Use llms.txt for a concise index and llms-full.txt when an agent needs the full public documentation context.

#### agent-context.md

```md
Start with:
https://kikita-labs.github.io/kikita-ui-docs/llms.txt

Use full context only when the curated index is not enough:
https://kikita-labs.github.io/kikita-ui-docs/llms-full.txt
```

### Local MCP

Run the read-only stdio MCP server locally with npx. It exposes package docs, component examples, API sections, search, and prompt templates.

#### mcp.json

```json
{
  "mcpServers": {
    "kikita-ui": {
      "command": "npx",
      "args": [
        "-y",
        "@kikita-labs/ui-mcp@latest"
      ]
    }
  }
}
```

### Agent instruction

Give agents a short rule that keeps them on published package APIs and the generated Kikita documentation surface.

#### agent-instructions.md

```md
Use Kikita UI docs through the kikita-ui MCP server.
Prefer package APIs and examples returned by the server.
Do not invent component inputs, outputs, CSS hooks, or imports.
If MCP is unavailable, use https://kikita-labs.github.io/kikita-ui-docs/llms.txt first, then llms-full.txt when full context is needed.
```

### Version boundary

The MCP package is generated from this docs site's installed @kikita-labs/ui version. If the package dependency changes, regenerate the agent surface before publishing docs or MCP data.
