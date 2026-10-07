import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButton } from '@kikita-labs/ui';

@Component({
  selector: 'app-button-link-example',
  imports: [KuiButton, RouterLink],
  templateUrl: './button-link-example.html',
  styleUrl: './button-link-example.scss',
})
export class ButtonLinkExample {}
