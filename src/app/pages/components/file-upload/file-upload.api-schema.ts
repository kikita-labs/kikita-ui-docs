import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const FILE_UPLOAD_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'variant',
    type: `'dropzone' | 'compact'`,
    defaultValue: `'dropzone'`,
    description: 'Renders the full drag-and-drop zone or a compact attach button.',
  },
  {
    name: 'mode',
    type: `'single' | 'multiple'`,
    defaultValue: `'multiple'`,
    description: 'Controls whether a new selection replaces or appends to the file list.',
  },
  {
    name: 'accept',
    type: 'readonly string[]',
    defaultValue: 'undefined',
    description: 'Allowed MIME types. Omit it to accept any file type.',
  },
  {
    name: 'acceptLabel',
    type: 'string',
    defaultValue: 'undefined',
    description: 'Human-readable format and limit hint shown near the picker.',
  },
  {
    name: 'maxSize',
    type: 'number',
    defaultValue: 'undefined',
    description: 'Maximum file size in bytes.',
  },
  {
    name: 'maxCount',
    type: 'number',
    defaultValue: 'undefined',
    description: 'Maximum number of files in multiple mode.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Controls row height, thumbnail scale, and trigger density.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Stops drag, click, and keyboard file-picking interactions.',
  },
  {
    name: '[(files)]',
    type: 'readonly KuiUploadFile[]',
    defaultValue: '[]',
    description: 'Controlled file list. Consumers own upload status and progress after picking.',
  },
  {
    name: '(retry)',
    type: 'KuiUploadFile',
    defaultValue: '-',
    description: 'Emits when an errored item retry action is activated.',
  },
  {
    name: 'KuiUploadFile.status',
    type: `'pending' | 'uploading' | 'success' | 'error'`,
    defaultValue: '-',
    description: 'Per-file state written by the component initially and then by the consumer.',
  },
];
