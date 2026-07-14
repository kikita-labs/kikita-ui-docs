import { Component } from '@angular/core';

import { KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective } from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { DROPDOWN_API_ROWS } from '../dropdown.api-schema';
import { DROPDOWN_API_DESCRIPTION } from '../dropdown.docs-content';

const DROPDOWN_PLAYGROUND_CONTROLS = definePlaygroundControls([
  { key: 'triggerLabel', label: 'trigger label', kind: 'string', defaultValue: 'Actions' },
  { key: 'maxHeight', label: 'maxHeight', kind: 'string', defaultValue: '240px' },
  { key: 'offset', label: 'offset', kind: 'number', defaultValue: 4 },
  { key: 'closeOnSelect', label: 'closeOnSelect', kind: 'boolean', defaultValue: true },
  {
    key: 'panelRole',
    label: 'panelRole',
    kind: 'enum',
    options: ['listbox', 'dialog', 'grid', 'none'],
    defaultValue: 'listbox',
  },
  {
    key: 'panelWidth',
    label: 'panelWidth',
    kind: 'enum',
    options: ['anchor', 'content', 'auto'],
    defaultValue: 'anchor',
  },
  { key: 'width', label: 'width', kind: 'string', defaultValue: '' },
  { key: 'disabledOption', label: 'disabled option', kind: 'boolean', defaultValue: false },
] as const);

type DropdownPlaygroundValues = PlaygroundValues<typeof DROPDOWN_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-dropdown-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiDropdownComponent,
    KuiDropdownForDirective,
    KuiOptionDirective,
  ],
  templateUrl: './dropdown-playground-page.html',
  styleUrl: './dropdown-playground-page.scss',
})
export class DropdownPlaygroundPage {
  protected readonly apiDescription = DROPDOWN_API_DESCRIPTION;
  protected readonly apiRows = DROPDOWN_API_ROWS;

  protected readonly playgroundControls = DROPDOWN_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: DropdownPlaygroundValues,
  ): readonly CodeTab[] => {
    const triggerLabel = values.triggerLabel || 'Actions';
    const maxHeight = values.maxHeight;
    const offset = values.offset;
    const closeOnSelect = values.closeOnSelect;
    const panelRole = values.panelRole;
    const panelWidth = values.panelWidth;
    const width = values.width;
    const disabledOption = values.disabledOption;

    const dropdownAttrs = [
      maxHeight !== '240px'
        ? maxHeight
          ? `[maxHeight]="'${escapePlaygroundHtml(maxHeight)}'"`
          : `[maxHeight]="null"`
        : null,
      offset !== 4 ? `[offset]="${offset}"` : null,
      !closeOnSelect ? `[closeOnSelect]="false"` : null,
      panelRole !== 'listbox'
        ? panelRole === 'none'
          ? `[panelRole]="null"`
          : `panelRole="${panelRole}"`
        : null,
      panelWidth !== 'anchor' ? `panelWidth="${panelWidth}"` : null,
      width ? `width="${escapePlaygroundHtml(width)}"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const disabledLine = disabledOption
      ? `\n  <div kuiOption value="archive" [disabled]="true">Archive</div>`
      : `\n  <div kuiOption value="archive">Archive</div>`;

    const code = `<button type="button" [kuiDropdownFor]="menu">${escapePlaygroundHtml(triggerLabel)}</button>

<kui-dropdown #menu${dropdownAttrs ? ` ${dropdownAttrs}` : ''}>
  <div kuiOption value="edit">Edit</div>
  <div kuiOption value="duplicate">Duplicate</div>${disabledLine}
</kui-dropdown>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected triggerLabelOf(values: DropdownPlaygroundValues): string {
    return values.triggerLabel || 'Actions';
  }

  protected maxHeightOf(values: DropdownPlaygroundValues): string | null {
    const maxHeight = values.maxHeight;

    return maxHeight ? maxHeight : null;
  }

  protected offsetOf(values: DropdownPlaygroundValues): number {
    return values.offset;
  }

  protected closeOnSelectOf(values: DropdownPlaygroundValues): boolean {
    return values.closeOnSelect;
  }

  protected panelRoleOf(values: DropdownPlaygroundValues): 'listbox' | 'dialog' | 'grid' | null {
    const panelRole = values.panelRole;

    return panelRole === 'none' ? null : panelRole;
  }

  protected panelWidthOf(values: DropdownPlaygroundValues): 'anchor' | 'content' | 'auto' {
    return values.panelWidth;
  }

  protected widthOf(values: DropdownPlaygroundValues): string | null {
    const width = values.width;

    return width ? width : null;
  }

  protected disabledOptionOf(values: DropdownPlaygroundValues): boolean {
    return values.disabledOption;
  }
}
