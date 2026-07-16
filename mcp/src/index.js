#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(resolve(__dirname, '../generated/kikita-agent-data.json'), 'utf8'),
);

const documents = new Map(Object.entries(data.documents));
const entries = data.entries;
const entriesBySlug = new Map(entries.map((entry) => [entry.slug, entry]));
const resourcesByUri = new Map(data.resources.map((resource) => [resource.uri, resource]));

let inputBuffer = Buffer.alloc(0);

process.stdin.on('data', (chunk) => {
  inputBuffer = Buffer.concat([inputBuffer, chunk]);
  readMessages();
});

process.stdin.resume();

function readMessages() {
  while (inputBuffer.length > 0) {
    const headerEnd = inputBuffer.indexOf('\r\n\r\n');

    if (headerEnd >= 0) {
      const header = inputBuffer.slice(0, headerEnd).toString('utf8');
      const lengthMatch = header.match(/content-length:\s*(\d+)/i);

      if (!lengthMatch) {
        inputBuffer = inputBuffer.slice(headerEnd + 4);
        continue;
      }

      const contentLength = Number(lengthMatch[1]);
      const messageStart = headerEnd + 4;
      const messageEnd = messageStart + contentLength;

      if (inputBuffer.length < messageEnd) return;

      const message = inputBuffer.slice(messageStart, messageEnd).toString('utf8');
      inputBuffer = inputBuffer.slice(messageEnd);
      handleRawMessage(message);
      continue;
    }

    const lineEnd = inputBuffer.indexOf('\n');

    if (lineEnd < 0) return;

    const line = inputBuffer.slice(0, lineEnd).toString('utf8').trim();
    inputBuffer = inputBuffer.slice(lineEnd + 1);

    if (line) handleRawMessage(line);
  }
}

function handleRawMessage(rawMessage) {
  try {
    const message = JSON.parse(rawMessage);
    const response = handleMessage(message);

    if (response) sendMessage(response);
  } catch (error) {
    sendMessage({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: error instanceof Error ? error.message : 'Invalid JSON-RPC message.',
      },
    });
  }
}

function handleMessage(message) {
  if (message.method?.startsWith('notifications/')) return undefined;

  try {
    return {
      jsonrpc: '2.0',
      id: message.id,
      result: dispatchMethod(message.method, message.params ?? {}),
    };
  } catch (error) {
    return {
      jsonrpc: '2.0',
      id: message.id,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'MCP request failed.',
      },
    };
  }
}

function dispatchMethod(method, params) {
  switch (method) {
    case 'initialize':
      return {
        protocolVersion: params.protocolVersion ?? '2024-11-05',
        capabilities: {
          prompts: {},
          resources: {},
          tools: {},
        },
        serverInfo: {
          name: '@kikita-labs/ui-mcp',
          version: data.packageVersion,
        },
      };
    case 'resources/list':
      return { resources: data.resources };
    case 'resources/read':
      return readResource(params.uri);
    case 'prompts/list':
      return { prompts: listPrompts() };
    case 'prompts/get':
      return getPrompt(params.name);
    case 'tools/list':
      return { tools: listTools() };
    case 'tools/call':
      return callTool(params.name, params.arguments ?? {});
    default:
      throw new Error(`Unsupported MCP method: ${method}`);
  }
}

function sendMessage(message) {
  const payload = `${JSON.stringify(message)}\n`;

  process.stdout.write(`Content-Length: ${Buffer.byteLength(payload, 'utf8')}\r\n\r\n${payload}`);
}

function readResource(uri) {
  const resource = resourcesByUri.get(uri);

  if (!resource) throw new Error(`Unknown resource URI: ${uri}`);

  const text =
    resource.markdownPath === 'public/llms-full.txt'
      ? renderFullContext()
      : (documents.get(resource.markdownPath)?.markdown ?? '');

  return {
    contents: [
      {
        uri,
        mimeType: resource.mimeType,
        text,
      },
    ],
  };
}

function listPrompts() {
  return [
    {
      name: 'kikita_component_usage',
      description: 'Use a Kikita UI component from the published package in an Angular app.',
      arguments: [{ name: 'component', description: 'Component slug or label.', required: true }],
    },
    {
      name: 'kikita_choose_component',
      description: 'Choose the right Kikita UI primitive for a product UI need.',
      arguments: [{ name: 'task', description: 'UI task or interaction need.', required: true }],
    },
    {
      name: 'kikita_accessible_form',
      description: 'Build an accessible Angular form using Kikita UI field primitives.',
      arguments: [{ name: 'fields', description: 'Fields and validation requirements.' }],
    },
    {
      name: 'kikita_review_usage',
      description: 'Review Kikita UI usage for package-safe imports and documented APIs.',
      arguments: [{ name: 'code', description: 'Code or file summary to review.' }],
    },
    {
      name: 'kikita_migration_help',
      description: 'Migrate existing markup or another UI primitive to Kikita UI.',
      arguments: [{ name: 'source', description: 'Current markup or primitive.' }],
    },
  ];
}

function getPrompt(name) {
  const prompt = listPrompts().find((candidate) => candidate.name === name);

  if (!prompt) throw new Error(`Unknown prompt: ${name}`);

  return {
    description: prompt.description,
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: [
            'Use Kikita UI documentation from this MCP server.',
            `Prompt: ${name}`,
            `Package: ${data.packageName}@${data.packageVersion}`,
            'Prefer public @kikita-labs/ui imports. Do not invent inputs, outputs, or CSS hooks.',
          ].join('\n'),
        },
      },
    ],
  };
}

function listTools() {
  return [
    {
      name: 'search_kikita_docs',
      description: 'Search Kikita UI Markdown mirrors by text, kind, and status.',
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string' },
          kind: { type: 'string', enum: ['home', 'foundation', 'component', 'resource'] },
          status: { type: 'string' },
        },
        required: ['query'],
      },
    },
    {
      name: 'list_kikita_components',
      description: 'List Kikita UI components by status or category.',
      inputSchema: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          category: { type: 'string' },
        },
      },
    },
    {
      name: 'get_kikita_component',
      description: 'Get a component manifest entry and Markdown documentation.',
      inputSchema: {
        type: 'object',
        properties: { slug: { type: 'string' } },
        required: ['slug'],
      },
    },
    {
      name: 'get_kikita_example',
      description: 'Get examples for a component, optionally narrowed to one example id.',
      inputSchema: {
        type: 'object',
        properties: {
          componentSlug: { type: 'string' },
          exampleId: { type: 'string' },
        },
        required: ['componentSlug'],
      },
    },
    {
      name: 'get_kikita_api',
      description: 'Get the API section for a documented component.',
      inputSchema: {
        type: 'object',
        properties: { componentSlug: { type: 'string' } },
        required: ['componentSlug'],
      },
    },
  ];
}

function callTool(name, args) {
  switch (name) {
    case 'search_kikita_docs':
      return toolResponse(searchDocs(args));
    case 'list_kikita_components':
      return toolResponse(listComponents(args));
    case 'get_kikita_component':
      return toolResponse(getComponent(args.slug));
    case 'get_kikita_example':
      return toolResponse(getExample(args.componentSlug, args.exampleId));
    case 'get_kikita_api':
      return toolResponse(getApi(args.componentSlug));
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function toolResponse(value) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(
          {
            package: `${data.packageName}@${data.packageVersion}`,
            ...value,
          },
          null,
          2,
        ),
      },
    ],
  };
}

function searchDocs({ query, kind, status }) {
  const normalizedQuery = query.toLowerCase();
  const matches = entries
    .filter((entry) => !kind || entry.kind === kind)
    .filter((entry) => !status || entry.status === status)
    .map((entry) => ({
      entry,
      markdown: documents.get(entry.markdownPath)?.markdown ?? '',
    }))
    .filter(({ entry, markdown }) =>
      [entry.label, entry.description, entry.slug, markdown]
        .join('\n')
        .toLowerCase()
        .includes(normalizedQuery),
    )
    .slice(0, 20)
    .map(({ entry }) => summarizeEntry(entry));

  return { matches };
}

function listComponents({ status, category }) {
  return {
    components: entries
      .filter((entry) => entry.kind === 'component')
      .filter((entry) => !status || entry.status === status)
      .filter((entry) => !category || entry.category === category)
      .map(summarizeEntry),
  };
}

function getComponent(slug) {
  const entry = getComponentEntry(slug);

  return {
    component: summarizeEntry(entry),
    markdown: documents.get(entry.markdownPath)?.markdown ?? '',
  };
}

function getExample(componentSlug, exampleId) {
  const entry = getComponentEntry(componentSlug);
  const markdown = documents.get(entry.markdownPath)?.markdown ?? '';
  const examplesMarkdown = extractSection(markdown, 'Examples');

  if (!exampleId) {
    return {
      component: summarizeEntry(entry),
      exampleIds: entry.exampleIds,
      markdown: examplesMarkdown,
    };
  }

  return {
    component: summarizeEntry(entry),
    exampleId,
    markdown: extractSubheading(examplesMarkdown, exampleId),
  };
}

function getApi(componentSlug) {
  const entry = getComponentEntry(componentSlug);
  const markdown = documents.get(entry.markdownPath)?.markdown ?? '';

  return {
    component: summarizeEntry(entry),
    markdown: extractSection(markdown, 'API'),
  };
}

function getComponentEntry(slug) {
  const entry = entriesBySlug.get(slug);

  if (!entry || entry.kind !== 'component') {
    throw new Error(`Unknown component slug: ${slug}`);
  }

  return entry;
}

function summarizeEntry(entry) {
  return {
    kind: entry.kind,
    slug: entry.slug,
    label: entry.label,
    description: entry.description,
    route: entry.route,
    markdownPath: entry.markdownPath,
    status: entry.status,
    category: entry.category,
    publicImportName: entry.publicImportName,
    exampleIds: entry.exampleIds,
    hasPlayground: entry.hasPlayground,
  };
}

function extractSection(markdown, heading) {
  const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\n([\\s\\S]*?)(?=^## |$)`, 'm');
  const match = markdown.match(pattern);

  return match?.[1]?.trim() ?? '';
}

function extractSubheading(markdown, heading) {
  const pattern = new RegExp(`^### ${escapeRegExp(heading)}\\n([\\s\\S]*?)(?=^### |$)`, 'm');
  const match = markdown.match(pattern);

  return match?.[0]?.trim() ?? '';
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderFullContext() {
  return entries
    .map((entry) => documents.get(entry.markdownPath)?.markdown ?? '')
    .filter(Boolean)
    .join('\n\n---\n\n');
}
