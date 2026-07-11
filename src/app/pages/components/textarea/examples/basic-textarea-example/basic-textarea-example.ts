import { Component } from '@angular/core';
import { KuiFieldComponent, KuiTextareaDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-textarea-example',
  imports: [KuiFieldComponent, KuiTextareaDirective],
  templateUrl: './basic-textarea-example.html',
  styleUrl: './basic-textarea-example.scss',
})
export class BasicTextareaExample {}
