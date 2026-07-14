import { Component } from '@angular/core';

import { KuiChipDirective, KuiChipRemoveDirective } from '@kikita-labs/ui';

@Component({
  selector: 'app-chip-states-example',
  imports: [KuiChipDirective, KuiChipRemoveDirective],
  templateUrl: './chip-states-example.html',
  styleUrl: './chip-states-example.scss',
})
export class ChipStatesExample {}
