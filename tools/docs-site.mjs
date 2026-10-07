import process from 'node:process';

import {
  readDocsArchive,
  readDocsSiteConfig,
  readDocsVersionId,
  resolveBaseHref,
  resolveSiteBaseUrl,
  writeVersionPathPrefix,
} from './docs-site-config.mjs';

const COMMANDS = {
  'base-href': () => resolveBaseHref(),
  'site-url': () => resolveSiteBaseUrl(),
  'version-id': () => readDocsVersionId(),
  'archived-ids': () =>
    readDocsArchive()
      .map((entry) => entry.id)
      .join('\n'),
  'path-prefix': () => readDocsSiteConfig().versionPathPrefix,
  'set-version-prefix': () => {
    writeVersionPathPrefix(`/${readDocsVersionId()}`);
  },
};

const handler = COMMANDS[process.argv[2]];

if (!handler) {
  console.error(`Usage: node tools/docs-site.mjs <${Object.keys(COMMANDS).join('|')}>`);
  process.exitCode = 1;
} else {
  const output = handler();

  if (output) {
    console.log(output);
  }
}
