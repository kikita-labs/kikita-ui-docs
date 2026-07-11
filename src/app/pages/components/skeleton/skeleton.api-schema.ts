import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const SKELETON_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'shape',
    type: `'text' | 'heading' | 'rect' | 'circle' | 'square' | 'button' | 'badge'`,
    defaultValue: `'rect'`,
    description: 'Placeholder shape mapped to Kikita UI skeleton geometry tokens.',
  },
  {
    name: 'animation',
    type: `'shimmer' | 'pulse' | 'none'`,
    defaultValue: `'shimmer'`,
    description:
      'Placeholder animation mode. Automatically disabled when the user prefers reduced motion, regardless of this value.',
  },
];
