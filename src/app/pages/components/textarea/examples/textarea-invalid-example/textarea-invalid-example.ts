import { Component } from '@angular/core';
import { KuiFieldComponent, KuiTextareaDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-textarea-invalid-example',
  imports: [KuiFieldComponent, KuiTextareaDirective],
  templateUrl: './textarea-invalid-example.html',
  styleUrl: './textarea-invalid-example.scss',
})
export class TextareaInvalidExample {}
