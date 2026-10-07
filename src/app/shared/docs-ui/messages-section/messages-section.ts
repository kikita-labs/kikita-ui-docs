import { Component, input } from '@angular/core';

import { ApiTable } from '../api-table';
import { DocSection } from '../doc-section';
import { type MessagesGroup } from './interfaces';

/**
 * The "Messages" section of a component page: every text the component owns is a typed message
 * with an English default. Pass the groups from `src/app/generated/library-tables/messages.generated.ts`
 * and project element-specific notes (such as the `messages` input) as content.
 */
@Component({
  selector: 'app-messages-section',
  imports: [ApiTable, DocSection],
  templateUrl: './messages-section.html',
  styleUrl: './messages-section.scss',
})
export class MessagesSection {
  /** The `KuiMessages` groups of the component. */
  public readonly groups = input.required<readonly MessagesGroup[]>();
}
