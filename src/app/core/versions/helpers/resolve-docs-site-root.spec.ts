import { resolveDocsSiteRoot } from './resolve-docs-site-root';

describe('resolveDocsSiteRoot', () => {
  it('keeps the base href for a build served from the site root', () => {
    expect(resolveDocsSiteRoot('/kikita-ui-docs/', 'v2')).toBe('/kikita-ui-docs/');
    expect(resolveDocsSiteRoot('/', 'v2')).toBe('/');
  });

  it('strips the version directory for an archived build', () => {
    expect(resolveDocsSiteRoot('/kikita-ui-docs/v1/', 'v1')).toBe('/kikita-ui-docs/');
    expect(resolveDocsSiteRoot('/v1/', 'v1')).toBe('/');
  });

  it('normalizes a base href without a trailing slash', () => {
    expect(resolveDocsSiteRoot('/kikita-ui-docs/v1', 'v1')).toBe('/kikita-ui-docs/');
  });
});
