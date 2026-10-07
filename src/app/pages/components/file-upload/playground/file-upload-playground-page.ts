import { Component, signal } from '@angular/core';

import {
  KuiFileUpload,
  type KuiFileUploadMessages,
  type KuiSize,
  type KuiUploadFile,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  createPlaygroundEventLog,
  definePlaygroundControls,
  PLAYGROUND_MESSAGES_CONTROL,
  playgroundBinding,
  PlaygroundEventLogView,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { FILE_UPLOAD_API_ROWS } from '../file-upload.api-schema';
import { FILE_UPLOAD_API_DESCRIPTION } from '../file-upload.docs-content';
import { FILE_UPLOAD_PLAYGROUND_ACCEPT, FILE_UPLOAD_PLAYGROUND_MESSAGES } from './constants';

const FILE_UPLOAD_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'variant',
    label: 'variant',
    kind: 'enum',
    options: ['dropzone', 'compact'],
    defaultValue: 'dropzone',
  },
  {
    key: 'mode',
    label: 'mode',
    kind: 'enum',
    options: ['multiple', 'single'],
    defaultValue: 'multiple',
  },
  { key: 'size', label: 'size', kind: 'enum', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  {
    key: 'accept',
    label: 'accept',
    kind: 'enum',
    options: ['any', 'images', 'images and pdf'],
    defaultValue: 'any',
  },
  PLAYGROUND_MESSAGES_CONTROL,
  { key: 'maxSizeMb', label: 'maxSize in MB (0 = no limit)', kind: 'number', defaultValue: 0 },
  { key: 'maxCount', label: 'maxCount (0 = no limit)', kind: 'number', defaultValue: 0 },
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  {
    key: 'acceptLabel',
    label: 'accept label',
    kind: 'string',
    defaultValue: '',
  },
] as const);

type FileUploadPlaygroundValues = PlaygroundValues<typeof FILE_UPLOAD_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-file-upload-playground-page',
  imports: [ApiPlayground, ApiTable, KuiFileUpload, PlaygroundEventLogView],
  templateUrl: './file-upload-playground-page.html',
  styleUrl: './file-upload-playground-page.scss',
})
export class FileUploadPlaygroundPage {
  protected readonly apiDescription = FILE_UPLOAD_API_DESCRIPTION;
  protected readonly apiRows = FILE_UPLOAD_API_ROWS;
  protected readonly files = signal<readonly KuiUploadFile[]>([]);
  protected readonly eventLog = createPlaygroundEventLog();
  protected readonly playgroundControls = FILE_UPLOAD_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: FileUploadPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'variant', value: values.variant, defaultValue: 'dropzone' },
      { name: 'mode', value: values.mode, defaultValue: 'multiple' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'disabled', value: values.disabled },
      { name: 'acceptLabel', value: values.acceptLabel || null },
      playgroundBinding(
        'accept',
        values.accept === 'any'
          ? null
          : JSON.stringify(FILE_UPLOAD_PLAYGROUND_ACCEPT[values.accept]).replaceAll('"', "'"),
      ),
      playgroundBinding(
        'maxSize',
        values.maxSizeMb > 0 ? `${values.maxSizeMb} * 1024 * 1024` : null,
      ),
      playgroundBinding(
        'maxCount',
        values.maxCount > 0 && values.mode === 'multiple' ? String(values.maxCount) : null,
      ),
      playgroundBinding('messages', values.messages === 'custom' ? 'messages' : null),
    ]);

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-file-upload${attrString}
  [(files)]="files"
  (retry)="retryUpload($event)"
/>`,
      },
    ];
  };

  protected variantOf(values: FileUploadPlaygroundValues): 'dropzone' | 'compact' {
    return values.variant;
  }

  protected modeOf(values: FileUploadPlaygroundValues): 'single' | 'multiple' {
    return values.mode;
  }

  protected sizeOf(values: FileUploadPlaygroundValues): KuiSize {
    return values.size;
  }

  protected disabledOf(values: FileUploadPlaygroundValues): boolean {
    return values.disabled;
  }

  protected acceptLabelOf(values: FileUploadPlaygroundValues): string | undefined {
    return values.acceptLabel || undefined;
  }

  protected acceptOf(values: FileUploadPlaygroundValues): readonly string[] | undefined {
    return FILE_UPLOAD_PLAYGROUND_ACCEPT[values.accept];
  }

  protected maxSizeOf(values: FileUploadPlaygroundValues): number | undefined {
    return values.maxSizeMb > 0 ? values.maxSizeMb * 1024 * 1024 : undefined;
  }

  protected messagesOf(
    values: FileUploadPlaygroundValues,
  ): Partial<KuiFileUploadMessages> | undefined {
    return values.messages === 'custom' ? FILE_UPLOAD_PLAYGROUND_MESSAGES : undefined;
  }

  protected maxCountOf(values: FileUploadPlaygroundValues): number | undefined {
    return values.maxCount > 0 && values.mode === 'multiple' ? values.maxCount : undefined;
  }

  protected onFilesChange(files: readonly KuiUploadFile[]): void {
    this.files.set(files);
    this.eventLog.log('filesChange', `${files.length} file(s)`);
  }

  protected handleRetry(file: KuiUploadFile): void {
    this.eventLog.log('retry', file.name);
    this.files.update((files) =>
      files.map((entry) =>
        entry.id === file.id ? { ...entry, status: 'pending', progress: 0 } : entry,
      ),
    );
  }
}
