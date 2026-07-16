/**
 * Renders the bundled data file consumed by the local read-only MCP server.
 * The bundle is generated from the same entries and Markdown mirrors as
 * `llms.txt`, so MCP output cannot drift from the public agent surface.
 */
export function renderMcpData(entries, contentByMarkdownPath) {
  const packageVersion = entries[0]?.packageVersion ?? null;
  const packageName = entries[0]?.packageName ?? '@kikita-labs/ui';
  const documents = Object.fromEntries(
    entries.map((entry) => [
      entry.markdownPath,
      {
        entry,
        markdown: contentByMarkdownPath.get(entry.markdownPath) ?? '',
      },
    ]),
  );

  const resources = entries.map((entry) => ({
    uri: entryToResourceUri(entry),
    name: entry.label,
    description: entry.description,
    markdownPath: entry.markdownPath,
    mimeType: 'text/markdown',
  }));

  return `${JSON.stringify(
    {
      name: 'Kikita UI MCP Data',
      packageName,
      packageVersion,
      generatedAt: new Date(0).toISOString(),
      documents,
      entries,
      resources: [
        {
          uri: 'kikita://overview',
          name: 'Kikita UI overview',
          description: 'Package overview, installation pointers, and component index.',
          markdownPath: entries[0]?.markdownPath ?? 'public/llms/index.md',
          mimeType: 'text/markdown',
        },
        {
          uri: 'kikita://llms-full',
          name: 'Kikita UI full context',
          description: 'All public Kikita UI docs concatenated for large-context agents.',
          markdownPath: 'public/llms-full.txt',
          mimeType: 'text/plain',
        },
        ...resources,
      ],
    },
    null,
    2,
  )}\n`;
}

function entryToResourceUri(entry) {
  switch (entry.kind) {
    case 'home':
      return 'kikita://overview';
    case 'component':
      return `kikita://components/${entry.slug}`;
    case 'foundation':
      return `kikita://foundations/${entry.slug}`;
    case 'resource':
      return `kikita://resources/${entry.slug}`;
    default:
      throw new Error(`Unknown MCP entry kind: ${entry.kind}`);
  }
}
