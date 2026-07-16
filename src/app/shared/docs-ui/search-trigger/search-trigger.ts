import { booleanAttribute, Component, inject, input } from '@angular/core';

import { KuiButtonDirective, KuiIconComponent } from '@kikita-labs/ui';

import { DocsSearchStateService } from '@core/search';

/** Opens the docs command palette search. Shared by the header and sidebar navigation. */
@Component({
  selector: 'app-search-trigger',
  imports: [KuiButtonDirective, KuiIconComponent],
  templateUrl: './search-trigger.html',
  styleUrl: './search-trigger.scss',
})
export class SearchTrigger {
  /** Stretches the trigger to fill its container and spaces the label/kbd apart. */
  public readonly fullWidth = input(false, { transform: booleanAttribute });

  protected readonly search = inject(DocsSearchStateService);
}
