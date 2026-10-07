import { Component } from '@angular/core';

import { KuiField, KuiTextarea } from '@kikita-labs/ui';

@Component({
  selector: 'app-textarea-invalid-example',
  imports: [KuiField, KuiTextarea],
  templateUrl: './textarea-invalid-example.html',
  styleUrl: './textarea-invalid-example.scss',
})
export class TextareaInvalidExample {}
