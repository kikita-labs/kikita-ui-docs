import { Component, signal } from '@angular/core';
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
}
