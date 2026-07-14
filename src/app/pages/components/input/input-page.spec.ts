import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/input.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { INPUT_DOCS_MANIFEST } from './input.docs-manifest';
import { InputPage } from './input-page';

describe('InputPage', () => {
  let fixture: ComponentFixture<InputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPage],
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

    fixture = TestBed.createComponent(InputPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native input examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const inputs = [...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-input')];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Input');
    expect(sectionIds).toEqual(['import', 'usage', 'input-group', 'api', 'accessibility']);
    expect(inputs).toHaveLength(4);
    expect(inputs[0]?.type).toBe('email');
    expect(inputs[2]?.getAttribute('aria-invalid')).toBe('true');
    expect(root.querySelector('app-live-preview .kui-input-group')).not.toBeNull();
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      INPUT_DOCS_MANIFEST.loadPage(),
      INPUT_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(InputPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(INPUT_DOCS_MANIFEST.exampleIds).toEqual(['basic-input-example', 'input-group-example']);
    expect(Object.keys(INPUT_EXAMPLE_SOURCES).sort()).toEqual(
      [...INPUT_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
