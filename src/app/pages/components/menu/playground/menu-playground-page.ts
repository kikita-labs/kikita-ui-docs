import { Component } from '@angular/core';

import {
  KuiButtonDirective,
  type KuiMenuAlign,
  KuiMenuComponent,
  KuiMenuForDirective,
  KuiMenuHeaderDirective,
  KuiMenuItemDirective,
  type KuiMenuPlacement,
  KuiSeparatorDirective,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { MENU_API_ROWS } from '../menu.api-schema';
import { MENU_API_DESCRIPTION } from '../menu.docs-content';

const MENU_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
] as const);

type MenuPlaygroundValues = PlaygroundValues<typeof MENU_PLAYGROUND_CONTROLS>;

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
  protected readonly apiDescription = MENU_API_DESCRIPTION;
  protected readonly apiRows = MENU_API_ROWS;

  protected readonly playgroundControls = MENU_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: MenuPlaygroundValues,
  ): readonly CodeTab[] => {
    const triggerLabel = values.triggerLabel || 'Actions';
    const ariaLabel = values.ariaLabel || 'Actions';
    const placement = values.placement;
    const menuAlign = values.menuAlign;
    const offset = values.offset;
    const minWidth = values.minWidth;
    const showHeader = values.showHeader;
    const showDestructive = values.showDestructive;
    const disabledItem = values.disabledItem;

    const menuAttrs = serializePlaygroundAttributes([
      { name: 'ariaLabel', value: ariaLabel, defaultValue: 'Actions' },
      { name: 'placement', value: placement, defaultValue: 'bottom' },
      { name: 'menuAlign', value: menuAlign, defaultValue: 'start' },
      { name: '[offset]', value: offset, defaultValue: 4 },
      { name: 'minWidth', value: minWidth || null },
    ]);

    const headerLine = showHeader ? `\n  <div kuiMenuHeader>Project</div>` : '';
    const archiveItem = disabledItem
      ? `\n  <button type="button" kuiMenuItem disabled>\n    <span class="kui-menu-item__label">Archive</span>\n  </button>`
      : '';
    const deleteItem = showDestructive
      ? `\n  <hr kuiSeparator spacing="xs" />\n  <button type="button" kuiMenuItem appearance="destructive">\n    <span class="kui-menu-item__label">Delete</span>\n  </button>`
      : '';

    const code = `<button kuiButton type="button" [kuiMenuFor]="actionsMenu">${escapePlaygroundHtml(triggerLabel)}</button>

<kui-menu #actionsMenu${menuAttrs}>${headerLine}
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

  protected triggerLabelOf(values: MenuPlaygroundValues): string {
    return values.triggerLabel || 'Actions';
  }

  protected ariaLabelOf(values: MenuPlaygroundValues): string {
    return values.ariaLabel || 'Actions';
  }

  protected placementOf(values: MenuPlaygroundValues): KuiMenuPlacement {
    return values.placement;
  }

  protected menuAlignOf(values: MenuPlaygroundValues): KuiMenuAlign {
    return values.menuAlign;
  }

  protected offsetOf(values: MenuPlaygroundValues): number {
    return values.offset;
  }

  protected minWidthOf(values: MenuPlaygroundValues): string | null {
    const minWidth = values.minWidth;

    return minWidth ? minWidth : null;
  }

  protected showHeaderOf(values: MenuPlaygroundValues): boolean {
    return values.showHeader;
  }

  protected showDestructiveOf(values: MenuPlaygroundValues): boolean {
    return values.showDestructive;
  }

  protected disabledItemOf(values: MenuPlaygroundValues): boolean {
    return values.disabledItem;
  }
}
