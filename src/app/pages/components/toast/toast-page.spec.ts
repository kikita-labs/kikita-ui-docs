import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { TOAST_EXAMPLE_SOURCES } from '@generated/example-sources/toast.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { TOAST_DOCS_MANIFEST } from './toast.docs-manifest';
import { ToastPage } from './toast-page';

describe('ToastPage', () => {
  let fixture: ComponentFixture<ToastPage>;

  beforeEach(async () => {
    document.querySelectorAll('kui-toast-region').forEach((region) => region.remove());

    await TestBed.configureTestingModule({
      imports: [ToastPage],
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

    fixture = TestBed.createComponent(ToastPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  afterEach(() => {
    document.querySelectorAll('kui-toast-region').forEach((region) => region.remove());
  });

  it('preserves the public page sections and toast trigger matrix', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );
    const triggerLabels = [...root.querySelectorAll<HTMLButtonElement>('app-live-preview button')]
      .map((button) => button.textContent?.trim())
      .filter(Boolean);

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Toast');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'with-action',
      'positions',
      'global-defaults',
      'api',
      'accessibility',
    ]);
    expect(triggerLabels).toEqual([
      'Neutral',
      'Success',
      'Warning',
      'Danger',
      'Info',
      'Delete message',
      'top-start',
      'top-center',
      'top-end',
      'bottom-start',
      'bottom-center',
      'bottom-end',
    ]);
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      TOAST_DOCS_MANIFEST.loadPage(),
      TOAST_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(ToastPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(TOAST_DOCS_MANIFEST.exampleIds).toEqual([
      'basic-toast-example',
      'toast-action-example',
      'toast-position-example',
    ]);
    expect(Object.keys(TOAST_EXAMPLE_SOURCES).sort()).toEqual(
      [...TOAST_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
