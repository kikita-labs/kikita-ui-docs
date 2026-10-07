import { Component, computed, input } from '@angular/core';

import { ApiTable, type ApiTableRow } from '../api-table';
import { CodeTabs } from '../code-tabs';
import { DocSection } from '../doc-section';
import { createProviderDefaultsTabs } from './helpers';

/**
 * The "Provider defaults" section of a component page: the `defaults.<key>` snippets and the
 * option table. Pass the key and rows from `src/app/generated/library-tables/<slug>.generated.ts`
 * and project element-specific resolution notes as content.
 */
@Component({
  selector: 'app-provider-defaults-section',
  imports: [ApiTable, CodeTabs, DocSection],
  templateUrl: './provider-defaults-section.html',
  styleUrl: './provider-defaults-section.scss',
})
export class ProviderDefaultsSection {
  /** Key under `KuiComponentDefaults`, for example `datePicker`. */
  public readonly defaultsKey = input.required<string>();
  /** Option rows of `defaults.<key>`. */
  public readonly rows = input.required<readonly ApiTableRow[]>();

  protected readonly description = computed(
    () =>
      `Set defaults.${this.defaultsKey()} once for the application or for a subtree. Each option resolves as local input > defaults.${this.defaultsKey()}.<option> > built-in default.`,
  );
  protected readonly tabs = computed(() => createProviderDefaultsTabs(this.defaultsKey()));
  protected readonly tableLabel = computed(() => `defaults.${this.defaultsKey()} options`);
}
