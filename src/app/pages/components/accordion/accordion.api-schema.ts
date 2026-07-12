import { ApiTableRow } from '../../../shared/docs-ui/api-table/api-table-row';

export const ACCORDION_API_ROWS: readonly ApiTableRow[] = [
  {
    name: 'mode',
    type: `'exclusive' | 'multi'`,
    defaultValue: `'exclusive'`,
    description:
      'Toggle mode. exclusive keeps a single section open at a time; multi allows any number of sections open simultaneously. Two-way bindable.',
  },
  {
    name: 'appearance',
    type: `'default' | 'bordered' | 'ghost'`,
    defaultValue: `'default'`,
    description:
      'Container and divider treatment: default uses bottom borders between items, bordered wraps each item in its own bordered block, ghost has no borders.',
  },
  {
    name: 'size',
    type: `'xs' | 'sm' | 'md' | 'lg'`,
    defaultValue: `'md'`,
    description: 'Trigger height and text size.',
  },
  {
    name: 'expandedItems',
    type: 'string[]',
    defaultValue: '[]',
    description:
      'IDs of currently expanded items. Supports two-way binding with [(expandedItems)]; mutations are reflected back through the model.',
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
    description: 'kui-accordion-item: stable ID used for state tracking and ARIA wiring.',
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
];
