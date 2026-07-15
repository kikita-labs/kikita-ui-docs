import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { KuiButtonDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-playground-route-button',
  imports: [KuiButtonDirective, RouterLink],
  templateUrl: './playground-route-button.html',
  styleUrl: './playground-route-button.scss',
})
export class PlaygroundRouteButton {}
