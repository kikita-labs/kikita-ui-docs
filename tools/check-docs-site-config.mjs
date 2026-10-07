import process from 'node:process';

import {
  readDocsArchive,
  readDocsSiteConfig,
  readDocsVersionId,
  resolveBaseHref,
} from './docs-site-config.mjs';

const STATUSES = new Set(['maintained', 'unmaintained']);
const config = readDocsSiteConfig();
const versionId = readDocsVersionId();
const archived = readDocsArchive();
const failures = [];

if (!/^https:\/\/[^/]+$/.test(config.siteOrigin)) {
  failures.push(`siteOrigin must be an https origin without a path: ${config.siteOrigin}`);
}

if (!/^\/[^/]+$/.test(config.siteBasePath)) {
  failures.push(
    `siteBasePath must be one path segment like /kikita-ui-docs: ${config.siteBasePath}`,
  );
}

if (config.versionPathPrefix !== '' && config.versionPathPrefix !== `/${versionId}`) {
  failures.push(
    `versionPathPrefix must be empty (latest at the site root) or /${versionId} ` +
      `(archived release branch), received "${config.versionPathPrefix}".`,
  );
}

const seen = new Set();

for (const entry of archived) {
  if (!/^v\d+$/.test(entry.id) || seen.has(entry.id)) {
    failures.push(`docs-archive.json has an invalid or duplicate id: ${entry.id}`);
  }

  seen.add(entry.id);

  if (!STATUSES.has(entry.status)) {
    failures.push(`docs-archive.json entry ${entry.id} has an invalid status: ${entry.status}`);
  }

  if (entry.id === versionId) {
    failures.push(
      `docs-archive.json must not archive the version this branch builds (${entry.id}).`,
    );
  }
}

// The branch that publishes the latest docs must not drop the previous major: when the library
// moves to a new major, the old docs have to be cut into a release branch and archived first.
const previousMajor = Number(versionId.slice(1)) - 1;

if (config.versionPathPrefix === '' && previousMajor >= 1 && !seen.has(`v${previousMajor}`)) {
  failures.push(
    `The installed @kikita-labs/ui is ${versionId}, but docs-archive.json has no v${previousMajor} ` +
      `entry. Run the "Cut docs release branch" workflow for v${previousMajor} (source_ref = the ` +
      `last commit that documents v${previousMajor}), wait for "Archive documentation version" ` +
      `to publish the docs-v${previousMajor} release, then add ` +
      `{ "id": "v${previousMajor}", "label": "v${previousMajor}", "status": "maintained" } to ` +
      `docs-archive.json. See .agents/versioned-docs.md.`,
  );
}

if (failures.length > 0) {
  console.error(`Docs site config check failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(
    `Docs site config is valid (${versionId}, base href ${resolveBaseHref(config)}, ` +
      `${archived.length} archived).`,
  );
}
