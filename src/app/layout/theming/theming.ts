import { Component } from '@angular/core';
import {
  KuiIconButtonDirective,
  KuiPopoverComponent,
  KuiPopoverForDirective,
  kuiProvideFieldOptions,
} from '@kikita-labs/ui';
import { SeedColors } from './components/seed-colors/seed-colors';
import { Typography } from './components/typography/typography';

@Component({
  selector: 'app-theming',
  imports: [
    KuiIconButtonDirective,
    KuiPopoverComponent,
    KuiPopoverForDirective,
    SeedColors,
    Typography,
  ],
  providers: [kuiProvideFieldOptions({ size: 'sm' })],
  templateUrl: './theming.html',
  styleUrl: './theming.scss',
})
export class Theming {}
