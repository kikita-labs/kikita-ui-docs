import { Component, signal } from '@angular/core';

import { KuiCheckbox, kuiMediaViewer, type KuiMediaViewerItem } from '@kikita-labs/ui';

function photoSource(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${color}"/><text x="600" y="420" font-size="96" text-anchor="middle" fill="white" font-family="sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

@Component({
  selector: 'app-media-viewer-select-example',
  imports: [KuiCheckbox],
  templateUrl: './media-viewer-select-example.html',
  styleUrl: './media-viewer-select-example.scss',
})
export class MediaViewerSelectExample {
  protected readonly photos: readonly KuiMediaViewerItem[] = [
    { id: 'p1', src: photoSource('Sunset', '#f59e0b'), alt: 'Sunset over the bay' },
    { id: 'p2', src: photoSource('Skyline', '#6366f1'), alt: 'City skyline at night' },
    { id: 'p3', src: photoSource('Forest', '#10b981'), alt: 'Forest in the morning' },
    { id: 'p4', src: photoSource('Desert', '#ef4444'), alt: 'Dunes at noon' },
  ];
  protected readonly selected = signal<ReadonlySet<string>>(new Set());
  private readonly openViewer = kuiMediaViewer();

  protected isSelected(id: string): boolean {
    return this.selected().has(id);
  }

  protected toggle(id: string): void {
    this.selected.update((current) => {
      const next = new Set(current);

      if (!next.delete(id)) {
        next.add(id);
      }

      return next;
    });
  }

  protected openPhotoAt(index: number): void {
    this.openViewer({ items: this.photos, index });
  }
}
