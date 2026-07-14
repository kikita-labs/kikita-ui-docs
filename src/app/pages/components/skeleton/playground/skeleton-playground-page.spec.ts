import { signal } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsClipboardService } from '@core/platform/clipboard';
import { DocsPointerDragService } from '@core/platform/pointer';
import { DocsThemeService } from '@core/theme';
import { expectNoAxeViolations } from '@shared/docs-ui/testing';

import { SkeletonPlaygroundPage } from './skeleton-playground-page';

describe('SkeletonPlaygroundPage', () => {
  let fixture: ComponentFixture<SkeletonPlaygroundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPlaygroundPage],
      providers: [
        provideKikitaUi(),
        { provide: DocsPointerDragService, useValue: { start: vi.fn() } },
        {
          provide: DocsClipboardService,
          useValue: { writeText: vi.fn().mockResolvedValue({ ok: true, value: undefined }) },
        },
        { provide: DocsThemeService, useValue: { codeThemeId: signal('github-dark-default') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonPlaygroundPage);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('updates the preview and emits a minimal public-API snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const optionButtons = [...root.querySelectorAll<HTMLButtonElement>('[role="radio"]')];

    optionButtons.find((button) => button.textContent?.trim() === 'circle')?.click();
    optionButtons.find((button) => button.textContent?.trim() === 'pulse')?.click();

    fixture.detectChanges();

    const previewSkeleton = root.querySelector<HTMLElement>('span.kui-skeleton');
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');

    expect(previewSkeleton?.getAttribute('aria-hidden')).toBe('true');
    expect(previewSkeleton?.getAttribute('data-kui-shape')).toBe('circle');
    expect(previewSkeleton?.getAttribute('data-kui-animation')).toBe('pulse');
    expect(snippet?.textContent).toBe(
      '<span kuiSkeleton shape="circle" animation="pulse" style="inline-size: 140px"></span>',
    );
  });

  it('omits installed defaults from the generated snippet', () => {
    const root = fixture.nativeElement as HTMLElement;
    const snippet = root.querySelector<HTMLElement>('.code-tabs__fallback code');
    const previewSkeleton = root.querySelector<HTMLElement>('span.kui-skeleton');

    expect(previewSkeleton?.getAttribute('data-kui-shape')).toBe('rect');
    expect(previewSkeleton?.getAttribute('data-kui-animation')).toBe('shimmer');
    expect(snippet?.textContent).toBe('<span kuiSkeleton style="inline-size: 140px"></span>');
  });

  it('has no automated accessibility violations', async () => {
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });
});
