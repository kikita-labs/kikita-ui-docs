import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { provideKikitaUi } from '@kikita-labs/ui';

import { TYPOGRAPHY_DOCS_MANIFEST } from './typography.docs-manifest';
import { TypographyPage } from './typography-page';

describe('TypographyPage', () => {
  let fixture: ComponentFixture<TypographyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyPage],
      providers: [provideKikitaUi()],
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyPage);
    fixture.detectChanges();
  });

  it('documents typography sections and rendered directive usage', () => {
    const root = fixture.nativeElement as HTMLElement;
    const sectionIds = [...root.querySelectorAll<HTMLHeadingElement>('h2')].map(
      (heading) => heading.id,
    );

    expect(root.querySelector('h1')?.textContent?.trim()).toBe('Typography');
    expect(sectionIds).toEqual([
      'import',
      'usage',
      'type-roles',
      'tone-utilities',
      'directive-api',
      'tokens',
      'accessibility',
    ]);
    expect(root.querySelector('[kuiText]')).not.toBeNull();
    expect(root.textContent).toContain('kuiText');
    expect(root.textContent).toContain('KuiTextVariant');
    expect(root.textContent).toContain('--kui-type-heading-md-size');
  });

  it('keeps the foundation manifest route aligned', async () => {
    await expect(TYPOGRAPHY_DOCS_MANIFEST.loadPage()).resolves.toBe(TypographyPage);
  });
});
