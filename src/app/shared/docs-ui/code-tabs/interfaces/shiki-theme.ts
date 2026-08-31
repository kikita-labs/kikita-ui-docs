export interface ShikiTokenColorSetting {
  scope?: string | readonly string[];
  settings?: { foreground?: string };
}

export interface ShikiThemeLike {
  tokenColors?: readonly ShikiTokenColorSetting[];
}
