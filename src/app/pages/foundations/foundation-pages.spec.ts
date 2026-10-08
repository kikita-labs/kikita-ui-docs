import { type Type } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { KIKITA_UI_PACKAGE_VERSION } from '@core/package';

import { AccessibilityPage } from './accessibility/accessibility-page';
import { AutoFocusPage } from './auto-focus/auto-focus-page';
import { DefaultsPage } from './defaults/defaults-page';
import { DensityPage } from './density/density-page';
import { FormsPage } from './forms/forms-page';
import { InstallationPage } from './installation/installation-page';
import { InternationalizationPage } from './internationalization/internationalization-page';
import { MigrationPage } from './migration/migration-page';
import { StructuralIconsPage } from './structural-icons/structural-icons-page';
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
    sections: [
      'Package registry',
      'Angular CLI setup',
      'Manual setup',
      'Schematic options',
      'Styles outside the CLI',
      'Icons and Content Security Policy',
      'Upgrading from 1.x',
    ],
  },
  {
    component: ThemingPage,
    heading: 'Theming',
    sections: [
      'Runtime contract',
      'Angular provider',
      'Overriding tokens',
      'Defaults, layers and density',
      'Contrast profiles',
      'Shared behaviour tokens',
      'Migrating to the colour roles',
      'Custom seeds',
      'Theme utilities',
    ],
  },
  {
    component: TokensPage,
    heading: 'Tokens',
    sections: [
      'Token layers',
      'Color seeds',
      'Fill, indicator and text roles',
      'Common scales',
      'Shared tokens',
      'Icon tokens',
      'Defaults that moved into CSS',
      'Removed in 2.0',
    ],
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
  {
    component: MigrationPage,
    heading: 'Migrating to 2.0',
    sections: [
      'Automatic migration',
      'Naming rule and renamed exports',
      'Provider defaults',
      'Locale and messages',
      'Icons',
      'Component behaviour',
      'Packaging and styles',
      'Token and style changes',
      'Chart behaviour',
      'Verify the upgrade',
    ],
  },
  {
    component: InternationalizationPage,
    heading: 'Internationalization',
    sections: [
      'Locale and messages',
      'Quick start',
      'Follow the language at runtime',
      'Override a subtree or one instance',
      'Writing a translation',
      'Where the locale comes from',
      'What the locale controls',
      'Accessibility and testing',
      'Reference',
    ],
  },
  {
    component: DefaultsPage,
    heading: 'Defaults',
    sections: [
      'When to use defaults',
      'Setting defaults',
      'Layers and merging',
      'Reactive values',
      'Global control size',
      'Clearable controls and tooltips',
      'Overlays',
      'Calendars, time, carousel and pagination',
      'Other primitives',
      'Structural icons',
      'Migrating from the token API',
    ],
  },
  {
    component: StructuralIconsPage,
    heading: 'Structural icons',
    sections: [
      'Replace a glyph',
      'Precedence',
      'Roles',
      'Component slots',
      'Glyph data',
      'Stroke width',
      'Accessibility, security and server rendering',
      'Not supported',
    ],
  },
  {
    component: AutoFocusPage,
    heading: 'Auto Focus',
    sections: ['Import and usage', 'Rules', 'API', 'Accessibility'],
  },
  {
    component: FormsPage,
    heading: 'Forms',
    sections: [
      'Signal Forms first',
      'Field-first pattern',
      'Custom field templates',
      'Controls that are not native elements',
      'Required and invalid state',
    ],
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
