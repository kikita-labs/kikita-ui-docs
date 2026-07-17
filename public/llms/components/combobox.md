# Combobox

> Searchable input with projected options and async mode.

- Status: available
- Route: /components/combobox
- Package: @kikita-labs/ui@0.6.3
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

### async-combobox-example

#### async-combobox-example.html

```html
<kui-field label="Reviewer" hint="Simulates a remote lookup with a loading row">
  <input
    kuiCombobox
    mode="async"
    [(value)]="reviewer"
    [(query)]="reviewerQuery"
    [loading]="loading()"
    [kuiLabelFn]="personLabel"
    placeholder="Type to search..."
    (search)="loadReviewers($event)"
  />

  <kui-dropdown>
    @if (loading()) {
      <div class="kui-combobox-loading-row">
        <span class="kui-combobox-loader" aria-hidden="true"></span>
        Loading people
      </div>
    } @else if (errorMessage(); as lookupError) {
      <div class="kui-combobox-empty" role="alert">{{ lookupError }}</div>
    } @else {
      @for (person of reviewers(); track person.id) {
        <button kuiOption [value]="person">{{ person.name }}</button>
      } @empty {
        <div class="kui-combobox-empty">No matches</div>
      }
    }
  </kui-dropdown>
</kui-field>
```

#### async-combobox-example.ts

```ts
import { Component, effect, inject, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

import { ALL_REVIEWERS, type AsyncReviewer, AsyncReviewerService } from './async-reviewer.service';

@Component({
  selector: 'app-async-combobox-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  providers: [AsyncReviewerService],
  templateUrl: './async-combobox-example.html',
  styleUrl: './async-combobox-example.scss',
})
export class AsyncComboboxExample {
  private readonly reviewerLookup = inject(AsyncReviewerService);
  private readonly requestedQuery = signal<string | null>(null);

  protected readonly reviewer = signal<AsyncReviewer | null>(null);
  protected readonly reviewerQuery = signal('');
  protected readonly reviewers = signal<readonly AsyncReviewer[]>(ALL_REVIEWERS);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly personLabel = (person: AsyncReviewer) => person.name;

  private readonly reviewerLookupEffect = effect((onCleanup) => {
    const query = this.requestedQuery();

    if (query === null) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const subscription = this.reviewerLookup.search(query).subscribe({
      next: (reviewers) => {
        this.reviewers.set(reviewers);
        this.loading.set(false);
      },
      error: () => {
        this.reviewers.set([]);
        this.loading.set(false);
        this.errorMessage.set('Reviewers could not be loaded. Try again.');
      },
    });

    onCleanup(() => subscription.unsubscribe());
  });

  protected loadReviewers(query: string): void {
    this.requestedQuery.set(query);
  }
}
```

#### async-reviewer.service.ts

```ts
import { Injectable } from '@angular/core';

import { map, type Observable, timer } from 'rxjs';

export interface AsyncReviewer {
  readonly id: string;
  readonly name: string;
}

const ALL_REVIEWERS: readonly AsyncReviewer[] = [
  { id: 'amelia', name: 'Amelia Novak' },
  { id: 'daniel', name: 'Daniel Kowalski' },
  { id: 'harper', name: 'Harper Singh' },
  { id: 'ines', name: 'Ines Delacroix' },
  { id: 'ravi', name: 'Ravi Patel' },
];

@Injectable()
export class AsyncReviewerService {
  public search(query: string): Observable<readonly AsyncReviewer[]> {
    return timer(400).pipe(
      map(() => {
        const normalizedQuery = query.toLocaleLowerCase();

        return normalizedQuery
          ? ALL_REVIEWERS.filter((reviewer) =>
              reviewer.name.toLocaleLowerCase().includes(normalizedQuery),
            )
          : ALL_REVIEWERS;
      }),
    );
  }
}

export { ALL_REVIEWERS };
```

#### async-combobox-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}
```

### basic-combobox-example

#### basic-combobox-example.html

```html
<kui-field label="Assignee" hint="Type to filter projected options">
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
          @for (segment of person.name | kuiComboboxHighlight: query(); track $index) {
            @if (segment.match) {
              <mark class="kui-combobox-highlight">{{ segment.text }}</mark>
            } @else {
              <span>{{ segment.text }}</span>
            }
          }
        </span>
      </button>
    } @empty {
      <div class="kui-combobox-empty">No people found</div>
    }
  </kui-dropdown>
</kui-field>
```

#### basic-combobox-example.ts

```ts
import { Component, computed, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiComboboxHighlightPipe,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

interface Person {
  readonly id: string;
  readonly name: string;
}

const PEOPLE: readonly Person[] = [
  { id: 'amelia', name: 'Amelia Novak' },
  { id: 'daniel', name: 'Daniel Kowalski' },
  { id: 'harper', name: 'Harper Singh' },
  { id: 'ines', name: 'Ines Delacroix' },
  { id: 'ravi', name: 'Ravi Patel' },
];

@Component({
  selector: 'app-basic-combobox-example',
  imports: [
    KuiComboboxDirective,
    KuiComboboxHighlightPipe,
    KuiDropdownComponent,
    KuiFieldComponent,
    KuiOptionDirective,
  ],
  templateUrl: './basic-combobox-example.html',
  styleUrl: './basic-combobox-example.scss',
})
export class BasicComboboxExample {
  protected readonly assignee = signal<Person | null>(null);
  protected readonly query = signal('');

  protected readonly personLabel = (person: Person) => person.name;

  protected readonly filteredPeople = computed(() => {
    const q = this.query().toLocaleLowerCase();

    return q ? PEOPLE.filter((person) => person.name.toLocaleLowerCase().includes(q)) : PEOPLE;
  });
}
```

#### basic-combobox-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}
```

### combobox-field-states-example

#### combobox-field-states-example.html

```html
<div class="combobox-field-states-example">
  <kui-field label="Owner" hint="Disabled prevents editing and opening the dropdown">
    <input kuiCombobox disabled [(value)]="disabledOwner" placeholder="Search people..." />
    <kui-dropdown>
      <button kuiOption value="engineer">Software Engineer</button>
      <button kuiOption value="designer">Designer</button>
    </kui-dropdown>
  </kui-field>

  <kui-field label="Owner" error="Choose an owner before continuing">
    <input kuiCombobox invalid [(value)]="invalidOwner" placeholder="Search people..." />
    <kui-dropdown>
      <button kuiOption value="engineer">Software Engineer</button>
      <button kuiOption value="designer">Designer</button>
    </kui-dropdown>
  </kui-field>
</div>
```

#### combobox-field-states-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-combobox-field-states-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  templateUrl: './combobox-field-states-example.html',
  styleUrl: './combobox-field-states-example.scss',
})
export class ComboboxFieldStatesExample {
  protected readonly disabledOwner = signal<string | null>('engineer');
  protected readonly invalidOwner = signal<string | null>(null);
}
```

#### combobox-field-states-example.scss

```scss
.combobox-field-states-example {
  display: grid;
  gap: var(--kui-space-4, 16px);
  max-inline-size: 320px;
}
```

### free-combobox-example

#### free-combobox-example.html

```html
<kui-field label="Tag" hint="Type a custom tag or choose a suggestion">
  <input kuiCombobox mode="free" [(value)]="tag" placeholder="Type or choose..." />
  <kui-dropdown>
    <button kuiOption value="Bug">Bug</button>
    <button kuiOption value="Feature">Feature</button>
    <button kuiOption value="Regression">Regression</button>
  </kui-dropdown>
</kui-field>
```

#### free-combobox-example.ts

```ts
import { Component, signal } from '@angular/core';

import {
  KuiComboboxDirective,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-free-combobox-example',
  imports: [KuiComboboxDirective, KuiDropdownComponent, KuiFieldComponent, KuiOptionDirective],
  templateUrl: './free-combobox-example.html',
  styleUrl: './free-combobox-example.scss',
})
export class FreeComboboxExample {
  protected readonly tag = signal<string | null>(null);
}
```

#### free-combobox-example.scss

```scss
:host {
  display: block;
  max-inline-size: 320px;
}
```

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
