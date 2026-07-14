import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocsPointerDragService } from './docs-pointer-drag.service';

describe('DocsPointerDragService', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('publishes horizontal deltas and removes listeners when the gesture ends', () => {
    TestBed.configureTestingModule({ providers: [DocsPointerDragService] });
    const drag = TestBed.inject(DocsPointerDragService);
    const onDelta = vi.fn();
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    const startEvent = createPointerStartEvent(10);

    expect(drag.start(startEvent, onDelta).ok).toBe(true);
    window.dispatchEvent(new MouseEvent('pointermove', { clientX: 42 }));
    expect(onDelta).toHaveBeenCalledWith(32);

    window.dispatchEvent(new Event('pointerup'));
    expect(removeEventListener).toHaveBeenCalledWith('pointermove', expect.any(Function));
  });

  it('cleans up an active gesture when the service is destroyed', () => {
    TestBed.configureTestingModule({ providers: [DocsPointerDragService] });
    const removeEventListener = vi.spyOn(window, 'removeEventListener');

    TestBed.inject(DocsPointerDragService).start(createPointerStartEvent(0), vi.fn());
    TestBed.resetTestingModule();

    expect(removeEventListener).toHaveBeenCalledWith('pointermove', expect.any(Function));
  });

  it('returns a server fallback without registering listeners', () => {
    const addEventListener = vi.spyOn(window, 'addEventListener');

    TestBed.configureTestingModule({
      providers: [DocsPointerDragService, { provide: PLATFORM_ID, useValue: 'server' }],
    });

    expect(
      TestBed.inject(DocsPointerDragService).start(createPointerStartEvent(0), vi.fn()),
    ).toEqual({ ok: false, reason: 'unavailable' });
    expect(addEventListener).not.toHaveBeenCalledWith('pointermove', expect.any(Function));
  });

  function createPointerStartEvent(clientX: number): PointerEvent {
    return {
      clientX,
      currentTarget: null,
      pointerId: 1,
      preventDefault: vi.fn(),
    } as unknown as PointerEvent;
  }
});
