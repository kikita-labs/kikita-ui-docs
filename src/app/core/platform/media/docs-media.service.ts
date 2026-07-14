import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

@Injectable({ providedIn: 'root' })
export class DocsMediaService {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly darkSchemeState = toSignal(
    this.breakpointObserver.observe(DARK_SCHEME_QUERY).pipe(map((state) => state.matches)),
    { initialValue: false },
  );
  private readonly reducedMotionState = toSignal(
    this.breakpointObserver.observe(REDUCED_MOTION_QUERY).pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  public readonly prefersDarkScheme = computed(() => this.darkSchemeState());
  public readonly prefersReducedMotion = computed(() => this.reducedMotionState());
}
