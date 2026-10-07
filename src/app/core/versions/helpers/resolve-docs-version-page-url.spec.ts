import type { DocsVersion } from '../interfaces';
import { resolveDocsVersionPageUrl } from './resolve-docs-version-page-url';

const ARCHIVED: DocsVersion = {
  id: 'v1',
  label: 'v1',
  path: '/kikita-ui-docs/v1/',
  status: 'maintained',
};

describe('resolveDocsVersionPageUrl', () => {
  it('maps the current page onto the target version', () => {
    expect(resolveDocsVersionPageUrl(ARCHIVED, '/components/button')).toBe(
      '/kikita-ui-docs/v1/components/button',
    );
  });

  it('maps the home page onto the version root', () => {
    expect(resolveDocsVersionPageUrl(ARCHIVED, '/')).toBe('/kikita-ui-docs/v1/');
  });
});
