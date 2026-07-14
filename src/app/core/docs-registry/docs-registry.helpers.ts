import type { DocsRegistry } from './docs-manifest';

export function defineDocsRegistry<const TRegistry extends DocsRegistry>(
  registry: TRegistry,
): TRegistry {
  return registry;
}

export function docsComponentPath(slug: string): string {
  return `/components/${slug}`;
}

export function docsFoundationPath(slug: string): string {
  return `/foundations/${slug}`;
}

export function docsPlaygroundPath(slug: string): string {
  return `${docsComponentPath(slug)}/playground`;
}

export function docsResourcePath(slug: string): string {
  return `/${slug}`;
}
