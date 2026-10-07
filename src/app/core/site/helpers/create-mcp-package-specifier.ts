/**
 * Package specifier of the MCP server that matches this build. The latest docs use the `latest`
 * dist-tag; an archived major uses its `latest-<major>` maintenance tag (npm rejects tags that
 * begin with a number or `v`, so `v1` is not a valid tag name).
 */
export function createMcpPackageSpecifier(versionPathPrefix: string): string {
  const major = /^\/v(\d+)$/.exec(versionPathPrefix)?.[1];

  return `@kikita-labs/ui-mcp@${major ? `latest-${major}` : 'latest'}`;
}
