import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-basic-button-example',
  imports: [KuiButtonDirective, RouterLink],
  templateUrl: './basic-button-example.html',
  styleUrl: './basic-button-example.scss',
})
export class BasicButtonExample {}
