import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const ALERT_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'appearance',
    type: `'neutral' | 'info' | 'success' | 'warning' | 'danger'`,
    defaultValue: `'neutral'`,
    description:
      'Semantic type. Same five values as the toast. neutral never shows the built-in icon; danger is announced assertively, every other value politely.',
  },
  {
    name: 'shape',
    type: `'soft' | 'outline' | 'solid' | undefined`,
    defaultValue: 'undefined',
    description:
      'Visual weight, using the button shape vocabulary. Falls back to defaults.alert.shape, then soft.',
  },
  {
    name: 'size',
    type: `'sm' | 'md' | undefined`,
    defaultValue: 'undefined',
    description:
      'Padding and gap density. Falls back to defaults.alert.size, then the root defaults.size (sm or md only), then md.',
  },
  {
    name: 'banner',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Stretches the alert to the full width of its container and removes the corner radius.',
  },
  {
    name: 'title',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Optional single-line heading. Ignored when [kuiAlertTitle] is projected. Set at least one of title, message or [kuiAlertMessage].',
  },
  {
    name: 'message',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Optional supporting text below the title. Ignored when [kuiAlertMessage] is projected.',
  },
  {
    name: 'showIcon',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the built-in appearance icon (defaults.alert.showIcon, then true). neutral never shows one. Ignored when [kuiAlertIcon] is projected, which always renders.',
  },
  {
    name: 'closable',
    type: 'boolean | undefined',
    defaultValue: 'undefined',
    description:
      'Shows the close button and enables (closed). Falls back to defaults.alert.closable, then true.',
  },
  {
    name: 'closeLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Accessible label for the close button. Falls back to the alert.close message (Close notification).',
  },
  {
    name: 'actionLabel',
    type: 'string | undefined',
    defaultValue: 'undefined',
    description:
      'Label for the inline ghost action button. Ignored when [kuiAlertActions] is projected.',
  },
  {
    name: '(action)',
    type: 'void',
    defaultValue: '-',
    description:
      'Emits when the action button is clicked. Not emitted for a projected [kuiAlertActions].',
  },
  {
    name: '(closed)',
    type: 'void',
    defaultValue: '-',
    description:
      'Emits when the close button is clicked. The alert never removes itself; hide it with @if.',
  },
  {
    name: '[kuiAlertTitle]',
    type: 'content slot',
    defaultValue: '-',
    description: 'Replaces the plain title string with arbitrary markup.',
  },
  {
    name: '[kuiAlertIcon]',
    type: 'content slot',
    defaultValue: '-',
    description:
      'Replaces the built-in severity icon. A projected icon always renders, even for neutral, and inherits --kui-alert-icon-color.',
  },
  {
    name: '[kuiAlertMessage]',
    type: 'content slot',
    defaultValue: '-',
    description:
      'Replaces the plain message string with arbitrary markup (links, lists). The title still renders alongside it.',
  },
  {
    name: '[kuiAlertActions]',
    type: 'content slot',
    defaultValue: '-',
    description:
      'Replaces the single ghost action button with custom controls. kuiButton inside it picks up the appearance-tinted ghost colour.',
  },
  {
    name: 'KuiAlertOptions',
    type: 'interface',
    defaultValue: '-',
    description: 'Shape of defaults.alert: size, shape, showIcon, closable and closeIcon.',
  },
];
