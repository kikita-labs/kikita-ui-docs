import { type KuiMediaViewerItem, type KuiMediaViewerMessages } from '@kikita-labs/ui';

function photoSource(label: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="${color}"/><text x="600" y="420" font-size="96" text-anchor="middle" fill="white" font-family="sans-serif">${label}</text></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Sample photos of the playground (inline SVG, so nothing is fetched). */
export const MEDIA_VIEWER_PLAYGROUND_PHOTOS: readonly KuiMediaViewerItem[] = [
  { id: 'p1', src: photoSource('Sunset', '#f59e0b'), alt: 'Sunset over the bay' },
  { id: 'p2', src: photoSource('Skyline', '#6366f1'), alt: 'City skyline at night' },
  { id: 'p3', src: photoSource('Forest', '#10b981'), alt: 'Forest in the morning' },
  { id: 'p4', src: photoSource('Desert', '#ef4444'), alt: 'Dunes at noon' },
  { id: 'p5', src: photoSource('Glacier', '#0ea5e9'), alt: 'Glacier at dawn' },
];

/** The message overrides the playground applies when its `messages` control is `custom`. */
export const MEDIA_VIEWER_PLAYGROUND_MESSAGES: Partial<KuiMediaViewerMessages> = {
  label: 'Gallery',
  close: 'Close gallery',
  previous: 'Earlier photo',
  next: 'Later photo',
};
