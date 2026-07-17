# File Upload

> Controlled file picker.

- Status: available
- Route: /components/file-upload
- Package: @kikita-labs/ui@0.6.2
- Import: KuiFileUploadComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/file-upload.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-file-upload
  acceptLabel="PNG, JPG up to 10 MB"
  [accept]="['image/png', 'image/jpeg']"
  [maxSize]="10 * 1024 * 1024"
  [maxCount]="5"
  [(files)]="files"
  (retry)="onRetry($event)"
/>
```

```ts
protected readonly files = signal<KuiUploadFile[]>([]);

protected onRetry(entry: KuiUploadFile): void {
  this.startUpload(entry);
}

private startUpload(entry: KuiUploadFile): void {
  this.files.update((list) =>
    list.map((f) => (f.id === entry.id ? { ...f, status: 'uploading', progress: 0 } : f)),
  );

  // Drive `entry.file` through your own transport, updating `progress` as it
  // advances and setting `status` to 'success' or 'error' (with `errorMsg`)
  // when it settles.
}
```

A newly picked or dropped file lands in the model as `pending`; wire a
`files` effect (or watch `filesChange` via two-way binding) to notice new
`pending` entries and call `startUpload` on them the same way `onRetry` does.

## Examples

Rendered at /components/file-upload:

### basic-file-upload-example

#### basic-file-upload-example.html

```html
<div class="basic-file-upload-example">
  <kui-file-upload
    acceptLabel="PNG, JPG, or PDF up to 10 MB"
    [accept]="['image/png', 'image/jpeg', 'application/pdf']"
    [maxSize]="10 * 1024 * 1024"
    [maxCount]="3"
    [(files)]="files"
    (retry)="handleRetry($event)"
  />
</div>
```

#### basic-file-upload-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiFileUploadComponent, type KuiUploadFile } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-file-upload-example',
  imports: [KuiFileUploadComponent],
  templateUrl: './basic-file-upload-example.html',
  styleUrl: './basic-file-upload-example.scss',
})
export class BasicFileUploadExample {
  protected readonly files = signal<readonly KuiUploadFile[]>([]);

  protected handleRetry(file: KuiUploadFile): void {
    this.files.update((files) =>
      files.map((entry) =>
        entry.id === file.id ? { ...entry, status: 'pending', progress: 0 } : entry,
      ),
    );
  }
}
```

#### basic-file-upload-example.scss

```scss
.basic-file-upload-example {
  display: grid;
  min-width: 0;
  max-width: 32rem;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | 'dropzone' \| 'compact' | 'dropzone' | Renders the full drag-and-drop zone or a compact attach button. |
| mode | 'single' \| 'multiple' | 'multiple' | Controls whether a new selection replaces or appends to the file list. |
| accept | readonly string[] | undefined | Allowed MIME types. Omit it to accept any file type. |
| acceptLabel | string | undefined | Human-readable format and limit hint shown near the picker. |
| maxSize | number | undefined | Maximum file size in bytes. |
| maxCount | number | undefined | Maximum number of files in multiple mode. |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Controls row height, thumbnail scale, and trigger density. |
| disabled | boolean | false | Stops drag, click, and keyboard file-picking interactions. |
| [(files)] | readonly KuiUploadFile[] | [] | Controlled file list. Consumers own upload status and progress after picking. |
| (retry) | KuiUploadFile | - | Emits when an errored item retry action is activated. |
| KuiUploadFile.status | 'pending' \| 'uploading' \| 'success' \| 'error' | - | Per-file state written by the component initially and then by the consumer. |

## Accessibility

The visible dropzone/button controls a visually hidden native
`<input type="file">` — drag-and-drop is never the only way to select a
file. The dropzone is `role="button"` with an `aria-label` that includes
`acceptLabel` when set. Upload progress reuses `kui-progress`
(`role="progressbar"`, `aria-valuenow`) with an
`aria-label="Uploading {name}"`. The file list is wrapped in
`aria-live="polite"` so additions/removals are announced, and the
`maxCount` form error is its own `aria-live="polite"` region. The remove
button has `aria-label="Remove {name}"`.

## Playground

Available at /components/file-upload/playground.
