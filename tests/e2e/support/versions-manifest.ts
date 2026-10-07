import { readFileSync } from 'node:fs';

// The page under test documents the installed library major; the mocked manifest pretends that a
// newer major exists, so the suite keeps working across library majors.
const PACKAGE_JSON: { dependencies: Record<string, string> } = JSON.parse(
  readFileSync('package.json', 'utf8'),
);
const CURRENT_MAJOR = Number.parseInt(PACKAGE_JSON.dependencies['@kikita-labs/ui'], 10);
export const CURRENT_ID = `v${CURRENT_MAJOR}`;
export const NEWER_ID = `v${CURRENT_MAJOR + 1}`;
export const VERSIONS_MANIFEST = [
  { id: NEWER_ID, label: NEWER_ID, path: '/', status: 'latest' },
  { id: CURRENT_ID, label: CURRENT_ID, path: `/${CURRENT_ID}/`, status: 'maintained' },
];
