import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve } from 'node:path';

const root = resolve('dist/kikita-ui-docs/browser');
const port = Number.parseInt(process.env['PORT'] ?? '4173', 10);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
]);

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host ?? '127.0.0.1'}`);
    const pathname = decodeURIComponent(url.pathname);
    const requestedPath = resolve(root, `.${pathname}`);

    if (
      requestedPath !== root &&
      !requestedPath.startsWith(`${root}\\`) &&
      !requestedPath.startsWith(`${root}/`)
    ) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const filePath = await resolveFile(requestedPath);
    const body = await readFile(filePath);
    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes.get(extname(filePath)) ?? 'application/octet-stream',
    });
    response.end(body);
  } catch {
    response.writeHead(500).end('Unable to serve the production build. Run pnpm build first.');
  }
});

server.listen(port, '127.0.0.1');

process.once('SIGINT', closeServer);
process.once('SIGTERM', closeServer);

async function resolveFile(requestedPath) {
  try {
    const details = await stat(requestedPath);

    if (details.isFile()) {
      return requestedPath;
    }

    if (details.isDirectory()) {
      const indexPath = resolve(requestedPath, 'index.html');
      await stat(indexPath);
      return indexPath;
    }
  } catch {
    // Angular client routes fall through to the application entry point.
  }

  return resolve(root, 'index.html');
}

function closeServer() {
  server.close(() => process.exit(0));
}
