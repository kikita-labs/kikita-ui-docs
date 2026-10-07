import { Component } from '@angular/core';

import { KuiChip, KuiChipRemove } from '@kikita-labs/ui';

@Component({
  selector: 'app-chip-states-example',
  imports: [KuiChip, KuiChipRemove],
  templateUrl: './chip-states-example.html',
  styleUrl: './chip-states-example.scss',
})
export class ChipStatesExample {}
