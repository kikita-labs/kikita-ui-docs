import type { DocsComponentManifest } from '@core/docs-registry';

export const MEDIA_VIEWER_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'media-viewer',
  label: 'Media Viewer',
  category: 'surfaces',
  description: 'Fullscreen photo lightbox with navigation, thumbnails and zoom.',
  importName: 'kuiMediaViewer',
  status: 'available',
  exampleIds: [
    'basic-media-viewer-example',
    'media-viewer-single-example',
    'media-viewer-select-example',
  ],
  loadPage: () => import('./media-viewer-page').then((module) => module.MediaViewerPage),
  loadPlayground: () =>
    import('./playground/media-viewer-playground-page').then(
      (module) => module.MediaViewerPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
