import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const SKELETON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'text' | 'heading' | 'rect' | 'circle' | 'square' | 'button' | 'badge' | undefined`,
    defaultValue: 'undefined',
    description:
      'Placeholder shape mapped to Kikita UI skeleton geometry tokens. Falls back to defaults.skeleton.shape, then rect.',
  },
  {
    name: 'animation',
    type: `'shimmer' | 'pulse' | 'none' | undefined`,
    defaultValue: 'undefined',
    description:
      'Placeholder animation mode (defaults.skeleton.animation, then shimmer). Automatically disabled when the user prefers reduced motion, regardless of this value.',
  },
  {
    name: 'KuiSkeletonOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.skeleton: shape and animation.',
  },
];
