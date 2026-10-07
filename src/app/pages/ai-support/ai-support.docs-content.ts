import type { CodeTab } from '@shared/docs-ui/code-tabs';

/**
 * `{{siteUrl}}` and `{{mcpPackage}}` are resolved per documentation version: by the page at
 * runtime (`resolveDocsSiteTokens`) and by the agent-surface generator, so an archived
 * version links to its own copy and its own MCP release line.
 */

export const AI_SUPPORT_MCP_TABS = [
  {
    label: 'mcp.json',
    filename: 'mcp.json',
    language: 'json',
    code: `{
  "mcpServers": {
    "kikita-ui": {
      "command": "npx",
      "args": ["-y", "{{mcpPackage}}"]
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
If MCP is unavailable, use {{siteUrl}}/llms.txt first, then llms-full.txt when full context is needed.`,
  },
] as const satisfies readonly CodeTab[];

export const AI_SUPPORT_DIRECT_TABS = [
  {
    label: 'llms.txt',
    filename: 'agent-context.md',
    language: 'md',
    code: `Start with:
{{siteUrl}}/llms.txt

Use full context only when the curated index is not enough:
{{siteUrl}}/llms-full.txt`,
  },
] as const satisfies readonly CodeTab[];
