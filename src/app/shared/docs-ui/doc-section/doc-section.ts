import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-doc-section',
  imports: [],
  templateUrl: './doc-section.html',
  styleUrl: './doc-section.scss',
})
export class DocSection {
  readonly title = input.required<string>();
  readonly description = input<string>();

  protected readonly headingId = computed(() =>
    this.title()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
  );
}
