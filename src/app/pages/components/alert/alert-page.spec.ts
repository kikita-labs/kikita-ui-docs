import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { ALERT_EXAMPLE_SOURCES } from '@generated/example-sources/alert.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { ALERT_DOCS_MANIFEST } from './alert.docs-manifest';
import { AlertPage } from './alert-page';

describe('AlertPage', () => {
  let fixture: ComponentFixture<AlertPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPage],
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

    fixture = TestBed.createComponent(AlertPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Alert');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'shapes',
      'actions',
      'custom-content',
      'banner',
      'provider-defaults',
      'theming-tokens',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('announces danger assertively and every other appearance politely', () => {
    const root = fixture.nativeElement as HTMLElement;
    const alerts = [...root.querySelectorAll<HTMLElement>('app-live-preview kui-alert')];
    const assertive = alerts.filter((alert) => alert.getAttribute('role') === 'alert');
    const polite = alerts.filter((alert) => alert.getAttribute('role') === 'status');

    expect(alerts).toHaveLength(12);
    expect(assertive).toHaveLength(2);
    expect(assertive.every((alert) => alert.getAttribute('aria-live') === 'assertive')).toBe(true);
    expect(polite).toHaveLength(10);
    expect(polite.every((alert) => alert.getAttribute('aria-live') === 'polite')).toBe(true);
  });

  it('hides a dismissed alert only because the consumer removes it', () => {
    const root = fixture.nativeElement as HTMLElement;
    const actionPreview = root.querySelector<HTMLElement>('#actions')?.closest('app-doc-section');
    const close = actionPreview?.querySelector<HTMLButtonElement>(
      'kui-alert button[kuiIconButton]',
    );

    expect(actionPreview?.querySelector('kui-alert')).not.toBeNull();

    close?.click();
    fixture.detectChanges();

    expect(actionPreview?.querySelector('kui-alert')).toBeNull();
    expect(actionPreview?.textContent).toContain('Show the alert again');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      ALERT_DOCS_MANIFEST.loadPage(),
      ALERT_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(AlertPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(ALERT_EXAMPLE_SOURCES).sort()).toEqual(
      [...ALERT_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
