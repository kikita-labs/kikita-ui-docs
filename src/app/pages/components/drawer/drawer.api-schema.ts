import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const DRAWER_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'kuiDrawer(component, config?)',
    type: '(component: Type<KuiDrawerHost<TResult, TData>>, config?: KuiDrawerConfig<TData>) => KuiDrawerRef<TResult, TData>',
    defaultValue: '-',
    description:
      'Inject-function factory. Call once per injection context to get a typed opener bound to that component.',
  },
  {
    name: 'KuiDrawerHost<TResult, TData>',
    type: 'interface',
    defaultValue: '-',
    description:
      'Contract your drawer component implements. Requires a drawerContext property injected from KUI_DRAWER_CONTEXT.',
  },
  {
    name: 'KUI_DRAWER_CONTEXT',
    type: 'InjectionToken<KuiDrawerContext<TResult, TData>>',
    defaultValue: '-',
    description: 'Injected inside the drawer component to read data and close the drawer.',
  },
  {
    name: 'drawerContext.data',
    type: 'TData',
    defaultValue: '-',
    description: 'Data passed via the opener call, e.g. openDrawer(data).',
  },
  {
    name: 'drawerContext.side',
    type: 'KuiDrawerSide',
    defaultValue: '-',
    description: 'Drawer side resolved from KuiDrawerConfig.side, read-only.',
  },
  {
    name: 'drawerContext.size',
    type: 'KuiDrawerSize',
    defaultValue: '-',
    description: 'Drawer size preset resolved from KuiDrawerConfig.size, read-only.',
  },
  {
    name: 'drawerContext.closable',
    type: 'boolean',
    defaultValue: '-',
    description: 'Mirrors KuiDrawerConfig.closable, for conditionally rendering a close button.',
  },
  {
    name: 'drawerContext.close(result?)',
    type: '(result?: TResult) => void',
    defaultValue: '-',
    description:
      'Closes the drawer, optionally emitting a typed result to the opener subscription.',
  },
  {
    name: 'KuiDrawerConfig.data',
    type: 'TData',
    defaultValue: 'undefined',
    description: 'Value made available on drawerContext.data.',
  },
  {
    name: 'KuiDrawerConfig.side',
    type: `'right' | 'left' | 'bottom' | 'top'`,
    defaultValue: `'right'`,
    description: 'Edge from which the drawer enters and docks.',
  },
  {
    name: 'KuiDrawerConfig.size',
    type: `'sm' | 'md' | 'lg' | 'full'`,
    defaultValue: `'md'`,
    description: 'Width for left/right drawers, height for top/bottom drawers.',
  },
  {
    name: 'KuiDrawerConfig.closeOnBackdropClick',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Closes the drawer on backdrop click. Disable for required actions.',
  },
  {
    name: 'KuiDrawerConfig.closeOnEscape',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Closes the drawer on Escape. Disable for required actions.',
  },
  {
    name: 'KuiDrawerConfig.closable',
    type: 'boolean',
    defaultValue: 'true',
    description:
      'Passed to the content context for close-button rendering; your component decides whether to render it.',
  },
  {
    name: 'KuiDrawerRef<TResult, TData>',
    type: 'type',
    defaultValue: '-',
    description:
      'Return type of kuiDrawer(component, config). Calling it with data opens the drawer and returns Observable<TResult | undefined>.',
  },
  {
    name: '.kui-drawer-header / .kui-drawer-title / .kui-drawer-subtitle',
    type: 'CSS classes',
    defaultValue: '-',
    description:
      'Header structure classes. .kui-drawer-title is wired as aria-labelledby automatically when present.',
  },
  {
    name: '.kui-drawer-body / .kui-drawer-footer',
    type: 'CSS classes',
    defaultValue: '-',
    description: 'Scrollable content region and action row classes.',
  },
  {
    name: '.kui-drawer-close',
    type: 'CSS class',
    defaultValue: '-',
    description:
      'Close-button class for the header, shown conditionally on drawerContext.closable.',
  },
  {
    name: '--kui-drawer-bg',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Panel background color.',
  },
  {
    name: '--kui-drawer-border',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Panel border color.',
  },
  {
    name: '--kui-drawer-radius',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Panel corner radius.',
  },
  {
    name: '--kui-drawer-backdrop-bg',
    type: 'CSS custom property',
    defaultValue: '-',
    description: 'Backdrop fill color.',
  },
  {
    name: '--kui-drawer-width-sm / -md / -lg',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Width presets used by left/right drawers.',
  },
  {
    name: '--kui-drawer-height-sm / -md / -lg',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Height presets used by top/bottom drawers.',
  },
  {
    name: '--kui-drawer-duration-open / -close',
    type: 'CSS custom properties',
    defaultValue: '-',
    description: 'Enter/exit animation durations.',
  },
];
