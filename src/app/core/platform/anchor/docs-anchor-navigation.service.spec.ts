import { DOCUMENT, ViewportScroller } from '@angular/common';
import { PLATFORM_ID, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DocsMediaService } from '../media';
import { DocsAnchorNavigationService } from './docs-anchor-navigation.service';

describe('DocsAnchorNavigationService', () => {
  const navigate = vi.fn().mockResolvedValue(true);
  const getScrollPosition = vi.fn().mockReturnValue([0, 100]);
  const scrollToPosition = vi.fn();
  const prefersReducedMotion = signal(false);

  beforeEach(() => {
    navigate.mockClear();
    getScrollPosition.mockClear();
    scrollToPosition.mockClear();
    prefersReducedMotion.set(false);
    TestBed.configureTestingModule({
      providers: [
        DocsAnchorNavigationService,
        { provide: Router, useValue: { navigate } },
        { provide: ViewportScroller, useValue: { getScrollPosition, scrollToPosition } },
        { provide: DocsMediaService, useValue: { prefersReducedMotion } },
      ],
    });
  });

  afterEach(() => {
    document.getElementById('target')?.remove();
    TestBed.resetTestingModule();
  });

  it('updates the fragment, scrolls with the docs offset, and transfers focus', async () => {
    const heading = document.createElement('h2');
    const focus = vi.spyOn(heading, 'focus');

    heading.id = 'target';
    vi.spyOn(heading, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 20,
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    document.body.appendChild(heading);

    const result = await TestBed.inject(DocsAnchorNavigationService).navigate('target');

    expect(result.ok).toBe(true);
    expect(navigate).toHaveBeenCalledWith([], {
      fragment: 'target',
      queryParamsHandling: 'preserve',
    });
    expect(scrollToPosition).toHaveBeenCalledWith([0, 36], { behavior: 'smooth' });
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('uses instant scrolling when reduced motion is preferred', async () => {
    const heading = document.createElement('h2');

    heading.id = 'target';
    document.body.appendChild(heading);
    prefersReducedMotion.set(true);

    await TestBed.inject(DocsAnchorNavigationService).navigate('target');

    expect(scrollToPosition).toHaveBeenCalledWith(expect.any(Array), { behavior: 'auto' });
  });

  it('builds a stable absolute fragment URL', () => {
    const result = TestBed.inject(DocsAnchorNavigationService).urlFor('target');

    expect(result.ok && result.value).toBe(`${document.location.href.split('#')[0]}#target`);
  });

  it('returns a server fallback without navigation or DOM work', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        DocsAnchorNavigationService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: DOCUMENT, useValue: document },
        { provide: Router, useValue: { navigate } },
        { provide: ViewportScroller, useValue: { getScrollPosition, scrollToPosition } },
        { provide: DocsMediaService, useValue: { prefersReducedMotion } },
      ],
    });

    await expect(TestBed.inject(DocsAnchorNavigationService).navigate('target')).resolves.toEqual({
      ok: false,
      reason: 'unavailable',
    });
  });
});
