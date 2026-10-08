import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const DEFAULTS_LEVERS_ROWS = [
  {
    name: 'Colour, radius, spacing, type',
    type: 'Theme seeds and CSS variables',
    description: 'Visual identity of the whole application.',
  },
  {
    name: 'Variant or behaviour shared across the app',
    type: 'Defaults',
    description: 'Size, shape, clearable, toast placement and similar preferences (this page).',
  },
  {
    name: 'Density',
    type: 'Theme seeds',
    description: 'Set seeds.density in the theme.',
  },
  {
    name: 'Texts and accessible names',
    type: 'Messages',
    description: 'See the Internationalization page.',
  },
] as const satisfies readonly ApiTableRow[];

export const DEFAULTS_SET_TABS = [
  {
    label: 'Application',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({
  defaults: {
    size: 'sm',
    button: { shape: 'ghost', size: 'md' },
    select: { clearable: true, maxVisibleChips: 2 },
    toast: { position: 'top-end', duration: 4000 },
  },
});`,
  },
  {
    label: 'Subtree',
    filename: 'section.providers.ts',
    language: 'ts',
    code: `// A component, route or environment injector: applies to that subtree only
providers: [provideKuiDefaults({ button: { size: 'lg' } })];`,
  },
] as const satisfies readonly CodeTab[];

export const DEFAULTS_REACTIVE_TABS = [
  {
    label: 'Signal from a service',
    filename: 'app.config.ts',
    language: 'ts',
    code: `@Service()
class ThemeState {
  readonly shape = signal<KuiButtonShape>('solid');
}

provideKikitaUi({
  defaults: () => ({ button: { shape: inject(ThemeState).shape } }),
});`,
  },
  {
    label: 'KuiDefaults at runtime',
    filename: 'defaults.ts',
    language: 'ts',
    code: `const defaults = inject(KuiDefaults);

defaults.set('button', { shape: 'outline' }); // merges into this level's own layer
defaults.update('select', (current) => ({ clearable: !current?.clearable }));
defaults.get('button'); // Signal of the effective button options`,
  },
] as const satisfies readonly CodeTab[];

export const DEFAULTS_OVERLAYS_ROWS = [
  {
    name: 'popover',
    type: 'placement, offset, align, arrow, triggerType, hoverDelay',
    description: 'Built-in: bottom, 8, center, false, click, 100.',
  },
  {
    name: 'menu',
    type: 'placement, offset, menuAlign, minWidth',
    description: 'Built-in: bottom, 4, start, none.',
  },
  {
    name: 'dropdown',
    type: 'maxHeight, offset, closeOnSelect, panelWidth',
    description: 'Built-in: 240px, 4, true, anchor.',
  },
  {
    name: 'tooltip',
    type: 'triggerType, placement',
    description: 'Built-in: auto, top.',
  },
  {
    name: 'dialog',
    type: 'size, appearance, dismissable, closable',
    description: 'Per kuiDialog call. Built-in: md, default, true, true.',
  },
  {
    name: 'drawer',
    type: 'side, size, closeOnBackdropClick, closeOnEscape, closable',
    description: 'Built-in: right, md, true, true, true.',
  },
] as const satisfies readonly ApiTableRow[];

export const DEFAULTS_DATA_ROWS = [
  {
    name: 'calendar, calendarRange',
    type: 'size, flat, showWeekend, showFooter, showPrevNav, showNextNav',
    description:
      'Built-in: global size, false, true, false, true, true. The two keys are separate and share KuiCalendarViewOptions.',
  },
  {
    name: 'timePicker',
    type: 'clearable, format, hourStep, minuteStep, secondStep, showSeconds',
    description:
      'Built-in: true, the hour cycle of the locale, 1, 1, 1, false. The directive pushes them into its panel.',
  },
  {
    name: 'carousel',
    type: 'itemsPerView, loop, autoplay, autoplayInterval, showArrows, showDots, draggable',
    description: 'Built-in: 1, false, false, 4000, true, true, true.',
  },
  {
    name: 'pagination',
    type: 'variant, siblingCount, boundaryCount, pageSizeOptions',
    description: 'Built-in: compact, 1, 1, [10, 25, 50, 100].',
  },
] as const satisfies readonly ApiTableRow[];

export const DEFAULTS_OTHER_ROWS = [
  {
    name: 'badge, breadcrumbs, chip, emptyState, loader, segmented, table',
    type: 'size',
    description: '',
  },
  {
    name: 'input, textarea, checkbox, radio, switch, colorInput',
    type: 'size',
    description: '',
  },
  {
    name: 'numberInput',
    type: 'size, variant',
    description: '',
  },
  {
    name: 'slider, progress',
    type: 'size, color',
    description: '',
  },
  {
    name: 'accordion',
    type: 'size, mode, appearance',
    description: '',
  },
  {
    name: 'alert',
    type: 'size, shape, showIcon, closable',
    description: '',
  },
  {
    name: 'card',
    type: 'size, appearance',
    description: '',
  },
  {
    name: 'tabs',
    type: 'size, variant, orientation',
    description: '',
  },
  {
    name: 'stepper',
    type: 'size, orientation, linear, compact',
    description: '',
  },
  {
    name: 'tree',
    type: 'size, mode',
    description: '',
  },
  {
    name: 'group',
    type: 'size, orientation, collapsed, rounded',
    description: '',
  },
  {
    name: 'avatar, avatarGroup',
    type: 'size, shape (avatarGroup also max)',
    description: '',
  },
  {
    name: 'link',
    type: 'tone, underline',
    description: '',
  },
  {
    name: 'separator',
    type: 'appearance, orientation, spacing',
    description: '',
  },
  {
    name: 'skeleton',
    type: 'shape, animation',
    description: '',
  },
  {
    name: 'fileUpload',
    type: 'size, variant, mode',
    description: '',
  },
  {
    name: 'otpInput',
    type: 'size, mask, integerOnly',
    description: '',
  },
  {
    name: 'barChart, lineChart, donutChart, scatterChart',
    type: 'size, legend',
    description: '',
  },
] as const satisfies readonly ApiTableRow[];

export const DEFAULTS_ICONS_TABS = [
  {
    label: 'Replace glyphs',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({ defaults: { icons: { close: MY_CLOSE }, select: { chevronIcon: MY_CHEVRON } } });`,
  },
] as const satisfies readonly CodeTab[];

export const DEFAULTS_MIGRATE_ROWS = [
  {
    name: 'kuiProvideButtonOptions({ button, iconButton })',
    type: 'provideKuiDefaults({ button, iconButton })',
    description: 'Deprecated wrapper, removed in 3.0.',
  },
  {
    name: 'kuiProvideFieldOptions(options)',
    type: 'provideKuiDefaults({ field: options })',
    description: 'Deprecated wrapper, removed in 3.0.',
  },
  {
    name: 'kuiProvideSelectOptions(options)',
    type: 'provideKuiDefaults({ select: options })',
    description: 'Deprecated wrapper, removed in 3.0.',
  },
  {
    name: 'kuiProvideComboboxOptions(options)',
    type: 'provideKuiDefaults({ combobox: options })',
    description: 'Deprecated wrapper, removed in 3.0.',
  },
  {
    name: 'kuiProvideTooltipOptions(options)',
    type: 'provideKuiDefaults({ tooltip: options })',
    description: 'Deprecated wrapper, removed in 3.0.',
  },
  {
    name: 'provideKuiToastOptions(options)',
    type: 'provideKuiDefaults({ toast: options })',
    description: 'Deprecated wrapper, removed in 3.0.',
  },
  {
    name: 'provideKikitaUi({ tooltip })',
    type: 'provideKikitaUi({ defaults: { tooltip } })',
    description: 'Deprecated.',
  },
  {
    name: 'KuiButtonOptions { button, iconButton }',
    type: 'KuiButtonProviderOptions',
    description: 'Deprecated; KuiButtonOptions now describes one button (shape, appearance, size).',
  },
  {
    name: 'KuiButtonPrimitiveOptions',
    type: 'KuiButtonBaseOptions',
    description: 'Renamed.',
  },
  {
    name: 'KikitaUiDefaults',
    type: 'KuiComponentDefaults',
    description: 'Deprecated alias.',
  },
] as const satisfies readonly ApiTableRow[];
