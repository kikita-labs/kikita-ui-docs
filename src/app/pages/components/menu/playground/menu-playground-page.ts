import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiMenuAlign,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuHeaderDirective,
  KuiMenuItemDirective,
  KuiMenuPlacement,
  KuiSeparatorDirective,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { MENU_API_ROWS } from '../menu.api-schema';

@Component({
  selector: 'app-menu-playground-page',
  imports: [
    ApiPlayground,
    ApiTable,
    KuiButtonDirective,
    KuiMenuComponent,
    KuiMenuForDirective,
    KuiMenuHeaderDirective,
    KuiMenuItemDirective,
    KuiSeparatorDirective,
  ],
  templateUrl: './menu-playground-page.html',
  styleUrl: './menu-playground-page.scss',
})
export class MenuPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = MENU_API_ROWS;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'triggerLabel', label: 'trigger label', kind: 'string', defaultValue: 'Actions' },
    { key: 'ariaLabel', label: 'ariaLabel', kind: 'string', defaultValue: 'Actions' },
    {
      key: 'placement',
      label: 'placement',
      kind: 'enum',
      options: ['top', 'bottom', 'left', 'right'],
      defaultValue: 'bottom',
    },
    {
      key: 'menuAlign',
      label: 'menuAlign',
      kind: 'enum',
      options: ['start', 'end'],
      defaultValue: 'start',
    },
    { key: 'offset', label: 'offset', kind: 'number', defaultValue: 4 },
    { key: 'minWidth', label: 'minWidth', kind: 'string', defaultValue: '' },
    { key: 'showHeader', label: 'group header', kind: 'boolean', defaultValue: false },
    { key: 'showDestructive', label: 'destructive item', kind: 'boolean', defaultValue: true },
    { key: 'disabledItem', label: 'disabled item', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const triggerLabel = (values['triggerLabel'] as string) || 'Actions';
    const ariaLabel = (values['ariaLabel'] as string) || 'Actions';
    const placement = values['placement'] as string;
    const menuAlign = values['menuAlign'] as string;
    const offset = values['offset'] as number;
    const minWidth = values['minWidth'] as string;
    const showHeader = values['showHeader'] as boolean;
    const showDestructive = values['showDestructive'] as boolean;
    const disabledItem = values['disabledItem'] as boolean;

    const menuAttrs = [
      ariaLabel !== 'Actions' ? `ariaLabel="${this.escapeHtml(ariaLabel)}"` : null,
      placement !== 'bottom' ? `placement="${placement}"` : null,
      menuAlign !== 'start' ? `menuAlign="${menuAlign}"` : null,
      offset !== 4 ? `offset="${offset}"` : null,
      minWidth ? `minWidth="${this.escapeHtml(minWidth)}"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const headerLine = showHeader ? `\n  <div kuiMenuHeader>Project</div>` : '';
    const archiveItem = disabledItem
      ? `\n  <button type="button" kuiMenuItem disabled>\n    <span class="kui-menu-item__label">Archive</span>\n  </button>`
      : '';
    const deleteItem = showDestructive
      ? `\n  <hr kuiSeparator spacing="xs" />\n  <button type="button" kuiMenuItem appearance="destructive">\n    <span class="kui-menu-item__label">Delete</span>\n  </button>`
      : '';

    const code = `<button kuiButton type="button" [kuiMenuFor]="actionsMenu">${this.escapeHtml(triggerLabel)}</button>

<kui-menu #actionsMenu${menuAttrs ? ` ${menuAttrs}` : ''}>${headerLine}
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__label">Edit</span>
  </button>
  <button type="button" kuiMenuItem>
    <span class="kui-menu-item__label">Copy</span>
  </button>${archiveItem}${deleteItem}
</kui-menu>`;

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

  protected ariaLabelOf(values: PlaygroundValues): string {
    return (values['ariaLabel'] as string) || 'Actions';
  }

  protected placementOf(values: PlaygroundValues): KuiMenuPlacement {
    return values['placement'] as KuiMenuPlacement;
  }

  protected menuAlignOf(values: PlaygroundValues): KuiMenuAlign {
    return values['menuAlign'] as KuiMenuAlign;
  }

  protected offsetOf(values: PlaygroundValues): number {
    return values['offset'] as number;
  }

  protected minWidthOf(values: PlaygroundValues): string | null {
    const minWidth = values['minWidth'] as string;

    return minWidth ? minWidth : null;
  }

  protected showHeaderOf(values: PlaygroundValues): boolean {
    return values['showHeader'] as boolean;
  }

  protected showDestructiveOf(values: PlaygroundValues): boolean {
    return values['showDestructive'] as boolean;
  }

  protected disabledItemOf(values: PlaygroundValues): boolean {
    return values['disabledItem'] as boolean;
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
