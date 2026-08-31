import { type DocsStorageKey } from '@core/platform/storage';

import { type PlaygroundViewport } from '../types';

export const VIEWPORT_WIDTH: Record<PlaygroundViewport, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 1160,
};

export const PLAYGROUND_PREVIEW_THEME_STORAGE_KEY: DocsStorageKey =
  'kikita-ui-docs.playground-preview-theme';
export const MIN_PREVIEW_WIDTH = 320;
export const MAX_PREVIEW_WIDTH = 1160;
