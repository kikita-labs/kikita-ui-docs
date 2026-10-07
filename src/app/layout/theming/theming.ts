import { Component } from '@angular/core';

import {
  KuiIcon,
  KuiIconButton,
  KuiPopover,
  KuiPopoverFor,
  provideKuiDefaults,
} from '@kikita-labs/ui';

import { SeedColors } from './components/seed-colors/seed-colors';
import { Typography } from './components/typography/typography';

@Component({
  selector: 'app-theming',
  imports: [KuiIconButton, KuiIcon, KuiPopover, KuiPopoverFor, SeedColors, Typography],
  providers: [provideKuiDefaults({ field: { size: 'sm' } })],
  templateUrl: './theming.html',
  styleUrl: './theming.scss',
})
export class Theming {}
