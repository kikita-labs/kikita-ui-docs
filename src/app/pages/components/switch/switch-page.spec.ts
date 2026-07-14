import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { SWITCH_EXAMPLE_SOURCES } from '@generated/example-sources/switch.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SWITCH_DOCS_MANIFEST } from './switch.docs-manifest';
import { SwitchPage } from './switch-page';

describe('SwitchPage', () => {
  let fixture: ComponentFixture<SwitchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchPage],
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

    fixture = TestBed.createComponent(SwitchPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves public sections and native switch examples', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const switches = [
      ...root.querySelectorAll<HTMLInputElement>('app-live-preview input.kui-switch'),
    ];

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Switch');
    expect(sectionIds).toEqual(['import', 'usage', 'sizes', 'api', 'accessibility']);
    expect(switches).toHaveLength(5);
    expect(switches.every((control) => control.type === 'checkbox')).toBe(true);
    expect(switches.every((control) => control.getAttribute('role') === 'switch')).toBe(true);
    expect(switches.some((control) => control.checked)).toBe(true);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      SWITCH_DOCS_MANIFEST.loadPage(),
      SWITCH_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(SwitchPage);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(SWITCH_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-switch-example',
      'switch-size-example',
    ]);
    expect(Object.keys(SWITCH_EXAMPLE_SOURCES).sort()).toEqual(
      [...SWITCH_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
