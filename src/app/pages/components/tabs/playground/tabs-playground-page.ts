import { Component, signal } from '@angular/core';

import {
  type KuiSize,
  KuiTabDirective,
  KuiTabPanelDirective,
  KuiTabsComponent,
  type KuiTabsOrientation,
  type KuiTabsVariant,
} from '@kikita-labs/ui';

import { ApiPlayground } from '@shared/docs-ui/api-playground';
import {
  definePlaygroundControls,
  escapePlaygroundHtml,
  type PlaygroundValues,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { TABS_API_ROWS } from '../tabs.api-schema';
import { TABS_API_DESCRIPTION } from '../tabs.docs-content';

const TABS_PLAYGROUND_CONTROLS = definePlaygroundControls([
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
  { key: 'inverted', label: 'inverted', kind: 'boolean', defaultValue: false },
  { key: 'tab1Label', label: 'tab 1 label', kind: 'string', defaultValue: 'Overview' },
  { key: 'tab2Label', label: 'tab 2 label', kind: 'string', defaultValue: 'Settings' },
  { key: 'tab3Label', label: 'tab 3 label', kind: 'string', defaultValue: 'Logs' },
  { key: 'controlsPanels', label: 'controlsPanels', kind: 'boolean', defaultValue: true },
  { key: 'showError', label: 'tab 2 hasError', kind: 'boolean', defaultValue: false },
] as const);

type TabsPlaygroundValues = PlaygroundValues<typeof TABS_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-tabs-playground-page',
  imports: [ApiPlayground, ApiTable, KuiTabDirective, KuiTabPanelDirective, KuiTabsComponent],
  templateUrl: './tabs-playground-page.html',
  styleUrl: './tabs-playground-page.scss',
})
export class TabsPlaygroundPage {
  protected readonly apiDescription = TABS_API_DESCRIPTION;
  protected readonly apiRows = TABS_API_ROWS;

  protected readonly selected = signal('overview');

  protected readonly playgroundControls = TABS_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: TabsPlaygroundValues,
  ): readonly CodeTab[] => {
    const variant = values.variant;
    const size = values.size;
    const orientation = values.orientation;
    const inverted = values.inverted;
    const tab1Label = values.tab1Label || 'Overview';
    const tab2Label = values.tab2Label || 'Settings';
    const tab3Label = values.tab3Label || 'Logs';
    const controlsPanels = values.controlsPanels;
    const showError = values.showError;

    const tabsAttrs = [
      variant !== 'line' ? `variant="${variant}"` : null,
      size !== 'md' ? `size="${size}"` : null,
      orientation !== 'horizontal' ? `orientation="${orientation}"` : null,
      inverted ? `inverted` : null,
      !controlsPanels ? `[controlsPanels]="false"` : null,
    ]
      .filter((attr): attr is string => attr !== null)
      .join(' ');

    const panels = controlsPanels
      ? `

  <div kuiTabPanel value="overview">${escapePlaygroundHtml(tab1Label)} content.</div>
  <div kuiTabPanel value="settings">${escapePlaygroundHtml(tab2Label)} content.</div>
  <div kuiTabPanel value="logs">${escapePlaygroundHtml(tab3Label)} content.</div>`
      : '';

    const code = `<kui-tabs [(selected)]="activeTab"${tabsAttrs ? ` ${tabsAttrs}` : ''}>
  <button kuiTab value="overview">${escapePlaygroundHtml(tab1Label)}</button>
  <button kuiTab value="settings"${showError ? ` hasError errorLabel="Contains errors"` : ''}>${escapePlaygroundHtml(tab2Label)}</button>
  <button kuiTab value="logs">${escapePlaygroundHtml(tab3Label)}</button>${panels}
</kui-tabs>`;

    return [
      {
        label: 'HTML',
        language: 'html',
        code,
      },
    ];
  };

  protected variantOf(values: TabsPlaygroundValues): KuiTabsVariant {
    return values.variant;
  }

  protected sizeOf(values: TabsPlaygroundValues): KuiSize {
    return values.size;
  }

  protected orientationOf(values: TabsPlaygroundValues): KuiTabsOrientation {
    return values.orientation;
  }

  protected controlsPanelsOf(values: TabsPlaygroundValues): boolean {
    return values.controlsPanels;
  }

  protected invertedOf(values: TabsPlaygroundValues): boolean {
    return values.inverted;
  }

  protected showErrorOf(values: TabsPlaygroundValues): boolean {
    return values.showError;
  }

  protected labelOf(
    values: TabsPlaygroundValues,
    key: 'tab1Label' | 'tab2Label' | 'tab3Label',
    fallback: string,
  ): string {
    return values[key] || fallback;
  }
}
