import { Component } from '@angular/core';
import {
  KuiButtonAppearance,
  KuiButtonShape,
  KuiIconButtonDirective,
  KuiIconComponent,
  KuiSize,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { ICON_BUTTON_API_ROWS } from '../icon-button.api-schema';

const SETTINGS_ICON =
  '<svg viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 0 1-4 0v-.06A1.7 1.7 0 0 0 8.96 19.4a1.7 1.7 0 0 0-1.88.34l-.04.04a2 2 0 0 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 0 1 0-4h.06A1.7 1.7 0 0 0 4.6 8.96a1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04A1.7 1.7 0 0 0 8.96 4.6 1.7 1.7 0 0 0 10 3.06V3a2 2 0 0 1 4 0v.06A1.7 1.7 0 0 0 15.04 4.6a1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 0 1 2.83 2.83l-.04.04a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.94 10H21a2 2 0 0 1 0 4h-.06A1.7 1.7 0 0 0 19.4 15Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

@Component({
  selector: 'app-icon-button-playground-page',
  imports: [ApiPlayground, ApiTable, KuiIconButtonDirective, KuiIconComponent],
  templateUrl: './icon-button-playground-page.html',
  styleUrl: './icon-button-playground-page.scss',
})
export class IconButtonPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = ICON_BUTTON_API_ROWS;
  protected readonly settingsIcon = SETTINGS_ICON;

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    { key: 'ariaLabel', label: 'aria-label', kind: 'string', defaultValue: 'Settings' },
    {
      key: 'shape',
      label: 'shape',
      kind: 'enum',
      options: ['ghost', 'solid', 'soft', 'outline'],
      defaultValue: 'ghost',
    },
    {
      key: 'appearance',
      label: 'appearance',
      kind: 'enum',
      options: ['none', 'primary', 'danger', 'success', 'warning'],
      defaultValue: 'none',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const ariaLabel = values['ariaLabel'] as string;
    const shape = values['shape'] as string;
    const appearance = values['appearance'] as string;
    const size = values['size'] as string;
    const disabled = values['disabled'] as boolean;

    const attrs = [
      shape !== 'ghost' ? `shape="${shape}"` : null,
      appearance !== 'none' ? `appearance="${appearance}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      disabled ? 'disabled' : null,
    ].filter((attr): attr is string => attr !== null);

    const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
    const escapedLabel = this.escapeHtml(ariaLabel || 'Settings');

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<button kuiIconButton type="button"${attrString} aria-label="${escapedLabel}">
  <kui-icon [source]="settingsIcon" />
</button>`,
      },
    ];
  };

  protected ariaLabelOf(values: PlaygroundValues): string {
    const ariaLabel = values['ariaLabel'] as string;

    return ariaLabel || 'Settings';
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  protected shapeOf(values: PlaygroundValues): KuiButtonShape {
    return values['shape'] as KuiButtonShape;
  }

  protected appearanceOf(values: PlaygroundValues): KuiButtonAppearance | null {
    const appearance = values['appearance'] as string;

    return appearance === 'none' ? null : (appearance as KuiButtonAppearance);
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected disabledOf(values: PlaygroundValues): boolean {
    return values['disabled'] as boolean;
  }
}
