import {
  escapePlaygroundHtml,
  escapePlaygroundHtmlAttribute,
  escapePlaygroundSingleQuotedString,
  serializePlaygroundAttributes,
} from './playground-serializer';

describe('playground snippet serialization', () => {
  it('escapes text and attribute contexts', () => {
    expect(escapePlaygroundHtml('<Save & close>')).toBe('&lt;Save &amp; close&gt;');
    expect(escapePlaygroundHtmlAttribute('"quoted" & \'single\'')).toBe(
      '&quot;quoted&quot; &amp; &#39;single&#39;',
    );
    expect(escapePlaygroundSingleQuotedString("A \\ path's value")).toBe("A \\\\ path\\'s value");
  });

  it('omits defaults and false values while serializing booleans safely', () => {
    expect(
      serializePlaygroundAttributes([
        { name: 'size', value: 'md', defaultValue: 'md' },
        { name: 'disabled', value: false },
        { name: 'loading', value: true },
        { name: 'label', value: 'Save & close' },
      ]),
    ).toBe(' loading label="Save &amp; close"');
  });
});
