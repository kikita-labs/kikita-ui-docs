import { vi } from 'vitest';

vi.setConfig({ testTimeout: 15_000 });

class TestResizeObserver {
  public observe(): void {
    return undefined;
  }

  public unobserve(): void {
    return undefined;
  }

  public disconnect(): void {
    return undefined;
  }
}

vi.stubGlobal('ResizeObserver', TestResizeObserver);

const realFetch = globalThis.fetch?.bind(globalThis);
const STUB_LUCIDE_ICON_SVG = '<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" /></svg>';

vi.stubGlobal('fetch', (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

  if (url.startsWith('https://cdn.jsdelivr.net/npm/lucide-static')) {
    return Promise.resolve(new Response(STUB_LUCIDE_ICON_SVG, { status: 200 }));
  }

  return realFetch?.(input, init);
});
