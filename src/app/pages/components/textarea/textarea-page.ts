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
import { TEXTAREA_API_ROWS } from './textarea.api-schema';
import { BasicTextareaExample } from './examples/basic-textarea-example/basic-textarea-example';
import { TextareaSizeExample } from './examples/textarea-size-example/textarea-size-example';
import { TextareaInvalidExample } from './examples/textarea-invalid-example/textarea-invalid-example';

@Component({
  selector: 'app-textarea-page',
  imports: [
    ApiTable,
    BasicTextareaExample,
    CodeTabs,
    DocSection,
    KuiButtonDirective,
    LivePreview,
    PageHeader,
    RouterLink,
    TextareaInvalidExample,
    TextareaSizeExample,
  ],
  templateUrl: './textarea-page.html',
  styleUrl: './textarea-page.scss',
})
export class TextareaPage {
  protected readonly status = `Stable - @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`;
  protected readonly apiDescription = `Inputs verified against @kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION} public typings.`;
  protected readonly apiRows = TEXTAREA_API_ROWS;

  protected readonly importTabs: readonly CodeTab[] = [
    {
      label: 'Import',
      filename: 'textarea.ts',
      language: 'ts',
      code: `import { KuiTextareaDirective } from '@kikita-labs/ui';`,
    },
  ];

  protected readonly basicTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'basic-textarea-example.html',
      language: 'html',
      code: `<kui-field label="Notes" hint="Internal project note">
  <textarea kuiTextarea rows="4" placeholder="Write a note"></textarea>
</kui-field>`,
    },
    {
      label: 'TS',
      filename: 'basic-textarea-example.ts',
      language: 'ts',
      code: `import { Component } from '@angular/core';
import { KuiFieldComponent, KuiTextareaDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-textarea-example',
  imports: [KuiFieldComponent, KuiTextareaDirective],
  templateUrl: './basic-textarea-example.html',
  styleUrl: './basic-textarea-example.scss',
})
export class BasicTextareaExample {}`,
    },
  ];

  protected readonly sizeTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'textarea-size-example.html',
      language: 'html',
      code: `<textarea kuiTextarea size="xs" rows="2" placeholder="Extra small"></textarea>
<textarea kuiTextarea size="sm" rows="2" placeholder="Small"></textarea>
<textarea kuiTextarea size="md" rows="2" placeholder="Medium (default)"></textarea>
<textarea kuiTextarea size="lg" rows="2" placeholder="Large"></textarea>`,
    },
  ];

  protected readonly invalidTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'textarea-invalid-example.html',
      language: 'html',
      code: `<kui-field label="Summary" error="Summary must be at least 20 characters" required>
  <textarea kuiTextarea rows="3" placeholder="Describe the change"></textarea>
</kui-field>

<kui-field label="Notes" hint="Standalone invalid state outside field error wiring">
  <textarea kuiTextarea invalid rows="3" placeholder="Write a note"></textarea>
</kui-field>`,
    },
  ];

  protected readonly signalFormsTabs: readonly CodeTab[] = [
    {
      label: 'HTML',
      filename: 'textarea-signal-forms-example.html',
      language: 'html',
      code: `<kui-field label="Description" hint="Short project description">
  <textarea kuiTextarea [formField]="profileForm.description"></textarea>
</kui-field>`,
    },
  ];
}
