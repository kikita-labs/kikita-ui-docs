/**
 * Renders `public/llms/agent-manifest.json`: a generated index of every `AgentDocEntry` for the MCP
 * data bundle, drift tests, and future search/indexing.
 */
export function renderAgentManifest(entries) {
  const packageVersion = entries[0]?.packageVersion ?? null;
  const packageName = entries[0]?.packageName ?? '@kikita-labs/ui';

  const manifest = {
    name: 'Kikita UI Docs',
    packageName,
    packageVersion,
    generatedFrom: {
      docsRegistry: 'src/app/generated/docs-registry.ts',
      sourceDocs: '../kikita-ui/docs',
    },
    entries,
  };

  return `${JSON.stringify(manifest, null, 2)}\n`;
}
