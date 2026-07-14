export type DocsPlatformFailureReason = 'denied' | 'failed' | 'invalid' | 'unavailable';

export type DocsPlatformResult<T> =
  | {
      readonly ok: true;
      readonly value: T;
    }
  | {
      readonly ok: false;
      readonly reason: DocsPlatformFailureReason;
    };

export function docsPlatformSuccess<T>(value: T): DocsPlatformResult<T> {
  return { ok: true, value };
}

export function docsPlatformFailure<T>(reason: DocsPlatformFailureReason): DocsPlatformResult<T> {
  return { ok: false, reason };
}
