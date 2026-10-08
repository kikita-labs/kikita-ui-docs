# Pagination

> Page navigation with numbers, steps, a summary and a rows-per-page picker.

- Status: available
- Route: /components/pagination
- Package: @kikita-labs/ui@2.0.0
- Import: KuiPagination from @kikita-labs/ui
- Source docs: https://github.com/kikita-labs/kikita-ui/blob/v2.0.0/docs/pagination.md

## Install

```bash
pnpm add @kikita-labs/ui
ng add @kikita-labs/ui
```

## Usage

```html
<kui-pagination [totalPages]="10" [(currentPage)]="page" />
```

```ts
protected readonly page = signal(1);
```

`currentPage` and `pageSize` are plain two-way bindings (`[(currentPage)]`, `[(pageSize)]`), not
`FormValueControl` -- pagination is page-level navigation state, not a form field value, so it is
never placed inside `kui-field`.

## Examples

Rendered at /components/pagination:

### basic-pagination-example

#### basic-pagination-example.html

```html
<div class="pagination-example">
  <kui-pagination ariaLabel="Project pages" [totalPages]="10" [(currentPage)]="page" />
  <span>Current page: {{ page() }}</span>
</div>
```

#### basic-pagination-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiPagination } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-pagination-example',
  imports: [KuiPagination],
  templateUrl: './basic-pagination-example.html',
  styleUrl: './basic-pagination-example.scss',
})
export class BasicPaginationExample {
  protected readonly page = signal(3);
}
```

#### basic-pagination-example.scss

```scss
.pagination-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  justify-items: start;
}
```

### pagination-variants-example

#### pagination-variants-example.html

```html
<div class="pagination-example">
  <kui-pagination
    ariaLabel="Simple pages"
    variant="simple"
    [totalPages]="12"
    [(currentPage)]="page"
  />
  <kui-pagination
    ariaLabel="Full pages"
    variant="full"
    [totalPages]="12"
    [totalItems]="289"
    [(currentPage)]="page"
    [(pageSize)]="pageSize"
  />
  <kui-pagination
    ariaLabel="Disabled pages"
    size="sm"
    [totalPages]="12"
    [(currentPage)]="page"
    disabled
  />
</div>
```

#### pagination-variants-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiPagination } from '@kikita-labs/ui';

@Component({
  selector: 'app-pagination-variants-example',
  imports: [KuiPagination],
  templateUrl: './pagination-variants-example.html',
  styleUrl: './pagination-variants-example.scss',
})
export class PaginationVariantsExample {
  protected readonly page = signal(2);
  protected readonly pageSize = signal(25);
}
```

#### pagination-variants-example.scss

```scss
.pagination-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  justify-items: start;
}
```

### pagination-window-example

#### pagination-window-example.html

```html
<div class="pagination-example">
  <kui-pagination
    ariaLabel="Wide window pages"
    [totalPages]="42"
    [siblingCount]="2"
    [boundaryCount]="1"
    [(currentPage)]="page"
  />
  <kui-pagination
    ariaLabel="Edge window pages"
    [totalPages]="42"
    [siblingCount]="0"
    [boundaryCount]="2"
    [(currentPage)]="page"
  />
</div>
```

#### pagination-window-example.ts

```ts
import { Component, signal } from '@angular/core';

import { KuiPagination } from '@kikita-labs/ui';

@Component({
  selector: 'app-pagination-window-example',
  imports: [KuiPagination],
  templateUrl: './pagination-window-example.html',
  styleUrl: './pagination-window-example.scss',
})
export class PaginationWindowExample {
  protected readonly page = signal(20);
}
```

#### pagination-window-example.scss

```scss
.pagination-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  justify-items: start;
}
```

### pagination-table-example

#### pagination-table-example.html

```html
<div class="pagination-example">
  <table kuiTable [data]="pageRows()">
    <thead>
      <tr>
        <th kuiTh>Id</th>
        <th kuiTh>Name</th>
      </tr>
    </thead>
    <tbody>
      @for (row of pageRows(); track row.id) {
        <tr kuiRow [value]="row">
          <td kuiCell>{{ row.id }}</td>
          <td kuiCell>{{ row.name }}</td>
        </tr>
      }
    </tbody>
  </table>

  <kui-pagination
    ariaLabel="Table pages"
    variant="full"
    [totalPages]="totalPages()"
    [totalItems]="allRows.length"
    [pageSizeOptions]="[10, 20, 30]"
    [(currentPage)]="page"
    [(pageSize)]="pageSize"
  />
</div>
```

#### pagination-table-example.ts

```ts
import { Component, computed, signal } from '@angular/core';

import { KuiCell, KuiPagination, KuiRow, KuiTable, KuiTh } from '@kikita-labs/ui';

@Component({
  selector: 'app-pagination-table-example',
  imports: [KuiCell, KuiPagination, KuiRow, KuiTable, KuiTh],
  templateUrl: './pagination-table-example.html',
  styleUrl: './pagination-table-example.scss',
})
export class PaginationTableExample {
  protected readonly allRows = Array.from({ length: 60 }, (_, index) => ({
    id: index + 1,
    name: `Project ${index + 1}`,
  }));
  protected readonly page = signal(1);
  protected readonly pageSize = signal(10);
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.allRows.length / this.pageSize())),
  );
  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize();

    return this.allRows.slice(start, start + this.pageSize());
  });
}
```

#### pagination-table-example.scss

```scss
.pagination-example {
  display: grid;
  gap: var(--kui-space-5, 20px);
  justify-items: start;
}

table {
  inline-size: 100%;
}
```

## API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| variant | 'full' \| 'compact' \| 'simple' \| undefined | undefined | Layout preset (defaults.pagination.variant, then compact). compact is First, Prev, numbers with ellipsis, Next and Last; simple is Prev, "Page X of Y" and Next; full adds the summary and the rows-per-page picker. |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| undefined | undefined | Control size on the Button scale. Falls back to the root defaults.size, then md. |
| totalPages | number | - | Required total page count. Static numeric values are coerced; an invalid or non-positive value uses 1. |
| [(currentPage)] | number | 1 | Current page, 1-based. A plain two-way model, not a form value, so pagination is never placed in kui-field. An out-of-range binding is clamped. |
| siblingCount | number \| undefined | undefined | Page numbers shown beside the current page before an ellipsis (defaults.pagination.siblingCount, then 1). |
| boundaryCount | number \| undefined | undefined | Page numbers always shown at each edge (defaults.pagination.boundaryCount, then 1). |
| [(pageSize)] | number | 25 | Rows per page, used by the full variant. Changing the picker sets pageSize and resets currentPage to 1 in the same update. |
| pageSizeOptions | readonly number[] \| undefined | undefined | Choices of the rows-per-page picker, full variant only (defaults.pagination.pageSizeOptions, then [10, 25, 50, 100]). |
| totalItems | number \| undefined | totalPages * pageSize | Total item count for the "Showing X-Y of Z" summary, full variant only. |
| disabled | boolean | false | Disables every control with the native attribute, removing them from the tab order. |
| ariaLabel | string \| undefined | undefined | Accessible name of the nav landmark. Falls back to the pagination.label message (Pagination). |
| messages | Partial<KuiPaginationMessages> \| undefined | undefined | Per-instance text overrides: button names, rowsPerPage, summary and page. They win over scoped and root messages. |
| (currentPageChange) | number | - | Emitted whenever currentPage changes (model output). |
| (pageSizeChange) | number | - | Emitted whenever pageSize changes (model output). |
| --kui-pagination-gap / -summary-gap / -ellipsis-color | CSS custom properties | - | Gap between the controls, gap between the summary row and the controls, and the ellipsis and secondary text colour. |
| --kui-pagination-page-min-size-{xs,sm,md,lg} / -page-size-width | CSS custom properties | - | Square size of the page-number buttons per size and the fixed width (76px) of the rows-per-page picker. |
| KuiPaginationOptions | interface | - | Shape of defaults.pagination: variant, siblingCount, boundaryCount, pageSizeOptions and the four step icons. |

## Accessibility

- The controls sit inside a `<nav>` landmark with `aria-label` (default: the `pagination.label` message, `"Pagination"`), a
  separate landmark from the page's own primary navigation.
- The current page gets both `aria-current="page"` and its own `aria-label`
  (`"Page N, current"`) -- state is not carried by `shape="solid"`/`appearance="primary"` color
  alone.
- First/Prev/Next/Last are `button[kuiIconButton]` with a required `aria-label`, no visible text.
- The ellipsis is `<span aria-hidden="true">`, excluded from both the accessibility tree and the
  tab order -- it is never a button.
- Range boundaries use the native `disabled` attribute on First/Prev (`currentPage === 1`) and
  Next/Last (`currentPage === totalPages`), which removes them from tab order, not just dims them.
- The `variant="full"` summary is `aria-live="polite"`, announcing the changed range without
  interrupting the user.
- Focus-visible is `Button`/`IconButton`'s own native focus ring -- nothing custom.
- There is no roving-tabindex/arrow-key navigation between controls -- every researched kit
  (PrimeNG, MUI, HeroUI) treats pagination as a set of independent buttons in normal tab order, not
  a single composite widget like a listbox, so arrow keys are never intercepted here either.

| Key               | Action                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Tab`/`Shift+Tab` | Moves between every non-disabled control in visual order (First → Prev → numbers → Next → Last → rows-per-page). |
| `Enter`/`Space`   | Activates the focused page/step button.                                                                          |

## Playground

Available at /components/pagination/playground.
