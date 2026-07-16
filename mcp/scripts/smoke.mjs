import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mcpRoot = resolve(__dirname, '..');
const server = spawn(process.execPath, [resolve(mcpRoot, 'src/index.js')], {
  cwd: mcpRoot,
  stdio: ['pipe', 'pipe', 'inherit'],
});

let buffer = Buffer.alloc(0);
const pending = new Map();

server.stdout.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  readResponses();
});

const initialize = await request('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'kikita-ui-mcp-smoke', version: '0.0.0' },
});
const tools = await request('tools/list');
const resources = await request('resources/list');
const component = await request('tools/call', {
  name: 'get_kikita_component',
  arguments: { slug: 'button' },
});

if (!initialize.serverInfo?.name) throw new Error('Missing serverInfo.');
if (!tools.tools?.some((tool) => tool.name === 'get_kikita_component')) {
  throw new Error('Missing get_kikita_component tool.');
}
if (!resources.resources?.some((resource) => resource.uri === 'kikita://components/button')) {
  throw new Error('Missing button resource.');
}
if (!component.content?.[0]?.text?.includes('"slug": "button"')) {
  throw new Error('Button tool did not return button data.');
}

server.kill();
await once(server, 'exit');
console.log('Kikita UI MCP smoke passed.');

function request(method, params = {}) {
  const id = pending.size + 1;
  const payload = `${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`;

  server.stdin.write(`Content-Length: ${Buffer.byteLength(payload, 'utf8')}\r\n\r\n${payload}`);

  return new Promise((resolveResponse, rejectResponse) => {
    pending.set(id, { reject: rejectResponse, resolve: resolveResponse });
  });
}

function readResponses() {
  while (buffer.length > 0) {
    const headerEnd = buffer.indexOf('\r\n\r\n');

    if (headerEnd < 0) return;

    const header = buffer.slice(0, headerEnd).toString('utf8');
    const lengthMatch = header.match(/content-length:\s*(\d+)/i);

    if (!lengthMatch) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }

    const contentLength = Number(lengthMatch[1]);
    const messageStart = headerEnd + 4;
    const messageEnd = messageStart + contentLength;

    if (buffer.length < messageEnd) return;

    const message = JSON.parse(buffer.slice(messageStart, messageEnd).toString('utf8'));
    buffer = buffer.slice(messageEnd);

    const waiter = pending.get(message.id);
    pending.delete(message.id);

    if (!waiter) continue;
    if (message.error) {
      waiter.reject(new Error(message.error.message));
    } else {
      waiter.resolve(message.result);
    }
  }
}
