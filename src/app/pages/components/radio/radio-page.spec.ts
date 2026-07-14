import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { RADIO_EXAMPLE_SOURCES } from '@generated/example-sources/radio.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { RADIO_DOCS_MANIFEST } from './radio.docs-manifest';
import { RadioPage } from './radio-page';

describe('RadioPage', () => {
  let fixture: ComponentFixture<RadioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioPage],
      providers: [
        provideKikitaUi(),
        provideRouter([]),
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native radio examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const radios = [...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-radio')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Radio');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'sizes',
      'disabled',
      'invalid',
      'signal-forms',
      'api',
      'accessibility',
    ]);
    expect(radios).toHaveLength(11);
    expect(radios.every((radio) => radio.type === 'radio')).toBe(true);
    expect(radios.some((radio) => radio.disabled)).toBe(true);
    expect(radios.some((radio) => radio.getAttribute('aria-invalid') === 'true')).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      RADIO_DOCS_MANIFEST.loadPage(),
      RADIO_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(RadioPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(RADIO_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-radio-example',
      'radio-disabled-example',
      'radio-invalid-example',
      'radio-size-example',
    ]);
    expect(Object.keys(RADIO_EXAMPLE_SOURCES).sort()).toEqual(
      [...RADIO_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
