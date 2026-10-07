import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButton } from '@kikita-labs/ui';

@Component({
  selector: 'app-playground-route-button',
  imports: [KuiButton, RouterLink],
  templateUrl: './playground-route-button.html',
  styleUrl: './playground-route-button.scss',
})
export class PlaygroundRouteButton {}
