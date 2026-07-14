import { DOCS_CODE_THEME_OPTIONS } from '@core/theme';

import { SHIKI_THEME_MODULE_LOADER_BY_NAME } from './code-highlighter.service';

describe('CodeHighlighterService theme loaders', () => {
  it('keeps every selectable code theme behind a matching lazy loader', () => {
    const optionIds = DOCS_CODE_THEME_OPTIONS.map((option) => option.id).sort();
    const loaderIds = Object.keys(SHIKI_THEME_MODULE_LOADER_BY_NAME).sort();

    expect(loaderIds).toEqual(optionIds);
  });
});
