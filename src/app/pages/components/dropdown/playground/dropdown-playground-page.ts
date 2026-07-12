import { Component } from '@angular/core';
import { KuiDropdownComponent, KuiDropdownForDirective, KuiOptionDirective } from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { DROPDOWN_API_ROWS } from '../dropdown.api-schema';

type PanelRoleOption = 'listbox' | 'dialog' | 'grid' | 'none';

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
  protected readonly apiDescription = `Inputs, outputs, and public API verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = DROPDOWN_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
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
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const triggerLabel = (values['triggerLabel'] as string) || 'Actions';
    const maxHeight = values['maxHeight'] as string;
    const offset = values['offset'] as number;
    const closeOnSelect = values['closeOnSelect'] as boolean;
    const panelRole = values['panelRole'] as PanelRoleOption;
    const panelWidth = values['panelWidth'] as string;
    const width = values['width'] as string;
    const disabledOption = values['disabledOption'] as boolean;

    const dropdownAttrs = [
      maxHeight !== '240px'
        ? maxHeight
          ? `[maxHeight]="'${this.escapeHtml(maxHeight)}'"`
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
      width ? `width="${this.escapeHtml(width)}"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const disabledLine = disabledOption
      ? `\n  <div kuiOption value="archive" [disabled]="true">Archive</div>`
      : `\n  <div kuiOption value="archive">Archive</div>`;

    const code = `<button type="button" [kuiDropdownFor]="menu">${this.escapeHtml(triggerLabel)}</button>

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

  protected triggerLabelOf(values: PlaygroundValues): string {
    return (values['triggerLabel'] as string) || 'Actions';
  }

  protected maxHeightOf(values: PlaygroundValues): string | null {
    const maxHeight = values['maxHeight'] as string;

    return maxHeight ? maxHeight : null;
  }

  protected offsetOf(values: PlaygroundValues): number {
    return values['offset'] as number;
  }

  protected closeOnSelectOf(values: PlaygroundValues): boolean {
    return values['closeOnSelect'] as boolean;
  }

  protected panelRoleOf(values: PlaygroundValues): 'listbox' | 'dialog' | 'grid' | null {
    const panelRole = values['panelRole'] as PanelRoleOption;

    return panelRole === 'none' ? null : panelRole;
  }

  protected panelWidthOf(values: PlaygroundValues): 'anchor' | 'content' | 'auto' {
    return values['panelWidth'] as 'anchor' | 'content' | 'auto';
  }

  protected widthOf(values: PlaygroundValues): string | null {
    const width = values['width'] as string;

    return width ? width : null;
  }

  protected disabledOptionOf(values: PlaygroundValues): boolean {
    return values['disabledOption'] as boolean;
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
