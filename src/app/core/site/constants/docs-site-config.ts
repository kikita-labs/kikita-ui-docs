import { createMcpPackageSpecifier } from '../helpers';
import config from './docs-site-config.json';

/** Production origin used for absolute canonical URLs. Read by the build tools as well. */
export const DOCS_SITE_ORIGIN: string = config.siteOrigin;

/** MCP package specifier that matches the docs version this branch publishes. */
export const DOCS_MCP_PACKAGE_SPECIFIER = createMcpPackageSpecifier(config.versionPathPrefix);
