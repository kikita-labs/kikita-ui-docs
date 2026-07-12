import { Component } from '@angular/core';
import { KuiCardDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-card-example',
  imports: [KuiCardDirective],
  templateUrl: './basic-card-example.html',
  styleUrl: './basic-card-example.scss',
})
export class BasicCardExample {}
