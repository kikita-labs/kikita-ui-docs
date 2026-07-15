# Date Picker

> Calendar date input.

- Status: available
- Route: /components/date-picker
- Package: @kikita-labs/ui@0.4.2
- Import: KuiDatePickerDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/date-picker.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Meeting date">
  <input kuiDatePicker [(value)]="date" />
  <kui-dropdown panelRole="dialog" panelWidth="content" maxHeight="420px">
    <kui-calendar flat [(value)]="date" [showFooter]="true" />
  </kui-dropdown>
</kui-field>
```

Three things on `kui-dropdown` matter here, all different from its default (listbox) usage:

- `panelRole="dialog"` — the panel holds a calendar grid, not a list of options.
- `panelWidth="content"` — sizes the panel to the calendar's own width (296px by default)
  instead of clipping it to the (usually narrower) field. This is why the popover is often
  wider than the input — that's intentional, not a bug: `kui-calendar` has a fixed width
  (`--kui-calendar-width`, 296px by default) because its day grid needs a minimum amount of
  room regardless of the trigger. Override `--kui-calendar-width` on `kui-calendar` if you want
  it narrower or wider — `panelWidth` only controls how the _dropdown panel_ relates to the
  trigger's width, not the calendar's own size, so switching it to `"anchor"` alone would just
  clip a still-296px-wide calendar into a narrower panel rather than shrink it.
- `maxHeight="420px"` — the calendar's natural height comfortably fits under this; it's a
  safety cap so the popover never renders unbounded when there isn't enough room in either
  direction, falling back to an internal scroll instead of visually overflowing.

And on `kui-calendar`:

- `flat` — the popover panel already draws its own background/border, so the calendar drops
  its own to avoid a double frame. See [Calendar](./calendar.md#flat-no-own-chrome).

## Examples

Rendered at /components/date-picker:

- `basic-date-picker-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| input[kuiDatePicker] | Directive | - | Turns a native text input into a masked date picker trigger. |
| [(value)] | Date \| null | null | Selected date. Bind the same signal to the paired calendar. |
| [(viewDate)] | Date | current month | Visible calendar month. Bind on both input and calendar for live month sync. |
| minDate / maxDate | Date \| undefined | undefined | Inclusive bounds for typed values and linked calendar cells. |
| clearable | boolean \| undefined | field option | Shows a clear action when the input has a value. |
| disabled | boolean | false | Disables the input and prevents opening the dropdown. |
| readonly | boolean | false | Keeps the value readable while preventing popover opening. |
| invalid | boolean | false | Reflects validation state from Signal Forms or direct binding. |
| errors / touched / touch | Signal Forms control contract | - | Integrates with Angular Signal Forms validation and touched state. |
| placeholder | string | 'dd.mm.yyyy' | Native input placeholder for the fixed display mask. |
| id | string \| undefined | field control id | Input id. Falls back to the parent kui-field control id when present. |
| kui-dropdown panelRole | 'dialog' \| 'listbox' \| 'grid' \| null | 'listbox' | Use dialog for the calendar popover because the panel is not a listbox. |
| kui-calendar flat | boolean | false | Use flat inside the dropdown so the calendar does not draw a second frame. |

## Accessibility

- `role="combobox"` on the input, `aria-haspopup="dialog"`, `aria-expanded` + `aria-controls`
  pointing at the popover panel id.
- `aria-invalid`/`data-kui-invalid` reflect parse failures and out-of-range dates.
- The linked `kui-calendar` carries its own grid accessibility (`role="grid"`, roving tabindex,
  `aria-current="date"`, `aria-selected`) — see [Calendar](./calendar.md#accessibility).

### Keyboard

- `ArrowDown`: opens the popover
- `Enter`: opens the popover if closed, closes it if open
- `Escape`: closes the popover, focus stays in the field
- `Tab`: closes the popover, focus moves to the next tabbable element
- Inside the popover: calendar keyboard navigation applies (see Calendar docs)

## Playground

Available at /components/date-picker/playground.
