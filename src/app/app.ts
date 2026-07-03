import { Component } from '@angular/core';
import {
  KuiButtonDirective,
  KuiCardDirective,
  KuiFieldComponent,
  KuiInputDirective,
} from '@kikita-labs/ui';

@Component({
  selector: 'app-root',
  imports: [
    KuiButtonDirective,
    KuiCardDirective,
    KuiFieldComponent,
    KuiInputDirective,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly packageName = '@kikita-labs/ui';
}
