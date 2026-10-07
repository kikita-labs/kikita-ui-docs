import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const TOAST_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'title',
    type: 'string',
    defaultValue: '-',
    description: 'Required headline text passed to open().',
  },
  {
    name: 'message',
    type: 'string | undefined',
    defaultValue: '-',
    description: 'Optional supporting text below the title.',
  },
  {
    name: 'appearance',
    type: `'neutral' | 'success' | 'warning' | 'danger' | 'info'`,
    defaultValue: `'neutral'`,
    description: 'Visual intent. Controls the accent bar and icon color; neutral renders no icon.',
  },
  {
    name: 'actionLabel',
    type: 'string | undefined',
    defaultValue: '-',
    description:
      'Label for the inline action button. Clicking it emits once on KuiToastRef.action$.',
  },
  {
    name: 'duration',
    type: 'number',
    defaultValue: '5000',
    description:
      'Auto-dismiss delay in ms. Ignored when persistent is true. App-wide default overridable via defaults.toast.',
  },
  {
    name: 'persistent',
    type: 'boolean | Signal<boolean>',
    defaultValue: 'false',
    description:
      'Keeps the toast open until it is closed explicitly. A signal can start or pause the auto-dismiss timer reactively.',
  },
  {
    name: 'closable',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Shows the close button. App-wide default overridable via defaults.toast.',
  },
  {
    name: 'showIcon',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Shows the appearance icon. App-wide default overridable via defaults.toast.',
  },
  {
    name: 'showProgress',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'Shows a progress bar tracking time until auto-dismiss. App-wide default overridable via defaults.toast.',
  },
  {
    name: 'kuiToast()',
    type: '() => KuiToast',
    defaultValue: '-',
    description:
      'Inject-function returning a reusable opener bound to the current injector scope. Call once per component; prefer over injecting KuiToast directly.',
  },
  {
    name: 'KuiToast.open(config)',
    type: '(config: KuiToastConfig) => KuiToastRef',
    defaultValue: '-',
    description: 'Shows a toast notification and returns a ref for programmatic control.',
  },
  {
    name: 'KuiToast.setPosition(position)',
    type: '(position: KuiToastPosition) => void',
    defaultValue: '-',
    description:
      'Changes the shared toast region position at runtime. Intended for interactive demos; prefer defaults.toast for app-level configuration.',
  },
  {
    name: 'KuiToastRef.close()',
    type: '() => void',
    defaultValue: '-',
    description: 'Closes this toast programmatically and plays the exit animation.',
  },
  {
    name: 'KuiToastRef.id',
    type: 'number',
    defaultValue: '-',
    description: 'Stable identifier for this toast within its owning toast service.',
  },
  {
    name: 'KuiToastRef.update(config)',
    type: '(config: Partial<KuiToastConfig>) => void',
    defaultValue: '-',
    description: 'Updates this toast in place and re-evaluates its auto-dismiss timer.',
  },
  {
    name: 'KuiToastRef.closed$',
    type: 'Observable<void>',
    defaultValue: '-',
    description: 'Emits once after the close animation finishes, then completes.',
  },
  {
    name: 'KuiToastRef.action$',
    type: 'Observable<void>',
    defaultValue: '-',
    description: 'Emits once when the action button is clicked, then completes.',
  },
  {
    name: 'KuiToast.dismiss(id)',
    type: '(id: number) => void',
    defaultValue: '-',
    description: 'Dismisses one toast created by this service using its stable reference id.',
  },
  {
    name: 'KuiToast.dismissAll()',
    type: '() => void',
    defaultValue: '-',
    description: 'Dismisses all active toasts created by this service.',
  },
  {
    name: 'provideKuiDefaults({ toast })',
    type: '(defaults: KuiComponentDefaults) => Provider',
    defaultValue: '-',
    description:
      'App or route-level provider for global toast defaults: position, duration, maxVisible, showProgress, closable, showIcon.',
  },
  {
    name: 'position',
    type: `'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'`,
    defaultValue: `'bottom-center'`,
    description:
      'Global region position. Set app-wide via defaults.toast, or at runtime via KuiToast.setPosition for demos.',
  },
  {
    name: 'maxVisible',
    type: 'number',
    defaultValue: '3',
    description:
      'Max simultaneous toasts, set via defaults.toast. The oldest visible toast is evicted when exceeded. It follows runtime changes of the default.',
  },
];
