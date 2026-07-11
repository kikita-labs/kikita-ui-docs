import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { AsyncComboboxExample } from './examples/async-combobox-example/async-combobox-example';
import { BasicComboboxExample } from './examples/basic-combobox-example/basic-combobox-example';
import { ComboboxFieldStatesExample } from './examples/combobox-field-states-example/combobox-field-states-example';
import { FreeComboboxExample } from './examples/free-combobox-example/free-combobox-example';
import { COMBOBOX_API_ROWS } from './combobox.api-schema';

@Component({
  selector: 'app-combobox-page',
  imports: [
    ApiTable,
    AsyncComboboxExample,
    BasicComboboxExample,
    CodeTabs,
    ComboboxFieldStatesExample,
    DocSection,
    FreeComboboxExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
  ],
  templateUrl: './combobox-page.html',
  styleUrl: './combobox-page.scss',
})
export class ComboboxPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs and outputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = COMBOBOX_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'combobox.ts',
      language: 'ts',
      code: `import {
  KuiComboboxDirective,
  KuiComboboxHighlightPipe,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
  kuiProvideComboboxOptions,
} from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Assignee">
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
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, computed, signal } from '@angular/core';
import {
  KuiComboboxDirective,
  KuiComboboxHighlightPipe,
  KuiDropdownComponent,
  KuiFieldComponent,
  KuiOptionDirective,
} from '@kikita-labs/ui';

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
})
export class BasicComboboxExample {
  protected readonly assignee = signal<Person | null>(null);
  protected readonly query = signal('');
  protected readonly personLabel = (person: Person) => person.name;
  protected readonly filteredPeople = computed(() => {
    const q = this.query().toLocaleLowerCase();
    return q ? this.people.filter((person) => person.name.toLocaleLowerCase().includes(q)) : this.people;
  });
}`,
    },
  ];

  protected readonly asyncTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Reviewer">
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
    } @else {
      @for (person of reviewers(); track person.id) {
        <button kuiOption [value]="person">{{ person.name }}</button>
      } @empty {
        <div class="kui-combobox-empty">No matches</div>
      }
    }
  </kui-dropdown>
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `loadReviewers(query: string): void {
  this.loading.set(true);
  this.api.searchPeople(query).subscribe((people) => {
    this.reviewers.set(people);
    this.loading.set(false);
  });
}`,
    },
  ];

  protected readonly freeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Tag">
  <input kuiCombobox mode="free" [(value)]="tag" placeholder="Type or choose..." />
  <kui-dropdown>
    <button kuiOption value="Bug">Bug</button>
    <button kuiOption value="Feature">Feature</button>
  </kui-dropdown>
</kui-field>`,
    },
  ];

  protected readonly fieldStatesTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Owner" hint="Disabled prevents editing and opening the dropdown">
  <input kuiCombobox disabled [(value)]="disabledOwner" placeholder="Search people..." />
  <kui-dropdown>
    <button kuiOption value="engineer">Software Engineer</button>
  </kui-dropdown>
</kui-field>

<kui-field label="Owner" error="Choose an owner before continuing">
  <input kuiCombobox invalid [(value)]="invalidOwner" placeholder="Search people..." />
  <kui-dropdown>
    <button kuiOption value="engineer">Software Engineer</button>
  </kui-dropdown>
</kui-field>`,
    },
  ];

  protected readonly providerTabs: readonly CodeTab[] = [
    {
      label: 'app.config.ts',
      language: 'ts',
      code: `import { kuiProvideComboboxOptions } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    kuiProvideComboboxOptions({
      clearable: true,
    }),
  ],
};`,
    },
  ];
}
