/**
 * Renders one `AgentDocEntry` (see `agent-doc-entry.ts`) into its Markdown mirror, following the
 * structure and rules in `.agents/agent-surface.md` ("Markdown Mirror Rules"): title, route,
 * package version, status, import, source doc link, then Install/Usage/Examples/API/
 * Accessibility/Playground sections for components.
 *
 * Usage and Accessibility prose comes from the sibling library's authored
 * `../kikita-ui/docs/<slug>.md` (via `parse-markdown-sections.mjs`) when available, never from
 * scraping this app's Angular templates. API rows come from the local `.api-schema.ts` module (via
 * `parse-api-schema.mjs`), which is this repo's own verified source of truth for public API facts.
 */

const SITE_ROUTE_NOTE =
  'Rendered documentation, interactive examples, and the playground live at the HTML route above.';

export function renderAgentMarkdown(entry, context = {}) {
  switch (entry.kind) {
    case 'home':
      return renderHome(entry, context.allEntries ?? []);
    case 'foundation':
      return renderFoundation(entry);
    case 'component':
      return renderComponent(entry, context);
    case 'resource':
      return renderResource(entry);
    default:
      throw new Error(`Unknown agent doc kind: ${entry.kind}`);
  }
}

function renderMetaList(entry) {
  const lines = [
    `- Status: ${entry.status}`,
    `- Route: ${entry.route}`,
    `- Package: ${entry.packageName}@${entry.packageVersion}`,
  ];

  if (entry.publicImportName) {
    lines.push(`- Import: ${entry.publicImportName} from ${entry.packageName}`);
  }

  if (entry.sourceDocPath) {
    lines.push(`- Source docs: ${entry.sourceDocPath}`);
  }

  return lines.join('\n');
}

function renderHome(entry, allEntries) {
  const foundations = allEntries.filter((candidate) => candidate.kind === 'foundation');
  const components = allEntries.filter((candidate) => candidate.kind === 'component');
  const resources = allEntries.filter((candidate) => candidate.kind === 'resource');

  return [
    `# ${entry.label}`,
    '',
    `> ${entry.description}`,
    '',
    renderMetaList(entry),
    '',
    '## Foundations',
    '',
    ...foundations.map(
      (foundation) =>
        `- [${foundation.label}](${foundation.markdownPath}): ${foundation.description}`,
    ),
    '',
    '## Components',
    '',
    ...components.map(
      (component) => `- [${component.label}](${component.markdownPath}): ${component.description}`,
    ),
    '',
    '## Resources',
    '',
    ...resources.map(
      (resource) => `- [${resource.label}](${resource.markdownPath}): ${resource.description}`,
    ),
    '',
  ].join('\n');
}

function renderFoundation(entry) {
  return [
    `# ${entry.label}`,
    '',
    `> ${entry.description}`,
    '',
    renderMetaList(entry),
    '',
    '## Content',
    '',
    SITE_ROUTE_NOTE,
    '',
  ].join('\n');
}

function renderResource(entry) {
  return [
    `# ${entry.label}`,
    '',
    `> ${entry.description}`,
    '',
    renderMetaList(entry),
    '',
    '## Content',
    '',
    SITE_ROUTE_NOTE,
    '',
  ].join('\n');
}

function renderComponent(entry, context) {
  const sourceSections = context.sourceDocSections ?? new Map();
  const apiRows = context.apiRows ?? [];

  return [
    `# ${entry.label}`,
    '',
    `> ${entry.description}`,
    '',
    renderMetaList(entry),
    '',
    '## Install',
    '',
    '```bash',
    `pnpm add ${entry.packageName}`,
    `ng add ${entry.packageName}`,
    '```',
    '',
    '## Usage',
    '',
    sourceSections.get('Usage') ?? sourceSections.get('Basic Usage') ?? SITE_ROUTE_NOTE,
    '',
    '## Examples',
    '',
    renderExamplesSection(entry),
    '',
    '## API',
    '',
    renderApiTable(apiRows),
    '',
    '## Accessibility',
    '',
    sourceSections.get('Accessibility') ?? SITE_ROUTE_NOTE,
    '',
    '## Playground',
    '',
    entry.hasPlayground
      ? `Available at ${entry.route}/playground.`
      : 'No playground for this component.',
    '',
  ].join('\n');
}

function renderExamplesSection(entry) {
  if (entry.exampleIds.length === 0) {
    return 'No rendered examples yet.';
  }

  const lines = entry.exampleIds.map((exampleId) => `- \`${exampleId}\``);

  return [`Rendered at ${entry.route}:`, '', ...lines].join('\n');
}

function renderApiTable(apiRows) {
  if (apiRows.length === 0) {
    return 'No API schema recorded yet.';
  }

  const header = '| Name | Type | Default | Description |';
  const divider = '| --- | --- | --- | --- |';
  const rows = apiRows.map(
    (row) =>
      `| ${escapeCell(row.name)} | ${escapeCell(row.type)} | ${escapeCell(row.defaultValue)} | ${escapeCell(row.description)} |`,
  );

  return [header, divider, ...rows].join('\n');
}

function escapeCell(value) {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}
