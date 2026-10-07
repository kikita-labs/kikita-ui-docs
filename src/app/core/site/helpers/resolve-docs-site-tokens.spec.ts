import { resolveDocsSiteTokens } from './resolve-docs-site-tokens';

describe('resolveDocsSiteTokens', () => {
  const values = { siteUrl: 'https://x.test/docs/v1', mcpPackage: '@kikita-labs/ui-mcp@latest-1' };

  it('replaces every occurrence of both tokens', () => {
    expect(
      resolveDocsSiteTokens(
        '{{siteUrl}}/llms.txt and {{siteUrl}}/llms-full.txt via {{mcpPackage}}',
        values,
      ),
    ).toBe(
      'https://x.test/docs/v1/llms.txt and https://x.test/docs/v1/llms-full.txt via @kikita-labs/ui-mcp@latest-1',
    );
  });

  it('leaves text without tokens unchanged', () => {
    expect(resolveDocsSiteTokens('plain text', values)).toBe('plain text');
  });
});
