import { Component, input } from '@angular/core';

import { DocSection } from '../doc-section';
import { type ChartDocsType } from './interfaces/chart-docs-type';

/** The accessibility and known-gaps sections the four chart pages share. */
@Component({
  selector: 'app-chart-accessibility-sections',
  imports: [DocSection],
  templateUrl: './chart-accessibility-sections.html',
  styleUrl: './chart-sections.scss',
})
export class ChartAccessibilitySections {
  /** The chart type the page documents. */
  public readonly type = input.required<ChartDocsType>();
}
