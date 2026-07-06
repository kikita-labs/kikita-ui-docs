import { Component } from '@angular/core';
import { KuiFieldComponent, KuiInputDirective, KuiInputGroupDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-input-group-example',
  imports: [KuiFieldComponent, KuiInputDirective, KuiInputGroupDirective],
  templateUrl: './input-group-example.html',
  styleUrl: './input-group-example.scss',
})
export class InputGroupExample {}
