import type { DocsComponentManifest } from '@core/docs-registry';

export const FILE_UPLOAD_DOCS_MANIFEST = {
  kind: 'component',
  slug: 'file-upload',
  label: 'File Upload',
  category: 'forms',
  description: 'Controlled file picker.',
  importName: 'KuiFileUploadComponent',
  status: 'available',
  exampleIds: ['basic-file-upload-example'],
  loadPage: () => import('./file-upload-page').then((module) => module.FileUploadPage),
  loadPlayground: () =>
    import('./playground/file-upload-playground-page').then(
      (module) => module.FileUploadPlaygroundPage,
    ),
} as const satisfies DocsComponentManifest;
