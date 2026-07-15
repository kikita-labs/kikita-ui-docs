# Chip

> Compact token for selected values, filters, and entity references.

- Status: available
- Route: /components/chip
- Package: @kikita-labs/ui@0.4.4
- Import: KuiChipDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/chip.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<span kuiChip>Design</span>

<span kuiChip size="sm" appearance="primary" (removed)="removeTag('design')">
  <span class="kui-chip-label">Design</span>
  <button kuiChipRemove aria-label="Remove Design">...</button>
</span>

<button kuiChip type="button">Filter</button>
```

## Examples

Rendered at /components/chip:

- `basic-chip-example`
- `chip-states-example`
- `interactive-chip-example`
- `removable-chip-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| appearance | 'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'neutral' | Semantic visual treatment mapped to Kikita UI status tokens. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' | 'md' | Chip size. sm is the size used inside Select and Combobox controls. |
| disabled | boolean | false | Reduces opacity and makes the nested remove action inert. |
| invalid | boolean | false | Shows the invalid border treatment. |
| removed | output: void | - | Emitted when a nested button[kuiChipRemove] is clicked. |
| kuiChipRemove | directive on button | - | Marks a native button as the chip remove action. Needs its own aria-label, for example "Remove Design". |
| --kui-chip-bg | CSS color | - | Chip background color. |
| --kui-chip-bg-hover | CSS color | - | Chip background color on hover for interactive chips. |
| --kui-chip-border | CSS color | - | Chip border color. |
| --kui-chip-text | CSS color | - | Chip label text color. |
| --kui-chip-radius | CSS length | - | Chip corner radius. |
| --kui-chip-height-xs | CSS length | - | Chip block size for size="xs". |
| --kui-chip-height-sm | CSS length | - | Chip block size for size="sm". |
| --kui-chip-height-md | CSS length | - | Chip block size for size="md" (default). |
| --kui-chip-height-lg | CSS length | - | Chip block size for size="lg". |
| --kui-chip-remove-color | CSS color | - | Remove icon color. |
| --kui-chip-remove-color-hover | CSS color | - | Remove icon color on hover. |
| --kui-chip-disabled-opacity | CSS number | - | Opacity applied to the whole chip when disabled. |

## Accessibility

- Static chip: use a non-interactive host such as `span`.
- Interactive chip: use a native `button` or `a`.
- Remove action must be a native `button[kuiChipRemove]`.
- Remove buttons need an accessible name such as `aria-label="Remove Design"`.
- Disabled chips mark remove buttons as `aria-disabled="true"` and `tabindex="-1"`.
- Select and Combobox own keyboard behavior for Delete/Backspace selected-value removal.

## Playground

Available at /components/chip/playground.
