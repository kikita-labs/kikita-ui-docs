import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

const STALE_CHUNK_PATTERN =
  /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk .* failed/i;

@Injectable({ providedIn: 'root' })
export class DocsStaleBuildReloadService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public reloadIfStaleChunk(error: unknown): boolean {
    if (!this.isBrowser || !this.isStaleChunkError(error)) {
      return false;
    }

    this.document.defaultView?.location.reload();

    return true;
  }

  private isStaleChunkError(error: unknown): boolean {
    const message = error instanceof Error ? error.message : String(error);

    return STALE_CHUNK_PATTERN.test(message);
  }
}
