import { Component, input } from '@angular/core';

import { ApiTable, type ApiTableRow } from '../api-table';
import { DocSection } from '../doc-section';

/**
 * The "Theming tokens" section of a component page. Pass the rows from
 * `src/app/generated/library-tables/<slug>.generated.ts`; either list may be empty.
 */
@Component({
  selector: 'app-token-tables-section',
  imports: [ApiTable, DocSection],
  templateUrl: './token-tables-section.html',
  styleUrl: './token-tables-section.scss',
})
export class TokenTablesSection {
  /** Component name used in the table labels. */
  public readonly name = input.required<string>();
  /** Color token rows. */
  public readonly colorRows = input<readonly ApiTableRow[]>([]);
  /** Geometry token rows. */
  public readonly geometryRows = input<readonly ApiTableRow[]>([]);
}
