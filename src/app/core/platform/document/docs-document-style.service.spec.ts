import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsDocumentStyleService } from './docs-document-style.service';

describe('DocsDocumentStyleService', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-kui-theme');
    document.documentElement.removeAttribute('data-kui-contrast');
    document.documentElement.classList.remove('docs-scroll-locked');
    document.documentElement.style.removeProperty('color-scheme');
    document.getElementById('test-theme')?.remove();
    TestBed.resetTestingModule();
  });

  it('owns root theme and stylesheet DOM effects', () => {
    TestBed.configureTestingModule({ providers: [DocsDocumentStyleService] });
    const styles = TestBed.inject(DocsDocumentStyleService);

    expect(styles.setRootTheme('dark').ok).toBe(true);
    expect(styles.setRootContrast('soft').ok).toBe(true);
    expect(document.documentElement.dataset['kuiContrast']).toBe('soft');
    expect(styles.setRootContrast(null).ok).toBe(true);
    expect(document.documentElement.hasAttribute('data-kui-contrast')).toBe(false);
    expect(styles.setRootScrollLocked(true).ok).toBe(true);
    expect(styles.applyStyleSheet('test-theme', ':root { --test: 1; }').ok).toBe(true);
    expect(document.documentElement.dataset['kuiTheme']).toBe('dark');
    expect(document.documentElement.classList.contains('docs-scroll-locked')).toBe(true);
    expect(document.getElementById('test-theme')?.textContent).toContain('--test: 1');
  });

  it('returns an unavailable server fallback without mutating the DOM', () => {
    TestBed.configureTestingModule({
      providers: [DocsDocumentStyleService, { provide: PLATFORM_ID, useValue: 'server' }],
    });
    const styles = TestBed.inject(DocsDocumentStyleService);

    expect(styles.setRootTheme('dark')).toEqual({ ok: false, reason: 'unavailable' });
    expect(styles.setRootContrast('soft')).toEqual({ ok: false, reason: 'unavailable' });
    expect(styles.setRootScrollLocked(true)).toEqual({ ok: false, reason: 'unavailable' });
    expect(styles.applyStyleSheet('test-theme', 'body {}')).toEqual({
      ok: false,
      reason: 'unavailable',
    });
    expect(document.getElementById('test-theme')).toBeNull();
  });
});
