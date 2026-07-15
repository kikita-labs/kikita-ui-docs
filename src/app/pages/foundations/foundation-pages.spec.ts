import { type Type } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';

import { AccessibilityPage } from './accessibility/accessibility-page';
import { DensityPage } from './density/density-page';
import { InstallationPage } from './installation/installation-page';
import { ThemingPage } from './theming/theming-page';
import { TokensPage } from './tokens/tokens-page';
import { TypographyPage } from './typography/typography-page';

interface FoundationPageCase {
  readonly component: Type<unknown>;
  readonly heading: string;
  readonly sections: readonly string[];
}

const FOUNDATION_PAGE_CASES: readonly FoundationPageCase[] = [
  {
    component: InstallationPage,
    heading: 'Installation',
    sections: ['Package registry', 'Angular CLI setup', 'Manual setup', 'Schematic options'],
  },
  {
    component: ThemingPage,
    heading: 'Theming',
    sections: ['Runtime contract', 'Angular provider', 'Custom seeds', 'Theme utilities'],
  },
  {
    component: TokensPage,
    heading: 'Tokens',
    sections: ['Token layers', 'Color seeds', 'Common scales'],
  },
  {
    component: TypographyPage,
    heading: 'Typography',
    sections: [
      'Import',
      'Usage',
      'Type roles',
      'Tone utilities',
      'Directive API',
      'Tokens',
      'Accessibility',
    ],
  },
  {
    component: DensityPage,
    heading: 'Density',
    sections: ['Density values', 'Global defaults', 'Control recommendations', 'Component tokens'],
  },
  {
    component: AccessibilityPage,
    heading: 'Accessibility',
    sections: ['Baseline rules', 'Review levels', 'Docs examples', 'Coverage notes'],
  },
];

describe('foundation pages', () => {
  for (const pageCase of FOUNDATION_PAGE_CASES) {
    it(`preserves the ${pageCase.heading} page contract`, async () => {
      await TestBed.configureTestingModule({
        imports: [pageCase.component],
        providers: [provideKikitaUi()],
      }).compileComponents();

      const fixture: ComponentFixture<unknown> = TestBed.createComponent(pageCase.component);
      fixture.detectChanges();
      const root = fixture.nativeElement as HTMLElement;

      expect(root.querySelector('h1')?.textContent?.trim()).toBe(pageCase.heading);
      expect(
        [...root.querySelectorAll('h2')].map((heading) => heading.textContent?.trim()),
      ).toEqual(pageCase.sections);
      expect(root.querySelector('article')).not.toBeNull();
    });
  }

  it('reports the installed package version on the installation page', async () => {
    await TestBed.configureTestingModule({
      imports: [InstallationPage],
      providers: [provideKikitaUi()],
    }).compileComponents();

    const fixture = TestBed.createComponent(InstallationPage);
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      `@kikita-labs/ui v${KIKITA_UI_PACKAGE_VERSION}`,
    );
  });
});
