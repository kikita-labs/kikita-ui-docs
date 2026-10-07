import { Component } from '@angular/core';

import { KuiAccordion, KuiAccordionIcon, KuiAccordionItem, KuiIcon } from '@kikita-labs/ui';

@Component({
  selector: 'app-icon-accordion-example',
  imports: [KuiAccordion, KuiAccordionIcon, KuiAccordionItem, KuiIcon],
  templateUrl: './icon-accordion-example.html',
  styleUrl: './icon-accordion-example.scss',
})
export class IconAccordionExample {}
