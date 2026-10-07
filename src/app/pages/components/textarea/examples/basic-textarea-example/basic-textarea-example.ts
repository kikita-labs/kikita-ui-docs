import { Component } from '@angular/core';

import { KuiField, KuiTextarea } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-textarea-example',
  imports: [KuiField, KuiTextarea],
  templateUrl: './basic-textarea-example.html',
  styleUrl: './basic-textarea-example.scss',
})
export class BasicTextareaExample {}
