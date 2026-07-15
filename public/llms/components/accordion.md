# Accordion

> Disclosure component for grouped expandable content.

- Status: available
- Route: /components/accordion
- Package: @kikita-labs/ui@0.4.2
- Import: KuiAccordionComponent from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/accordion.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-accordion mode="exclusive" appearance="default" size="md">
  <kui-accordion-item id="general" header="General settings">
    Configure display and behavior options.
  </kui-accordion-item>

  <kui-accordion-item id="security" header="Security">
    Account security parameters.
  </kui-accordion-item>
</kui-accordion>
```

## Examples

Rendered at /components/accordion:

- `appearance-accordion-example`
- `basic-accordion-example`
- `icon-accordion-example`
- `multi-accordion-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| mode | 'exclusive' \| 'multi' | 'exclusive' | Toggle mode. exclusive keeps a single section open at a time; multi allows any number of sections open simultaneously. Two-way bindable. |
| appearance | 'default' \| 'bordered' \| 'ghost' | 'default' | Container and divider treatment: default uses bottom borders between items, bordered wraps each item in its own bordered block, ghost has no borders. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Trigger height and text size. |
| expandedItems | string[] | [] | IDs of currently expanded items. Supports two-way binding with [(expandedItems)]; mutations are reflected back through the model. |
| header | string | '' | kui-accordion-item: trigger label text. |
| id | string | auto-generated | kui-accordion-item: stable ID used for state tracking and ARIA wiring. |
| disabled | boolean | false | kui-accordion-item: removes the trigger from tab order and prevents toggling the section. |
| kuiAccordionIcon | - | - | Marker directive for an ng-template projected into a kui-accordion-item trigger, before the label text. |

## Accessibility

Each item renders a native button trigger with `aria-expanded`, `aria-controls`,
and a region body linked through `aria-labelledby`.

## Playground

Available at /components/accordion/playground.
