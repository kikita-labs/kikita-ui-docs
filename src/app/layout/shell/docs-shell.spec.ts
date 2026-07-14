import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router, type Routes } from '@angular/router';

import { DocsDocumentStyleService } from '@core/platform/document';
import { expectNoAxeViolations } from '@shared/docs-ui/testing/axe';

import { DocsShell } from './docs-shell';

@Component({
  template: '<h1>Test route</h1><p>Route content</p>',
})
class TestRoutePage {}

const TEST_ROUTES: Routes = [
  {
    path: '',
    component: TestRoutePage,
    pathMatch: 'full',
  },
  {
    path: 'docs',
    component: TestRoutePage,
  },
  {
    path: 'other-docs',
    component: TestRoutePage,
  },
  {
    path: 'missing',
    component: TestRoutePage,
    data: { docsLayout: 'not-found' },
  },
];

describe('DocsShell', () => {
  let fixture: ComponentFixture<DocsShell>;
  let router: Router;
  const setRootScrollLocked = vi.fn();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocsShell],
      providers: [
        provideRouter(TEST_ROUTES),
        {
          provide: DocsDocumentStyleService,
          useValue: {
            applyStyleSheet: vi.fn(),
            setRootScrollLocked,
            setRootTheme: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocsShell);
    router = TestBed.inject(Router);
  });

  it('uses the landing layout for the home route', async () => {
    await navigateTo('/');

    expect(query('.docs-shell__body--landing')).not.toBeNull();
    expect(query('.docs-shell__sidebar')).toBeNull();
    expect(query('app-page-toc')).toBeNull();
  });

  it('renders documentation navigation for a docs route', async () => {
    await navigateTo('/docs');

    expect(query('.docs-shell__body--landing')).toBeNull();
    expect(query('.docs-shell__sidebar')).not.toBeNull();
    expect(query('app-page-toc')).not.toBeNull();
    expect(menuToggle()).not.toBeNull();
  });

  it('opens mobile navigation and closes it after route navigation', async () => {
    await navigateTo('/docs');

    menuToggle()?.click();
    fixture.detectChanges();

    expect(query('.docs-shell__sidebar--open')).not.toBeNull();
    expect(query('.docs-shell__backdrop--open')).not.toBeNull();

    await navigateTo('/other-docs');

    expect(query('.docs-shell__sidebar--open')).toBeNull();
    expect(query('.docs-shell__backdrop--open')).toBeNull();
    expect(document.activeElement?.textContent).toContain('Test route');
  });

  it('exposes a modal focus boundary, inert content, and scroll lock while open', async () => {
    await navigateTo('/docs');

    menuToggle()?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(query('[role="dialog"][aria-modal="true"]')).not.toBeNull();
    expect(query('#main-content')?.hasAttribute('inert')).toBe(true);
    expect(setRootScrollLocked).toHaveBeenCalledWith(true);
    expect(fixture.nativeElement.querySelectorAll('.cdk-focus-trap-anchor')).toHaveLength(2);
  });

  it('closes on Escape and backdrop activation, then restores trigger focus', async () => {
    await navigateTo('/docs');
    const toggle = menuToggle();

    toggle?.click();
    fixture.detectChanges();
    query('[role="dialog"]')?.dispatchEvent(
      new KeyboardEvent('keydown', { bubbles: true, key: 'Escape' }),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    expect(query('[role="dialog"]')).toBeNull();
    expect(document.activeElement).toBe(toggle);

    toggle?.click();
    fixture.detectChanges();
    (query('.docs-shell__backdrop--open') as HTMLButtonElement | null)?.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(toggle);
  });

  it('moves focus to route content through the skip link', async () => {
    await navigateTo('/docs');

    (query('.sidebar-nav__skip') as HTMLAnchorElement | null)?.click();
    fixture.detectChanges();

    expect(document.activeElement?.tagName).toBe('H1');
    expect(document.activeElement?.textContent).toContain('Test route');
  });

  it('has no automated accessibility violations with navigation closed and open', async () => {
    await navigateTo('/docs');
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);

    menuToggle()?.click();
    fixture.detectChanges();
    await fixture.whenStable();
    await expectNoAxeViolations(fixture.nativeElement as HTMLElement);
  });

  it('uses the minimal framed layout for a not-found route', async () => {
    await navigateTo('/missing');

    expect(query('.docs-shell__body--framed')).not.toBeNull();
    expect(query('.docs-shell__sidebar')).toBeNull();
    expect(query('app-page-toc')).toBeNull();
    expect(query('.docs-header--minimal')).not.toBeNull();
  });

  async function navigateTo(url: string): Promise<void> {
    await router.navigateByUrl(url);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function query(selector: string): Element | null {
    return (fixture.nativeElement as HTMLElement).querySelector(selector);
  }

  function menuToggle(): HTMLButtonElement | null {
    const element = query('[aria-label="Toggle documentation navigation"]');

    return element instanceof HTMLButtonElement ? element : null;
  }
});
