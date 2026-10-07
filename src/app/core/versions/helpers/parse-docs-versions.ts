import { DOCS_VERSION_STATUSES } from '../constants';
import type { DocsVersion } from '../interfaces';
import type { DocsVersionStatus } from '../types';

const SAME_ORIGIN_PATH_PATTERN = /^\/(?!\/)/;

/** Validates untrusted `versions.json` content; returns `null` unless the whole list is usable. */
export function parseDocsVersions(value: unknown): readonly DocsVersion[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const versions: DocsVersion[] = [];

  for (const entry of value) {
    const version = parseDocsVersion(entry);

    if (!version) {
      return null;
    }

    versions.push(version);
  }

  const latestCount = versions.filter((version) => version.status === 'latest').length;

  return latestCount === 1 ? versions : null;
}

function parseDocsVersion(entry: unknown): DocsVersion | null {
  if (typeof entry !== 'object' || entry === null) {
    return null;
  }

  const id: unknown = Reflect.get(entry, 'id');
  const label: unknown = Reflect.get(entry, 'label');
  const path: unknown = Reflect.get(entry, 'path');
  const status: unknown = Reflect.get(entry, 'status');

  if (
    typeof id !== 'string' ||
    typeof label !== 'string' ||
    typeof path !== 'string' ||
    !id ||
    !label ||
    !SAME_ORIGIN_PATH_PATTERN.test(path) ||
    !path.endsWith('/') ||
    !isDocsVersionStatus(status)
  ) {
    return null;
  }

  return { id, label, path, status };
}

function isDocsVersionStatus(value: unknown): value is DocsVersionStatus {
  return DOCS_VERSION_STATUSES.some((status) => status === value);
}
