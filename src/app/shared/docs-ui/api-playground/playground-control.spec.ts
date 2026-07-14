import {
  createPlaygroundValues,
  definePlaygroundControls,
  parsePlaygroundNumber,
} from './playground-control';
import {
  escapePlaygroundHtml,
  escapePlaygroundHtmlAttribute,
  escapePlaygroundSingleQuotedString,
  serializePlaygroundAttributes,
} from './playground-serializer';

describe('typed playground values and serialization', () => {
  const controls = definePlaygroundControls([
    { key: 'label', label: 'label', kind: 'string', defaultValue: 'Save' },
    {
      key: 'size',
      label: 'size',
      kind: 'enum',
      options: ['sm', 'md'] as const,
      defaultValue: 'md',
    },
    { key: 'disabled', label: 'disabled', kind: 'boolean', defaultValue: false },
    { key: 'count', label: 'count', kind: 'number', defaultValue: 1 },
  ] as const);

  it('uses valid overrides and rejects invalid runtime values', () => {
    expect(
      createPlaygroundValues(controls, {
        label: 'Submit',
        size: 'invalid',
        disabled: true,
        count: Number.NaN,
      }),
    ).toEqual({ label: 'Submit', size: 'md', disabled: true, count: 1 });
  });

  it('parses finite number input with a deterministic fallback', () => {
    expect(parsePlaygroundNumber('24')).toBe(24);
    expect(parsePlaygroundNumber('')).toBe(0);
    expect(parsePlaygroundNumber('not-a-number', 8)).toBe(8);
  });

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
