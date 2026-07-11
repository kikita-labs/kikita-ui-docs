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
import { NUMBER_INPUT_API_ROWS } from './number-input.api-schema';
import { BasicNumberInputExample } from './examples/basic-number-input-example/basic-number-input-example';
import { CompactNumberInputExample } from './examples/compact-number-input-example/compact-number-input-example';
import { RangeNumberInputExample } from './examples/range-number-input-example/range-number-input-example';
import { FieldNumberInputExample } from './examples/field-number-input-example/field-number-input-example';

@Component({
  selector: 'app-number-input-page',
  imports: [
    ApiTable,
    BasicNumberInputExample,
    CodeTabs,
    CompactNumberInputExample,
    DocSection,
    FieldNumberInputExample,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RangeNumberInputExample,
    RouterLink,
  ],
  templateUrl: './number-input-page.html',
  styleUrl: './number-input-page.scss',
})
export class NumberInputPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = NUMBER_INPUT_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'number-input.ts',
      language: 'ts',
      code: `import { KuiNumberInputDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'basic-number-input-example.html',
      language: 'html',
      code: `<input type="number" kuiNumberInput min="0" max="100" aria-label="Quantity" value="4" />
<input type="number" kuiNumberInput size="sm" min="0" max="10" aria-label="Small quantity" value="2" />
<input type="number" kuiNumberInput disabled min="0" max="10" aria-label="Disabled quantity" value="3" />`,
    },
    {
      label: 'TS',
      filename: 'basic-number-input-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-number-input-example',
  imports: [KuiNumberInputDirective],
  templateUrl: './basic-number-input-example.html',
  styleUrl: './basic-number-input-example.scss',
})
export class BasicNumberInputExample {}`,
    },
  ];

  protected readonly compactTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'compact-number-input-example.html',
      language: 'html',
      code: `<!-- Compact: stacked arrows on the right -->
<input type="number" kuiNumberInput variant="a" min="0" max="99" aria-label="Compact quantity" value="12" />

<!-- Default: minus/plus controls on the sides -->
<input type="number" kuiNumberInput variant="b" min="0" max="99" aria-label="Default quantity" value="12" />`,
    },
  ];

  protected readonly rangeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'range-number-input-example.html',
      language: 'html',
      code: `<!-- Steps by 5 -->
<input type="number" kuiNumberInput min="0" max="20" step="5" aria-label="Step of five" value="10" />

<!-- Invalid state -->
<input type="number" kuiNumberInput invalid min="1" max="10" aria-label="Invalid quantity" value="0" />`,
    },
  ];

  protected readonly fieldTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'field-number-input-example.html',
      language: 'html',
      code: `<kui-field label="Seats" hint="Choose between 1 and 10 seats">
  <input type="number" kuiNumberInput min="1" max="10" value="4" />
</kui-field>

<kui-field label="Discount" error="Discount must be at least 0%" required>
  <input type="number" kuiNumberInput invalid min="0" max="100" value="-5" />
</kui-field>`,
    },
    {
      label: 'TS',
      filename: 'field-number-input-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiFieldComponent, KuiNumberInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-field-number-input-example',
  imports: [KuiFieldComponent, KuiNumberInputDirective],
  templateUrl: './field-number-input-example.html',
  styleUrl: './field-number-input-example.scss',
})
export class FieldNumberInputExample {}`,
    },
  ];

  protected readonly signalFormsTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'signal-forms-number-input.html',
      language: 'html',
      code: `<kui-field label="Count" hint="Enter a value from 1 to 100">
  <input type="number" kuiNumberInput [formField]="profileForm.count" />
</kui-field>`,
    },
  ];
}
