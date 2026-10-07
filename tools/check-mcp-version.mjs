import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import { gunzipSync } from 'node:zlib';

import { readDocsVersionId } from './docs-site-config.mjs';

/**
 * Keeps `@kikita-labs/ui-mcp` releasable by version bump alone:
 * - its major follows the installed `@kikita-labs/ui` major;
 * - when the version in `mcp/package.json` is already on npm, the generated data bundle must be
 *   identical to the published one, otherwise the version has to be bumped (publishing is
 *   triggered by an unpublished version reaching `main` or a release branch).
 */
const PACKAGE_NAME = '@kikita-labs/ui-mcp';
const DATA_FILE = 'generated/kikita-agent-data.json';
const REGISTRY_URL = `https://registry.npmjs.org/${PACKAGE_NAME.replace('/', '%2F')}`;

const mcpPackage = JSON.parse(await readFile(resolve('mcp/package.json'), 'utf8'));
const uiMajor = readDocsVersionId().slice(1);
const mcpMajor = mcpPackage.version.split('.')[0];
const failures = [];

if (mcpMajor !== uiMajor) {
  failures.push(
    `mcp/package.json is ${mcpPackage.version}, but the installed @kikita-labs/ui major is ` +
      `${uiMajor}. The MCP package follows the library major: set mcp/package.json to ${uiMajor}.0.0 ` +
      `(or the next ${uiMajor}.x release).`,
  );
}

const published = await readPublishedData(mcpPackage.version);

if (published === 'unreachable') {
  console.warn('npm registry is unreachable; skipping the published-data comparison.');
} else if (published === 'unpublished') {
  console.log(`MCP ${mcpPackage.version} is not on npm yet; it will be published on merge.`);
} else {
  const local = normalizeJson(await readFile(resolve('mcp', DATA_FILE), 'utf8'));

  if (normalizeJson(published) !== local) {
    failures.push(
      `${DATA_FILE} differs from the data published in ${PACKAGE_NAME}@${mcpPackage.version}. ` +
        'Bump the version in mcp/package.json so the changed data is published.',
    );
  }
}

if (failures.length > 0) {
  console.error(`MCP version check failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`MCP version is consistent (${mcpPackage.version}, library major ${uiMajor}).`);
}

async function readPublishedData(version) {
  try {
    const packumentResponse = await fetch(REGISTRY_URL);

    if (!packumentResponse.ok) {
      return packumentResponse.status === 404 ? 'unpublished' : 'unreachable';
    }

    const packument = await packumentResponse.json();
    const tarballUrl = packument.versions?.[version]?.dist?.tarball;

    if (!tarballUrl) {
      return 'unpublished';
    }

    const tarballResponse = await fetch(tarballUrl);

    if (!tarballResponse.ok) {
      return 'unreachable';
    }

    const entry = readTarEntry(
      gunzipSync(Buffer.from(await tarballResponse.arrayBuffer())),
      `package/${DATA_FILE}`,
    );

    return entry ?? 'unreachable';
  } catch {
    return 'unreachable';
  }
}

/** Reads one file from an uncompressed tar archive. */
function readTarEntry(archive, wantedName) {
  let offset = 0;

  while (offset + 512 <= archive.length) {
    const name = archive.toString('utf8', offset, offset + 100).replace(/\0.*$/s, '');

    if (!name) {
      return null;
    }

    const size = Number.parseInt(archive.toString('ascii', offset + 124, offset + 136).trim(), 8);

    if (name === wantedName) {
      return archive.toString('utf8', offset + 512, offset + 512 + size);
    }

    offset += 512 + Math.ceil(size / 512) * 512;
  }

  return null;
}

function normalizeJson(text) {
  return JSON.stringify(JSON.parse(text));
}
