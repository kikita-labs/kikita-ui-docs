import { Component } from '@angular/core';

import { KuiIcon, type KuiIconGlyph } from '@kikita-labs/ui';

@Component({
  selector: 'app-icon-glyph-example',
  imports: [KuiIcon],
  templateUrl: './icon-glyph-example.html',
  styleUrl: './icon-glyph-example.scss',
})
export class IconGlyphExample {
  /** Glyph data is plain data drawn through an allowlist, so it is safe from any source. */
  protected readonly gauge: KuiIconGlyph = {
    node: [
      ['path', { d: 'M12 14l4-4' }],
      ['path', { d: 'M3.34 19a10 10 0 1 1 17.32 0' }],
    ],
  };
}
