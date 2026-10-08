import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const MEDIA_VIEWER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kuiMediaViewer()',
    type: '() => (data: KuiMediaViewerData) => Observable<void | undefined>',
    defaultValue: '-',
    description:
      'Returns the opener. Call it in an injection context (a constructor or field initializer), like kuiDialog(). The Observable completes when the lightbox closes (Close, Escape or backdrop) and carries no value.',
  },
  {
    name: 'items',
    type: 'readonly KuiMediaViewerItem[]',
    defaultValue: '-',
    description:
      'Required. Photos to browse, at least one. A single item hides the counter, Prev, Next and the thumbnail strip, leaving zoom and Close.',
  },
  {
    name: 'index',
    type: 'number | undefined',
    defaultValue: '0',
    description: 'Index to open on, clamped to the valid range.',
  },
  {
    name: 'maxZoom',
    type: 'number | undefined',
    defaultValue: '3',
    description: 'Upper zoom bound.',
  },
  {
    name: 'zoomStep',
    type: 'number | undefined',
    defaultValue: '0.5',
    description: 'Zoom increment per Zoom in or Zoom out click and per wheel event.',
  },
  {
    name: 'ariaLabel',
    type: 'string | undefined',
    defaultValue: 'mediaViewer.label message',
    description:
      'Base accessible name of the lightbox (Photo viewer). The position, photo N of total, is appended automatically.',
  },
  {
    name: 'messages',
    type: 'Partial<KuiMediaViewerMessages> | undefined',
    defaultValue: 'undefined',
    description:
      'Text overrides for this viewer: name, zoom, close, previous, next, thumbnail, position and load error texts. They win over scoped and root messages.',
  },
  {
    name: 'onIndexChange',
    type: '(index: number) => void',
    defaultValue: '-',
    description:
      'Called once on open with the clamped initial index and on every Prev, Next, thumbnail or keyboard navigation.',
  },
  {
    name: 'KuiMediaViewerItem.id',
    type: 'string | undefined',
    defaultValue: 'src',
    description:
      'Stable identifier for tracking and thumbnail keys. Pass it only when two items can share a src.',
  },
  {
    name: 'KuiMediaViewerItem.src',
    type: 'string',
    defaultValue: '-',
    description: 'Image URL. The viewer never fetches or transforms it.',
  },
  {
    name: 'KuiMediaViewerItem.alt',
    type: 'string',
    defaultValue: '-',
    description: 'Alt text. Required; pass an empty string explicitly for a decorative photo.',
  },
  {
    name: 'KuiDialogSize "fullscreen"',
    type: 'dialog size',
    defaultValue: '-',
    description:
      'The panel is a KuiDialog with the fullscreen size, which any dialog content may also request.',
  },
];
