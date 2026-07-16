import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const AI_SUPPORT_MCP_TABS = [
  {
    label: 'mcp.json',
    filename: 'mcp.json',
    language: 'json',
    code: `{
  "mcpServers": {
    "kikita-ui": {
      "command": "npx",
      "args": ["-y", "@kikita-labs/ui-mcp@latest"]
    }
  }
}`,
  },
] as const satisfies readonly CodeTab[];

export const AI_SUPPORT_AGENT_TABS = [
  {
    label: 'Instruction',
    filename: 'agent-instructions.md',
    language: 'md',
    code: `Use Kikita UI docs through the kikita-ui MCP server.
Prefer package APIs and examples returned by the server.
Do not invent component inputs, outputs, CSS hooks, or imports.
If MCP is unavailable, use https://kikita-labs.github.io/kikita-ui-docs/llms.txt first, then llms-full.txt when full context is needed.`,
  },
] as const satisfies readonly CodeTab[];

export const AI_SUPPORT_DIRECT_TABS = [
  {
    label: 'llms.txt',
    filename: 'agent-context.md',
    language: 'md',
    code: `Start with:
https://kikita-labs.github.io/kikita-ui-docs/llms.txt

Use full context only when the curated index is not enough:
https://kikita-labs.github.io/kikita-ui-docs/llms-full.txt`,
  },
] as const satisfies readonly CodeTab[];
