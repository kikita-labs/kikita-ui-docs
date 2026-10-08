import type { DocsFoundationManifest } from '@core/docs-registry';

export const STRUCTURAL_ICONS_DOCS_MANIFEST = {
  kind: 'foundation',
  slug: 'structural-icons',
  label: 'Structural icons',
  description:
    'The small glyphs a component draws for itself, such as the cross on a dialog or the chevron on a select, as replaceable icon data.',
  loadPage: () => import('./structural-icons-page').then((module) => module.StructuralIconsPage),
} as const satisfies DocsFoundationManifest;
