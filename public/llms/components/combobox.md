# Combobox

> Searchable input with projected options and async mode.

- Status: available
- Route: /components/combobox
- Package: @kikita-labs/ui@0.4.2
- Import: KuiComboboxDirective from @kikita-labs/ui
- Source docs: ../kikita-ui/docs/combobox.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-field label="Assignee">
  <input
    kuiCombobox
    [(value)]="assignee"
    [(query)]="query"
    [kuiLabelFn]="personLabel"
    placeholder="Search people..."
    (search)="query.set($event)"
  />

  <kui-dropdown>
    @for (person of filteredPeople(); track person.id) {
    <button kuiOption [value]="person">
      <span class="kui-combobox-match-label">
        @for (segment of person.name | kuiComboboxHighlight: query(); track $index) { @if
        (segment.match) {
        <mark class="kui-combobox-highlight">{{ segment.text }}</mark>
        } @else {
        <span>{{ segment.text }}</span>
        } }
      </span>
    </button>
    } @empty {
    <div class="kui-combobox-empty">No people found</div>
    }
  </kui-dropdown>
</kui-field>
```

```ts
assignee = signal<Person | null>(null);
query = signal('');
personLabel = (person: Person) => person.name;
filteredPeople = computed(() => {
  const q = this.query().toLocaleLowerCase();
  return q
    ? this.people.filter((person) => person.name.toLocaleLowerCase().includes(q))
    : this.people;
});
```

Inside `kui-field`, Combobox inherits field id, label association, `aria-describedby`,
invalid state, and field size.

## Examples

Rendered at /components/combobox:

- `async-combobox-example`
- `basic-combobox-example`
- `combobox-field-states-example`
- `free-combobox-example`

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | T \| string \| null | null | Selected value. Bound by [formField] or [(value)]. |
| query | string | '' | Current search text shown in the native input. |
| search | output: string | - | Emitted on every native input edit. Use for local filtering or remote requests. |
| kuiLabelFn | (item: T) => string | String() | Maps a selected object value to display text. Required when T is not a primitive. |
| placeholder | string | '' | Native input placeholder shown when no value is selected. |
| mode | 'filter' \| 'free' \| 'async' | 'filter' | filter clears the value while editing until a kuiOption is selected. free stores typed text as the value. async documents that filtering happens outside the directive. |
| clearable | boolean \| undefined | true | Shows a clear affordance. Falls back to KUI_COMBOBOX_OPTIONS, then KUI_FIELD_OPTIONS, then true. |
| loading | boolean | false | Shows a suffix loader. Loading row content inside kui-dropdown is projected by the consumer. |
| disabled | boolean | false | Disables the native input. Set by [formField] or directly. |
| readonly | boolean | false | Keeps the value readable but prevents editing and opening the dropdown. |
| invalid | boolean | false | Applies ARIA invalid state. kui-field also contributes invalid state from validation. |
| errors | readonly ValidationError[] | [] | Validation errors set by [formField], consumed by kui-field for automatic error text. |
| touched | boolean | false | Touched state set by [formField] or Signal Forms. |
| touch | output: void | - | Emitted when an opened dropdown closes; marks the control touched for Signal Forms. |
| id | string \| undefined | undefined | Explicit id override. Inside kui-field, the field id is used when omitted. |
| kuiOption | directive | - | Marks a projected option inside kui-dropdown. Provides role="option", aria-selected, disabled state, and keyboard navigation. |
| kuiComboboxHighlight | pipe: (label: string, query: string \| null \| undefined) => readonly { text: string; match: boolean }[] | - | Splits an option label into plain and matched segments for highlighting the current query. |
| kuiProvideComboboxOptions | (opts: KuiComboboxOptions) => Provider | - | Registers app-wide combobox defaults, such as clearable, via KUI_COMBOBOX_OPTIONS. |
| KUI_COMBOBOX_OPTIONS | InjectionToken<KuiComboboxOptions> | - | Injection token backing kuiProvideComboboxOptions. Read by the directive for clearable fallback. |
| --kui-combobox-affordance-size | CSS custom property | - | Size of the suffix clear/chevron affordance controls. |
| --kui-combobox-suffix-gap | CSS custom property | - | Gap between suffix affordances (clear button, chevron, loader). |
| --kui-combobox-loader-size | CSS custom property | - | Diameter of the suffix loading spinner. |
| --kui-combobox-loader-border-width | CSS custom property | - | Border width of the suffix loading spinner. |
| --kui-combobox-loader-duration | CSS custom property | - | Animation duration of the suffix loading spinner. |
| --kui-combobox-highlight-bg | CSS custom property | - | Background color of matched text inside kui-combobox-highlight. |
| --kui-combobox-highlight-text | CSS custom property | - | Text color of matched text inside kui-combobox-highlight. |
| --kui-combobox-highlight-radius | CSS custom property | - | Corner radius of the matched-text highlight mark. |

## Accessibility

- The host remains a native `<input>`.
- The input uses `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`.
- `kui-field` provides label, hint, error, required marker, `aria-describedby`, and inherited invalid state.
- `kui-dropdown` renders the popup listbox through Angular CDK overlay.
- `kuiOption` provides `role="option"`, `aria-selected`, disabled state, click selection, and keyboard navigation.
- Arrow keys open the dropdown and move focus to the first or last enabled option.
- Escape closes the dropdown.

## Playground

Available at /components/combobox/playground.
