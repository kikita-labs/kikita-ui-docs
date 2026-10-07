import { createDocsCanonicalUrl } from './create-docs-canonical-url';

describe('createDocsCanonicalUrl', () => {
  const origin = 'https://example.github.io';

  it('builds the absolute URL of a page under the base href', () => {
    expect(createDocsCanonicalUrl(origin, '/docs/', '/components/button')).toBe(
      'https://example.github.io/docs/components/button/',
    );
  });

  it('uses the version directory for an archived build', () => {
    expect(createDocsCanonicalUrl(origin, '/docs/v1/', '/components/button')).toBe(
      'https://example.github.io/docs/v1/components/button/',
    );
  });

  it('maps the home page onto the base href', () => {
    expect(createDocsCanonicalUrl(origin, '/docs/', '/')).toBe('https://example.github.io/docs/');
  });
});
