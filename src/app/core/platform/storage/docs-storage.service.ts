import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';

import { docsPlatformFailure, type DocsPlatformResult, docsPlatformSuccess } from '../result';

export type DocsStorageKey = `kikita-ui-docs.${string}`;

@Injectable({ providedIn: 'root' })
export class DocsStorageService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  public read<T>(
    key: DocsStorageKey,
    parse: (storedValue: string) => T | null,
  ): DocsPlatformResult<T | null> {
    const storage = this.getStorage();

    if (!storage.ok) {
      return storage;
    }

    try {
      const storedValue = storage.value.getItem(key);

      if (storedValue === null) {
        return docsPlatformSuccess(null);
      }

      const parsedValue = parse(storedValue);

      return parsedValue === null
        ? docsPlatformFailure('invalid')
        : docsPlatformSuccess(parsedValue);
    } catch (error: unknown) {
      return docsPlatformFailure(this.failureReason(error));
    }
  }

  public write<T>(
    key: DocsStorageKey,
    value: T,
    serialize: (currentValue: T) => string,
  ): DocsPlatformResult<void> {
    const storage = this.getStorage();

    if (!storage.ok) {
      return storage;
    }

    try {
      storage.value.setItem(key, serialize(value));

      return docsPlatformSuccess(undefined);
    } catch (error: unknown) {
      return docsPlatformFailure(this.failureReason(error));
    }
  }

  public remove(key: DocsStorageKey): DocsPlatformResult<void> {
    const storage = this.getStorage();

    if (!storage.ok) {
      return storage;
    }

    try {
      storage.value.removeItem(key);

      return docsPlatformSuccess(undefined);
    } catch (error: unknown) {
      return docsPlatformFailure(this.failureReason(error));
    }
  }

  private getStorage(): DocsPlatformResult<Storage> {
    if (!this.isBrowser) {
      return docsPlatformFailure('unavailable');
    }

    const storage = this.document.defaultView?.localStorage;

    return storage ? docsPlatformSuccess(storage) : docsPlatformFailure('unavailable');
  }

  private failureReason(error: unknown): 'denied' | 'failed' {
    return error instanceof Error &&
      (error.name === 'NotAllowedError' || error.name === 'SecurityError')
      ? 'denied'
      : 'failed';
  }
}
