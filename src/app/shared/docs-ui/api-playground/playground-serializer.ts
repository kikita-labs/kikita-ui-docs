export interface PlaygroundHtmlAttribute {
  readonly name: string;
  readonly value: boolean | number | string | null | undefined;
  readonly defaultValue?: boolean | number | string | null;
}

export function escapePlaygroundHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function escapePlaygroundHtmlAttribute(value: string): string {
  return escapePlaygroundHtml(value).replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

export function escapePlaygroundSingleQuotedString(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

export function serializePlaygroundAttributes(
  attributes: readonly PlaygroundHtmlAttribute[],
): string {
  const serialized = attributes.flatMap((attribute) => {
    if (
      attribute.value === null ||
      attribute.value === undefined ||
      attribute.value === false ||
      attribute.value === attribute.defaultValue
    ) {
      return [];
    }

    if (attribute.value === true) {
      return [attribute.name];
    }

    return [`${attribute.name}="${escapePlaygroundHtmlAttribute(String(attribute.value))}"`];
  });

  return serialized.length > 0 ? ` ${serialized.join(' ')}` : '';
}
