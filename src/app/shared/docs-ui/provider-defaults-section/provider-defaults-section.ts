import { Component, computed, input } from '@angular/core';

import { ApiTable } from '../api-table';
import { CodeTabs } from '../code-tabs';
import { DocSection } from '../doc-section';
import { createProviderDefaultsTabs } from './helpers';
import { type ProviderDefaultsGroup } from './interfaces';

/**
 * The "Provider defaults" section of a component page: the `defaults.<key>` snippets and the
 * option table of every key the component owns. Pass the groups from
 * `src/app/generated/library-tables/<slug>.generated.ts` and project element-specific resolution
 * notes as content.
 */
@Component({
  selector: 'app-provider-defaults-section',
  imports: [ApiTable, CodeTabs, DocSection],
  templateUrl: './provider-defaults-section.html',
  styleUrl: './provider-defaults-section.scss',
})
export class ProviderDefaultsSection {
  /** The `defaults.<key>` groups of the component. */
  public readonly groups = input.required<readonly ProviderDefaultsGroup[]>();

  protected readonly keys = computed(() => this.groups().map((group) => group.key));
  protected readonly description = computed(() => {
    const [first] = this.keys();

    return `Set defaults.${first} once for the application or for a subtree. Each option resolves as local input > defaults.${first}.<option> > built-in default.`;
  });
  protected readonly tabs = computed(() => {
    const [first] = this.keys();

    return first ? createProviderDefaultsTabs(first) : [];
  });
}
