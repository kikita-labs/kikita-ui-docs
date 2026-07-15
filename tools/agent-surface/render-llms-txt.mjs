import { markdownPathToUrl, toSiteUrl } from './site-config.mjs';

const IMPORTANT_NOTES = [
  'Use @kikita-labs/ui public package imports only.',
  'Documentation is versioned to the installed package shown on each page.',
  'Do not use sibling repository source APIs unless they are released.',
];

const START_HERE_SLUGS = ['installation', 'theming'];

/** Renders the curated `llms.txt` index per https://llmstxt.org's format. */
export function renderLlmsTxt(entries) {
  const home = entries.find((entry) => entry.kind === 'home');
  const foundations = entries.filter((entry) => entry.kind === 'foundation');
  const components = entries.filter((entry) => entry.kind === 'component');
  const startHere = foundations.filter((entry) => START_HERE_SLUGS.includes(entry.slug));
  const otherFoundations = foundations.filter((entry) => !START_HERE_SLUGS.includes(entry.slug));

  return [
    '# Kikita UI',
    '',
    `> ${home.description}`,
    '',
    'Important notes:',
    ...IMPORTANT_NOTES.map((note) => `- ${note}`),
    '',
    '## Start Here',
    '',
    ...startHere.map((entry) => renderLink(entry)),
    `- [Components overview](${markdownPathToUrl(home.markdownPath)}): Every available component with a link to its Markdown mirror.`,
    '',
    '## Foundations',
    '',
    ...otherFoundations.map((entry) => renderLink(entry)),
    '',
    '## Components',
    '',
    ...components.map((entry) => renderLink(entry)),
    '',
    '## Optional',
    '',
    `- [Full context](${toSiteUrl('/llms-full.txt')}): Every public doc page concatenated with route/source metadata.`,
    '',
  ].join('\n');
}

/** Renders `llms-full.txt`: every page's Markdown, in the same order as `llms.txt`, separated. */
export function renderLlmsFullTxt(entries, contentByMarkdownPath) {
  const sections = entries.map((entry) => {
    const content = contentByMarkdownPath.get(entry.markdownPath) ?? '';

    return [
      '---',
      '',
      `<!-- route: ${entry.route} -->`,
      `<!-- markdown: ${markdownPathToUrl(entry.markdownPath)} -->`,
      entry.sourceDocPath ? `<!-- source: ${entry.sourceDocPath} -->` : null,
      `<!-- package: ${entry.packageName}@${entry.packageVersion} -->`,
      '',
      content.trim(),
      '',
    ]
      .filter((line) => line !== null)
      .join('\n');
  });

  return [
    '# Kikita UI -- Full Context',
    '',
    'Every public docs page for the installed @kikita-labs/ui package, concatenated for large-context',
    'agent ingestion. Prefer llms.txt for a curated index; use this file when you need everything.',
    '',
    ...sections,
  ].join('\n');
}

function renderLink(entry) {
  return `- [${entry.label}](${markdownPathToUrl(entry.markdownPath)}): ${entry.description}`;
}
