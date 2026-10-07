import { createMcpPackageSpecifier } from './create-mcp-package-specifier';

describe('createMcpPackageSpecifier', () => {
  it('uses the latest dist-tag for the docs published at the site root', () => {
    expect(createMcpPackageSpecifier('')).toBe('@kikita-labs/ui-mcp@latest');
  });

  it('uses the maintenance dist-tag of an archived major', () => {
    expect(createMcpPackageSpecifier('/v1')).toBe('@kikita-labs/ui-mcp@latest-1');
    expect(createMcpPackageSpecifier('/v12')).toBe('@kikita-labs/ui-mcp@latest-12');
  });
});
