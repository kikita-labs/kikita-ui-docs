import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const DIALOG_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kuiDialog(component, config?)',
    type: '(component: Type<TComponent>, config?: Omit<KuiDialogConfig, "data">) => (data: TData) => Observable<TResult | undefined>',
    defaultValue: '-',
    description:
      'Inject-function factory. Call once per injection context to get a typed opener bound to that component.',
  },
  {
    name: 'KuiDialogHost<TResult, TData>',
    type: 'interface',
    defaultValue: '-',
    description:
      'Contract your dialog component implements. Requires a dialogContext property injected from KUI_DIALOG_CONTEXT.',
  },
  {
    name: 'KUI_DIALOG_CONTEXT',
    type: 'InjectionToken<KuiDialogContext<TResult, TData>>',
    defaultValue: '-',
    description: 'Injected inside the dialog component to read data and close the dialog.',
  },
  {
    name: 'dialogContext.data',
    type: 'TData',
    defaultValue: '-',
    description: 'Data passed via the opener call, e.g. openDialog(data).',
  },
  {
    name: 'dialogContext.closable',
    type: 'boolean',
    defaultValue: '-',
    description: 'Mirrors KuiDialogConfig.closable, for conditionally rendering a close button.',
  },
  {
    name: 'dialogContext.appearance',
    type: 'KuiDialogAppearance',
    defaultValue: '-',
    description: 'Mirrors KuiDialogConfig.appearance, for coloring a custom icon if needed.',
  },
  {
    name: 'dialogContext.close(result?)',
    type: '(result?: TResult) => void',
    defaultValue: '-',
    description:
      'Closes the dialog, optionally emitting a typed result to the opener subscription.',
  },
  {
    name: 'KuiDialogConfig.data',
    type: 'TData',
    defaultValue: 'undefined',
    description:
      'Available on the low-level config type; kuiDialog() passes feature data through the returned opener function instead.',
  },
  {
    name: 'KuiDialogConfig.size',
    type: `'auto' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Panel width preset: auto (min 320px), sm (400px), md (560px), lg (720px).',
  },
  {
    name: 'KuiDialogConfig.appearance',
    type: `'default' | 'danger' | 'warning'`,
    defaultValue: `'default'`,
    description: 'Colors .kui-dialog-icon via a CSS variable. Has no other visual effect.',
  },
  {
    name: 'KuiDialogConfig.dismissable',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Allows Escape and backdrop click to close the dialog.',
  },
  {
    name: 'KuiDialogConfig.closable',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Exposed on dialogContext.closable for the component to render a close button.',
  },
  {
    name: 'KuiDialogRef<TResult>',
    type: 'class',
    defaultValue: '-',
    description:
      'Return type of kuiDialog(component, config). Calling it with data opens the dialog and returns Observable<TResult | undefined>.',
  },
  {
    name: 'kuiConfirm()',
    type: '() => (config: KuiConfirmConfig) => Observable<boolean>',
    defaultValue: '-',
    description:
      'Inject-function for a pre-built confirmation dialog. No custom component required.',
  },
  {
    name: 'KuiConfirmConfig.title',
    type: 'string',
    defaultValue: 'required',
    description: 'Header text.',
  },
  {
    name: 'KuiConfirmConfig.message',
    type: 'string | undefined',
    defaultValue: '-',
    description: 'Body text.',
  },
  {
    name: 'KuiConfirmConfig.appearance',
    type: 'KuiDialogAppearance',
    defaultValue: `'default'`,
    description: 'Icon color and button tone.',
  },
  {
    name: 'KuiConfirmConfig.confirmLabel',
    type: 'string',
    defaultValue: `'OK'`,
    description: 'Confirm button label.',
  },
  {
    name: 'KuiConfirmConfig.cancelLabel',
    type: 'string',
    defaultValue: `'Cancel'`,
    description: 'Cancel button label.',
  },
  {
    name: '.kui-dialog-icon',
    type: 'CSS class',
    defaultValue: '-',
    description:
      'Add to an SVG placed before .kui-dialog-title inside .kui-dialog-header. Fixed 20x20px, colored via appearance.',
  },
  {
    name: '--kui-dialog-bg',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-color-surface-elevated)',
    description: 'Panel background color.',
  },
  {
    name: '--kui-dialog-border',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-color-border)',
    description: 'Panel border color.',
  },
  {
    name: '--kui-dialog-radius',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-radius-lg)',
    description: 'Panel corner radius.',
  },
  {
    name: '--kui-dialog-shadow',
    type: 'CSS custom property',
    defaultValue: 'var(--kui-shadow-lg)',
    description: 'Panel elevation shadow.',
  },
  {
    name: '--kui-dialog-backdrop',
    type: 'CSS custom property',
    defaultValue: 'oklch(0 0 0 / 0.5)',
    description: 'Backdrop fill color.',
  },
];
