import { Component } from '@angular/core';

import { KuiButtonDirective, KuiLoaderDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-loader-button-example',
  imports: [KuiButtonDirective, KuiLoaderDirective],
  templateUrl: './loader-button-example.html',
  styleUrl: './loader-button-example.scss',
})
export class LoaderButtonExample {}
