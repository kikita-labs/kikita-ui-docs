import { Component, signal } from '@angular/core';

import {
  KuiStepComponent,
  KuiStepperComponent,
  type KuiStepperOrientation,
  type KuiStepperSize,
} from '@kikita-labs/ui';

import {
  ApiPlayground,
  definePlaygroundControls,
  type PlaygroundValues,
  serializePlaygroundAttributes,
} from '@shared/docs-ui/api-playground';
import { ApiTable } from '@shared/docs-ui/api-table';
import { type CodeTab } from '@shared/docs-ui/code-tabs';

import { STEPPER_API_ROWS } from '../stepper.api-schema';
import { STEPPER_API_DESCRIPTION } from '../stepper.docs-content';

const STEPPER_PLAYGROUND_CONTROLS = definePlaygroundControls([
  {
    key: 'orientation',
    label: 'orientation',
    kind: 'enum',
    options: ['horizontal', 'vertical'],
    defaultValue: 'horizontal',
  },
  { key: 'size', label: 'size', kind: 'enum', options: ['sm', 'md', 'lg'], defaultValue: 'md' },
  { key: 'linear', label: 'linear', kind: 'boolean', defaultValue: true },
  { key: 'compact', label: 'compact', kind: 'boolean', defaultValue: false },
  { key: 'reviewError', label: 'review error', kind: 'boolean', defaultValue: false },
] as const);

type StepperPlaygroundValues = PlaygroundValues<typeof STEPPER_PLAYGROUND_CONTROLS>;

@Component({
  selector: 'app-stepper-playground-page',
  imports: [ApiPlayground, ApiTable, KuiStepComponent, KuiStepperComponent],
  templateUrl: './stepper-playground-page.html',
  styleUrl: './stepper-playground-page.scss',
})
export class StepperPlaygroundPage {
  protected readonly apiDescription = STEPPER_API_DESCRIPTION;
  protected readonly apiRows = STEPPER_API_ROWS;
  protected readonly currentIndex = signal(1);
  protected readonly playgroundControls = STEPPER_PLAYGROUND_CONTROLS;

  protected readonly buildPlaygroundSnippet = (
    values: StepperPlaygroundValues,
  ): readonly CodeTab[] => {
    const attrString = serializePlaygroundAttributes([
      { name: 'orientation', value: values.orientation, defaultValue: 'horizontal' },
      { name: 'size', value: values.size, defaultValue: 'md' },
      { name: '[linear]', value: values.linear ? null : 'false' },
      { name: 'compact', value: values.compact },
    ]);
    const errorAttr = values.reviewError ? ' [hasError]="true"' : '';

    return [
      {
        label: 'HTML',
        language: 'html',
        code: `<kui-stepper [(currentIndex)]="currentIndex"${attrString}>
  <kui-step label="Details" description="Project basics" />
  <kui-step label="Team" description="Invite collaborators" />
  <kui-step label="Review" description="Confirm settings"${errorAttr} />
</kui-stepper>`,
      },
    ];
  };

  protected orientationOf(values: StepperPlaygroundValues): KuiStepperOrientation {
    return values.orientation;
  }

  protected sizeOf(values: StepperPlaygroundValues): KuiStepperSize {
    return values.size;
  }

  protected linearOf(values: StepperPlaygroundValues): boolean {
    return values.linear;
  }

  protected compactOf(values: StepperPlaygroundValues): boolean {
    return values.compact;
  }

  protected reviewErrorOf(values: StepperPlaygroundValues): boolean {
    return values.reviewError;
  }
}
