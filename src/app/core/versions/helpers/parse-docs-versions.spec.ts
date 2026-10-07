import { parseDocsVersions } from './parse-docs-versions';

const LATEST = { id: 'v2', label: 'v2', path: '/kikita-ui-docs/', status: 'latest' };
const ARCHIVED = { id: 'v1', label: 'v1', path: '/kikita-ui-docs/v1/', status: 'maintained' };

describe('parseDocsVersions', () => {
  it('accepts a valid list with exactly one latest version', () => {
    expect(parseDocsVersions([LATEST, ARCHIVED])).toEqual([LATEST, ARCHIVED]);
  });

  it.each([
    ['a non-array', { versions: [] }],
    ['an empty list', []],
    ['no latest version', [ARCHIVED]],
    ['two latest versions', [LATEST, { ...ARCHIVED, status: 'latest' }]],
    ['an unknown status', [LATEST, { ...ARCHIVED, status: 'beta' }]],
    ['a missing label', [LATEST, { ...ARCHIVED, label: '' }]],
    ['an external url', [LATEST, { ...ARCHIVED, path: 'https://example.com/v1/' }]],
    ['a protocol-relative url', [LATEST, { ...ARCHIVED, path: '//example.com/v1/' }]],
    ['a path without a trailing slash', [LATEST, { ...ARCHIVED, path: '/kikita-ui-docs/v1' }]],
    ['a non-object entry', [LATEST, 'v1']],
  ])('rejects %s', (_name, value) => {
    expect(parseDocsVersions(value)).toBeNull();
  });
});
