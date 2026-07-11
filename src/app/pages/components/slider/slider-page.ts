import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KuiButtonDirective } from '@kikita-labs/ui';
import { ApiTable } from '../../../shared/docs-ui/api-table/api-table';
import { KIKITA_UI_PACKAGE_VERSION } from '../../../core/package/kikita-ui-package-version';
import { CodeTab } from '../../../shared/docs-ui/code-tabs/code-tab';
import { CodeTabs } from '../../../shared/docs-ui/code-tabs/code-tabs';
import { DocSection } from '../../../shared/docs-ui/doc-section/doc-section';
import { LivePreview } from '../../../shared/docs-ui/live-preview/live-preview';
import { PageHeader } from '../../../shared/docs-ui/page-header/page-header';
import { SLIDER_API_ROWS } from './slider.api-schema';
import { BasicSliderExample } from './examples/basic-slider-example/basic-slider-example';
import { SliderRangeExample } from './examples/slider-range-example/slider-range-example';
import { SliderDisabledExample } from './examples/slider-disabled-example/slider-disabled-example';
import { SliderFieldExample } from './examples/slider-field-example/slider-field-example';

@Component({
  selector: 'app-slider-page',
  imports: [
    ApiTable,
    BasicSliderExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    SliderDisabledExample,
    SliderFieldExample,
    SliderRangeExample,
  ],
  templateUrl: './slider-page.html',
  styleUrl: './slider-page.scss',
})
export class SliderPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = SLIDER_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'slider.ts',
      language: 'ts',
      code: `import { KuiSliderDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'basic-slider-example.html',
      language: 'html',
      code: `<kui-field label="Volume" hint="Use arrow keys, Home, and End.">
  <input type="range" kuiSlider min="0" max="100" value="60" />
</kui-field>

<input
  type="range"
  kuiSlider
  color="success"
  size="lg"
  min="0"
  max="100"
  value="40"
  minLabel="0"
  maxLabel="100"
  aria-label="Progress"
/>`,
    },
    {
      label: 'TS',
      filename: 'basic-slider-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-slider-example',
  imports: [KuiFieldComponent, KuiSliderDirective],
  templateUrl: './basic-slider-example.html',
  styleUrl: './basic-slider-example.scss',
})
export class BasicSliderExample {}`,
    },
  ];

  protected readonly rangeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'slider-range-example.html',
      language: 'html',
      code: `<kui-field label="Playback speed" hint="min 0.5, max 2, step 0.25">
  <input type="range" kuiSlider min="0.5" max="2" step="0.25" value="1" minLabel="0.5x" maxLabel="2x" />
</kui-field>

<kui-field label="Rating" hint="min 1, max 5, step 1">
  <input type="range" kuiSlider min="1" max="5" step="1" value="3" minLabel="1" maxLabel="5" />
</kui-field>`,
    },
  ];

  protected readonly disabledTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'slider-disabled-example.html',
      language: 'html',
      code: `<kui-field label="Storage limit" hint="Disabled until a plan is selected.">
  <input type="range" kuiSlider min="0" max="100" value="25" disabled />
</kui-field>

<input type="range" kuiSlider min="0" max="100" value="70" invalid aria-label="Invalid slider" />`,
    },
  ];

  protected readonly fieldTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'slider-field-example.html',
      language: 'html',
      code: `<kui-field label="Volume" hint="Signal Forms native range binding">
  <input type="range" kuiSlider [formField]="settingsForm.volume" />
</kui-field>`,
    },
    {
      label: 'TS',
      filename: 'slider-field-example.ts',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import { form, FormField, max, min } from '@angular/forms/signals';
import { KuiFieldComponent, KuiSliderDirective } from '@kikita-labs/ui';

interface SettingsModel {
  readonly volume: number;
}

@Component({
  selector: 'app-slider-field-example',
  imports: [FormField, KuiFieldComponent, KuiSliderDirective],
  templateUrl: './slider-field-example.html',
  styleUrl: './slider-field-example.scss',
})
export class SliderFieldExample {
  private readonly settingsModel = signal<SettingsModel>({ volume: 60 });

  protected readonly settingsForm = form(this.settingsModel, (path) => {
    min(path.volume, 0);
    max(path.volume, 100);
  });
}`,
    },
  ];
}
