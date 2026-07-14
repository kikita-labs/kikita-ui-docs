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
