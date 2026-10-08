import { isStandalone, signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsThemeService } from '@core/theme';
import { OTP_INPUT_EXAMPLE_SOURCES } from '@generated/example-sources/otp-input.generated';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { OTP_INPUT_DOCS_MANIFEST } from './otp-input.docs-manifest';
import { OtpInputPage } from './otp-input-page';

describe('OtpInputPage', () => {
  let fixture: ComponentFixture<OtpInputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpInputPage],
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

    fixture = TestBed.createComponent(OtpInputPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('preserves the public page sections', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('OTP Input');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'variants',
      'field',
      'provider-defaults',
      'messages',
      'api',
      'accessibility',
      'known-gaps',
    ]);
  });

  it('renders named groups of cells with the configured lengths and masks', () => {
    const root = fixture.nativeElement as HTMLElement;
    const groups = [...root.querySelectorAll<HTMLElement>('app-live-preview kui-otp-input')];

    expect(groups.map((group) => group.querySelectorAll('input').length)).toEqual([6, 4, 8, 6]);
    expect(groups[1]?.querySelector('input')?.getAttribute('type')).toBe('password');
    expect(groups[0]?.querySelector('input')?.getAttribute('autocomplete')).toBe('one-time-code');
  });

  it('reports the completed code once every cell is filled', () => {
    const root = fixture.nativeElement as HTMLElement;
    const group = root.querySelector<HTMLElement>('app-live-preview kui-otp-input');
    const cells = [...(group?.querySelectorAll<HTMLInputElement>('input') ?? [])];

    cells.forEach((cell, index) => {
      cell.value = String(index + 1);
      cell.dispatchEvent(new Event('input', { bubbles: true }));
    });
    fixture.detectChanges();

    expect(root.textContent).toContain('Completed: 123456');
  });

  it('keeps manifest loaders and generated example ownership aligned', async () => {
    const [pageType, playgroundType] = await Promise.all([
      OTP_INPUT_DOCS_MANIFEST.loadPage(),
      OTP_INPUT_DOCS_MANIFEST.loadPlayground(),
    ]);

    expect(pageType).toBe(OtpInputPage);
    expect(playgroundType).not.toBe(pageType);
    expect(isStandalone(playgroundType)).toBe(true);
    expect(Object.keys(OTP_INPUT_EXAMPLE_SOURCES).sort()).toEqual(
      [...OTP_INPUT_DOCS_MANIFEST.exampleIds].sort(),
    );
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
