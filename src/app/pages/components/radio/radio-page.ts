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
import { RADIO_API_ROWS } from './radio.api-schema';
import { BasicRadioExample } from './examples/basic-radio-example/basic-radio-example';
import { RadioDisabledExample } from './examples/radio-disabled-example/radio-disabled-example';
import { RadioInvalidExample } from './examples/radio-invalid-example/radio-invalid-example';
import { RadioSizeExample } from './examples/radio-size-example/radio-size-example';

@Component({
  selector: 'app-radio-page',
  imports: [
    ApiTable,
    BasicRadioExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RadioDisabledExample,
    RadioInvalidExample,
    RadioSizeExample,
    RouterLink,
  ],
  templateUrl: './radio-page.html',
  styleUrl: './radio-page.scss',
})
export class RadioPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = RADIO_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'radio.ts',
      language: 'ts',
      code: `import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Plan" hint="Choose a billing plan">
  <div role="radiogroup" aria-label="Plan">
    <label>
      <input kuiRadio type="radio" name="plan" value="starter" [checked]="plan() === 'starter'" (change)="plan.set('starter')" />
      Starter
    </label>
    <label>
      <input kuiRadio type="radio" name="plan" value="pro" [checked]="plan() === 'pro'" (change)="plan.set('pro')" />
      Pro
    </label>
  </div>
</kui-field>`,
    },
    {
      label: 'TS',
      language: 'ts',
      code: `import { Component, signal } from '@angular/core';
import { KuiFieldComponent, KuiRadioDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-radio-example',
  imports: [KuiFieldComponent, KuiRadioDirective],
  templateUrl: './basic-radio-example.html',
  styleUrl: './basic-radio-example.scss',
})
export class BasicRadioExample {
  protected readonly plan = signal('starter');
}`,
    },
  ];

  protected readonly signalFormsTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Plan" hint="Choose a billing plan">
  <label>
    <input kuiRadio type="radio" name="plan" value="pro" [formField]="billingForm.plan" />
    Pro
  </label>
</kui-field>`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<label>
  <input kuiRadio type="radio" name="radio-size-xs" size="xs" checked />
  Extra small
</label>
<label>
  <input kuiRadio type="radio" name="radio-size-sm" size="sm" checked />
  Small
</label>
<label>
  <input kuiRadio type="radio" name="radio-size-md" size="md" checked />
  Medium
</label>
<label>
  <input kuiRadio type="radio" name="radio-size-lg" size="lg" checked />
  Large
</label>`,
    },
  ];

  protected readonly disabledTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<div role="radiogroup" aria-label="Delivery speed">
  <label>
    <input kuiRadio type="radio" name="delivery" value="standard" checked />
    Standard
  </label>
  <label>
    <input kuiRadio type="radio" name="delivery" value="express" />
    Express
  </label>
  <label>
    <input kuiRadio type="radio" name="delivery" value="same-day" disabled />
    Same day (unavailable in this region)
  </label>
</div>`,
    },
  ];

  protected readonly invalidTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      language: 'html',
      code: `<kui-field label="Payment method" error="Select a payment method to continue" required>
  <div role="radiogroup" aria-label="Payment method">
    <label>
      <input kuiRadio type="radio" name="payment" value="card" />
      Card
    </label>
    <label>
      <input kuiRadio type="radio" name="payment" value="bank-transfer" />
      Bank transfer
    </label>
  </div>
</kui-field>`,
    },
  ];
}
