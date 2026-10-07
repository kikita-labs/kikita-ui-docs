import { createDocsVersionId } from './create-docs-version-id';

describe('createDocsVersionId', () => {
  it('uses the package major version', () => {
    expect(createDocsVersionId('1.8.0')).toBe('v1');
    expect(createDocsVersionId('2.0.0-rc.1')).toBe('v2');
  });
});
