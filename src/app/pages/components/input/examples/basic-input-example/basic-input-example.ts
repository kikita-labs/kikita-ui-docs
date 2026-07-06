import { Component } from '@angular/core';
import { KuiFieldComponent, KuiInputDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-input-example',
  imports: [KuiFieldComponent, KuiInputDirective],
  templateUrl: './basic-input-example.html',
  styleUrl: './basic-input-example.scss',
})
export class BasicInputExample {}
