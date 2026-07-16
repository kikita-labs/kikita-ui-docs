# Kikita UI MCP

Local read-only MCP server for Kikita UI documentation.

Use it in coding agents to search Kikita UI docs, inspect component APIs, read
examples, and avoid inventing unsupported imports, inputs, outputs, or CSS hooks.

## Install

Add the server to your MCP config:

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

## What It Contains

The package bundles generated documentation data from the Kikita UI docs site:

- overview and installation docs;
- foundation docs;
- available component docs;
- component API tables;
- component example source snippets;
- prompt templates for Kikita UI usage.

The data is generated from `kikita-ui-docs`, which consumes the published
`@kikita-labs/ui` package. It does not read unpublished local library source.

## Tools

- `search_kikita_docs`
- `list_kikita_components`
- `get_kikita_component`
- `get_kikita_example`
- `get_kikita_api`

## Links

- Docs site: https://kikita-labs.github.io/kikita-ui-docs/
- Agent index: https://kikita-labs.github.io/kikita-ui-docs/llms.txt
- Full agent context: https://kikita-labs.github.io/kikita-ui-docs/llms-full.txt
