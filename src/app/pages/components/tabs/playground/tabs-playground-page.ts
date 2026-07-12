import { Component, signal } from '@angular/core';
import {
  KuiSize,
  KuiTabDirective,
  KuiTabPanelDirective,
  KuiTabsComponent,
  KuiTabsOrientation,
  KuiTabsVariant,
} from '@kikita-labs/ui';
import { ApiPlayground } from '../../../../shared/docs-ui/api-playground/api-playground';
import {
  PlaygroundControl,
  PlaygroundValues,
} from '../../../../shared/docs-ui/api-playground/playground-control';
import { ApiTable } from '../../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../../shared/docs-ui/code-tabs/code-tab';
import { TABS_API_ROWS } from '../tabs.api-schema';

@Component({
  selector: 'app-tabs-playground-page',
  imports: [ApiPlayground, ApiTable, KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './tabs-playground-page.html',
  styleUrl: './tabs-playground-page.scss',
})
export class TabsPlaygroundPage {
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TABS_API_ROWS;

  protected readonly selected = signal('overview');

  protected readonly playgroundControls: readonly PlaygroundControl[] = [
    {
      key: 'variant',
      label: 'variant',
      kind: 'enum',
      options: ['line', 'pill'],
      defaultValue: 'line',
    },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    {
      key: 'orientation',
      label: 'orientation',
      kind: 'enum',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    { key: 'tab1Label', label: 'tab 1 label', kind: 'string', defaultValue: 'Overview' },
    { key: 'tab2Label', label: 'tab 2 label', kind: 'string', defaultValue: 'Settings' },
    { key: 'tab3Label', label: 'tab 3 label', kind: 'string', defaultValue: 'Logs' },
    { key: 'controlsPanels', label: 'controlsPanels', kind: 'boolean', defaultValue: true },
    { key: 'showError', label: 'tab 2 hasError', kind: 'boolean', defaultValue: false },
  ];

  protected buildPlaygroundSnippet = (values: PlaygroundValues): readonly CodeTab[] => {
    const variant = values['variant'] as string;
    const size = values['size'] as string;
    const orientation = values['orientation'] as string;
    const tab1Label = (values['tab1Label'] as string) || 'Overview';
    const tab2Label = (values['tab2Label'] as string) || 'Settings';
    const tab3Label = (values['tab3Label'] as string) || 'Logs';
    const controlsPanels = values['controlsPanels'] as boolean;
    const showError = values['showError'] as boolean;

    const tabsAttrs = [
      variant !== 'line' ? `variant="${variant}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      orientation !== 'horizontal' ? `orientation="${orientation}"` : null,
      !controlsPanels ? `[controlsPanels]="false"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const panels = controlsPanels
      ? `

  <div kuiTabPanel value="overview">${this.escapeHtml(tab1Label)} content.</div>
  <div kuiTabPanel value="settings">${this.escapeHtml(tab2Label)} content.</div>
  <div kuiTabPanel value="logs">${this.escapeHtml(tab3Label)} content.</div>`
      : '';

    const code = `<kui-tabs [(selected)]="activeTab"${tabsAttrs ? ` ${tabsAttrs}` : ''}>
  <button kuiTab value="overview">${this.escapeHtml(tab1Label)}</button>
  <button kuiTab value="settings"${showError ? ` hasError errorLabel="Contains errors"` : ''}>${this.escapeHtml(tab2Label)}</button>
  <button kuiTab value="logs">${this.escapeHtml(tab3Label)}</button>${panels}
</kui-tabs>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected variantOf(values: PlaygroundValues): KuiTabsVariant {
    return values['variant'] as KuiTabsVariant;
  }

  protected sizeOf(values: PlaygroundValues): KuiSize {
    return values['size'] as KuiSize;
  }

  protected orientationOf(values: PlaygroundValues): KuiTabsOrientation {
    return values['orientation'] as KuiTabsOrientation;
  }

  protected controlsPanelsOf(values: PlaygroundValues): boolean {
    return values['controlsPanels'] as boolean;
  }

  protected showErrorOf(values: PlaygroundValues): boolean {
    return values['showError'] as boolean;
  }

  protected labelOf(values: PlaygroundValues, key: string, fallback: string): string {
    return (values[key] as string) || fallback;
  }

  private escapeHtml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}
