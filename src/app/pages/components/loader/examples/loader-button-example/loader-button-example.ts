import { Component } from '@angular/core';

import { KuiButton, KuiLoader } from '@kikita-labs/ui';

@Component({
  selector: 'app-loader-button-example',
  imports: [KuiButton, KuiLoader],
  templateUrl: './loader-button-example.html',
  styleUrl: './loader-button-example.scss',
})
export class LoaderButtonExample {}
