import { Component, signal } from '@angular/core';

import { KuiFileUploadComponent, type KuiSize, type KuiUploadFile } from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { FILE_UPLOAD_API_ROWS } from '../file-upload.api-schema';
import { FILE_UPLOAD_API_DESCRIPTION } from '../file-upload.docs-content';

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
  { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  {
    key: 'acceptLabel',
    label: 'accept label',
    kind: 'string',
    defaultValue: 'PNG, JPG, or PDF up to 10 MB',
  },
] as const);

type FileUploadPlaygroundValues = PlaygroundValues<typeof FILE_UPLOAD_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-file-upload-playground-page',
  imports: [ApiPlayground, ApiTable, KuiFileUploadComponent],
  templateUrl: './file-upload-playground-page.html',
  styleUrl: './file-upload-playground-page.scss',
})
export class FileUploadPlaygroundPage {
  protected readonly apiDescription = FILE_UPLOAD_API_DESCRIPTION;
  protected readonly apiRows = FILE_UPLOAD_API_ROWS;
  protected readonly files = signal<readonly KuiUploadFile[]>([]);
  protected readonly playgroundControls = FILE_UPLOAD_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: FileUploadPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'variant', value: values.variant, defaultValue: 'dropzone' },
      { name: 'mode', value: values.mode, defaultValue: 'multiple' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: 'disabled', value: values.disabled },
      { name: 'acceptLabel', value: values.acceptLabel },
      { name: '[accept]', value: "['image/png', 'image/jpeg', 'application/pdf']" },
      { name: '[maxSize]', value: '10 * 1024 * 1024' },
      { name: '[maxCount]', value: values.mode === 'multiple' ? '3' : null },
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

  protected acceptLabelOf(values: FileUploadPlaygroundValues): string {
    return values.acceptLabel;
  }

  protected maxCountOf(values: FileUploadPlaygroundValues): number | undefined {
    return values.mode === 'multiple' ? 3 : undefined;
  }

  protected handleRetry(file: KuiUploadFile): void {
    this.files.update((files) =>
      files.map((entry) =>
        entry.id === file.id ? { ...entry, status: 'pending', progress: 0 } : entry,
      ),
    );
  }
}
