import { type ApiTableRow } from '@shared/docs-ui/api-table';

export const ACCORDION_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'mode',
    type: `'exclusive' | 'multi'`,
    defaultValue: `'exclusive'`,
    description:
      'Toggle mode. exclusive keeps a single section open at a time; multi allows any number of sections open simultaneously. A plain input, not two-way bindable. Falls back to defaults.accordion.mode.',
  },
  {
    name: 'appearance',
    type: `'default' | 'bordered' | 'ghost'`,
    defaultValue: `'default'`,
    description:
      'Container and divider treatment: default uses bottom borders between items, bordered wraps each item in its own bordered block, ghost has no borders. A plain input; falls back to defaults.accordion.appearance.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description:
      'Trigger height and text size. A plain input; falls back to defaults.accordion.size, then the global defaults.size.',
  },
  {
    name: 'expandedItems',
    type: 'string[]',
    defaultValue: '[]',
    description:
      'IDs of currently expanded items. The only mutable state of the accordion and the only two-way bindable one: use [(expandedItems)] or listen to (expandedItemsChange).',
  },
  {
    name: 'header',
    type: 'string',
    defaultValue: `''`,
    description: 'kui-accordion-item: trigger label text.',
  },
  {
    name: 'id',
    type: 'string',
    defaultValue: 'auto-generated',
    description:
      'kui-accordion-item: stable ID used for state tracking and ARIA wiring. The generated default is numbered per Angular application, so server-rendered ids match the browser.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description:
      'kui-accordion-item: removes the trigger from tab order and prevents toggling the section.',
  },
  {
    name: 'kuiAccordionIcon',
    type: '-',
    defaultValue: '-',
    description:
      'Marker directive for an ng-template projected into a kui-accordion-item trigger, before the label text.',
  },
  {
    name: 'provideKuiDefaults({ accordion })',
    type: '(defaults: KuiComponentDefaults) => Provider',
    defaultValue: '-',
    description:
      'Sets size, mode, appearance and disclosureIcon for a subtree; provideKikitaUi({ defaults }) does it for the whole application.',
  },
  {
    name: 'KuiAccordionOptions',
    type: 'interface',
    defaultValue: '-',
    description:
      'Shape of defaults.accordion. disclosureIcon takes precedence over defaults.icons.disclosure.',
  },
  {
    name: 'KuiAccordionMode / KuiAccordionAppearance',
    type: 'type aliases',
    defaultValue: '-',
    description: 'Public unions of the mode and appearance values.',
  },
];
