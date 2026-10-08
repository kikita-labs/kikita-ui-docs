import { Component } from '@angular/core';

import { KuiButton, kuiMediaViewer } from '@kikita-labs/ui';

function photoSource(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${color}"/><text x="600" y="420" font-size="96" text-anchor="middle" fill="white" font-family="sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

@Component({
  selector: 'app-media-viewer-single-example',
  imports: [KuiButton],
  templateUrl: './media-viewer-single-example.html',
  styleUrl: './media-viewer-single-example.scss',
})
export class MediaViewerSingleExample {
  private readonly openViewer = kuiMediaViewer();

  protected open(): void {
    this.openViewer({
      items: [{ src: photoSource('Single', '#0ea5e9'), alt: 'A single photo' }],
      maxZoom: 4,
      zoomStep: 1,
    });
  }
}
