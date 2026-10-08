import { PLAYGROUND_MESSAGES_CONTROL } from '@shared/docs-ui/api-playground';

/** Controls every chart playground shares (size, legend, formatting, naming, states). */
export const CHART_PLAYGROUND_COMMON_CONTROLS = [
  { key: 'size', label: 'size', kind: 'enum', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  {
    key: 'legend',
    label: 'legend',
    kind: 'enum',
    options: ['auto', 'show', 'hide'],
    defaultValue: 'auto',
  },
  {
    key: 'valueFormat',
    label: 'valueFormat',
    kind: 'enum',
    options: ['compact', 'currency'],
    defaultValue: 'compact',
  },
  {
    key: 'tooltip',
    label: 'tooltip',
    kind: 'enum',
    options: ['default', 'custom'],
    defaultValue: 'default',
  },
  { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: '' },
  PLAYGROUND_MESSAGES_CONTROL,
  { key: 'loading', label: 'loading', kind: 'boolean', defaultValue: false },
  { key: 'empty', label: 'empty data', kind: 'boolean', defaultValue: false },
] as const;

/** Axis controls of the cartesian chart playgrounds (line, bar and scatter). */
export const CHART_PLAYGROUND_AXES_CONTROLS = [
  { key: 'xTitle', label: 'axes.xTitle', kind: 'string', defaultValue: '' },
  { key: 'yTitle', label: 'axes.yTitle', kind: 'string', defaultValue: '' },
  {
    key: 'gridLines',
    label: 'axes.gridLines',
    kind: 'enum',
    options: ['both', 'horizontal', 'vertical', 'none'],
    defaultValue: 'both',
  },
  { key: 'showX', label: 'axes.x', kind: 'boolean', defaultValue: true },
  { key: 'showY', label: 'axes.y', kind: 'boolean', defaultValue: true },
] as const;
