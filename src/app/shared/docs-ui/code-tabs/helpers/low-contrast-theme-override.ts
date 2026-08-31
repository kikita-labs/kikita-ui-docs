import { type ShikiThemeLike } from '../interfaces';

// github-light's generic "variable" scope (#e36209) has a 3.49:1 contrast ratio against
// its white background -- below the 4.5:1 WCAG AA minimum -- and fails automated a11y
// checks on any code sample using a plain identifier (e.g. a class field declaration).
// Darken it in place after load; every other rule in the upstream theme stays untouched.
const LOW_CONTRAST_FOREGROUND_OVERRIDES_BY_THEME: Readonly<Record<string, Record<string, string>>> =
  {
    'github-light': { '#e36209': '#c2410c' },
  };

export function fixLowContrastTokenColors(themeId: string, theme: unknown): unknown {
  const overrides = LOW_CONTRAST_FOREGROUND_OVERRIDES_BY_THEME[themeId];

  if (!overrides) {
    return theme;
  }

  for (const rule of (theme as ShikiThemeLike).tokenColors ?? []) {
    const foreground = rule.settings?.foreground?.toLowerCase();
    const replacement = foreground && overrides[foreground];

    if (replacement && rule.settings) {
      rule.settings.foreground = replacement;
    }
  }

  return theme;
}
