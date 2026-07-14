import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const TOKENS_LAYER_TABS = [
  {
    label: 'Layers',
    filename: 'token-layers.txt',
    language: 'text',
    code: `seed -> palette -> semantic -> component`,
  },
  {
    label: 'Palette',
    filename: 'palette.css',
    language: 'css',
    code: `--kui-primary-1 ... --kui-primary-12
--kui-neutral-1 ... --kui-neutral-12
--kui-success-1 ... --kui-success-12
--kui-warning-1 ... --kui-warning-12
--kui-danger-1 ... --kui-danger-12
--kui-info-1 ... --kui-info-12`,
  },
  {
    label: 'Semantic',
    filename: 'semantic.css',
    language: 'css',
    code: `--kui-color-bg
--kui-color-surface
--kui-color-border
--kui-color-text
--kui-color-primary-fill
--kui-color-primary-focus-ring`,
  },
] as const satisfies readonly CodeTab[];

export const TOKENS_SEED_ROWS = [
  {
    name: '--kui-seed-primary',
    type: 'oklch(0.52 0.25 285)',
    description: 'Brand and action color.',
  },
  {
    name: '--kui-seed-neutral',
    type: 'oklch(0.5 0.01 80)',
    description: 'Surface, border, and text base.',
  },
  {
    name: '--kui-seed-success',
    type: 'oklch(0.54 0.16 145)',
    description: 'Positive state.',
  },
  {
    name: '--kui-seed-warning',
    type: 'oklch(0.74 0.16 75)',
    description: 'Caution state.',
  },
  {
    name: '--kui-seed-danger',
    type: 'oklch(0.54 0.22 25)',
    description: 'Error or destructive state.',
  },
  {
    name: '--kui-seed-info',
    type: 'oklch(0.58 0.16 215)',
    description: 'Informational state.',
  },
] as const satisfies readonly ApiTableRow[];

export const TOKENS_SCALE_TABS = [
  {
    label: 'Radius',
    filename: 'radius.css',
    language: 'css',
    code: `--kui-radius-none: 0;
--kui-radius-xs: 4px;
--kui-radius-sm: 6px;
--kui-radius-md: 8px;
--kui-radius-lg: 10px;
--kui-radius-xl: 14px;
--kui-radius-full: 9999px;`,
  },
  {
    label: 'Spacing',
    filename: 'spacing.css',
    language: 'css',
    code: `--kui-space-1: 4px;
--kui-space-2: 8px;
--kui-space-3: 12px;
--kui-space-4: 16px;
--kui-space-5: 20px;
--kui-space-6: 24px;
--kui-space-8: 32px;
--kui-space-12: 48px;
--kui-space-16: 64px;`,
  },
] as const satisfies readonly CodeTab[];
