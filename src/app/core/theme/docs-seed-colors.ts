import { createKuiTheme, DEFAULT_KUI_THEME } from '@kikita-labs/ui';

export const DOCS_DEFAULT_SEED_COLORS = {
  primary: '#5b4fe0',
  neutral: '#8f8a80',
  success: '#3f9463',
  warning: '#9a7b2c',
  danger: '#c4443f',
  info: '#3782ad',
} as const;

export type DocsSeedColorName = keyof typeof DOCS_DEFAULT_SEED_COLORS;
export type DocsSeedColors = Readonly<Record<DocsSeedColorName, string>>;

export function createDocsTheme(seedColors: DocsSeedColors): ReturnType<typeof createKuiTheme> {
  return createKuiTheme({
    ...DEFAULT_KUI_THEME,
    seeds: {
      ...DEFAULT_KUI_THEME.seeds,
      color: seedColors,
    },
  });
}

export function parseDocsSeedColors(storedValue: string): DocsSeedColors | null {
  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isUnknownRecord(parsedValue)) {
      return null;
    }

    const { danger, info, neutral, primary, success, warning } = parsedValue;

    if (
      typeof danger !== 'string' ||
      typeof info !== 'string' ||
      typeof neutral !== 'string' ||
      typeof primary !== 'string' ||
      typeof success !== 'string' ||
      typeof warning !== 'string'
    ) {
      return null;
    }

    const seedColors = { danger, info, neutral, primary, success, warning };

    createDocsTheme(seedColors);

    return seedColors;
  } catch {
    return null;
  }
}

function isUnknownRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
