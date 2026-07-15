/**
 * Parses `<name>.api-schema.ts` source text into API table rows without importing the module,
 * matching the regex-parse approach used across `tools/*.mjs` (see
 * `tools/generate-example-sources.mjs`). Handles mixed `'`, `"`, and backtick string delimiters
 * since API row values use backticks when the content itself contains a single quote (see
 * `button.api-schema.ts`'s `type` values).
 *
 * @param {string} source
 * @returns {{name: string, type: string, defaultValue: string, description: string}[]}
 */
export function parseApiSchemaRows(source) {
  const arrayStart = source.match(/=\s*\[/);

  if (!arrayStart) return [];

  const bodyStart = arrayStart.index + arrayStart[0].length;
  const arrayBody = extractBracketedSpan(source, bodyStart);

  return extractTopLevelObjects(arrayBody)
    .map(parseRowObject)
    .filter((row) => row !== null);
}

/** Returns the substring from `start` up to (not including) the matching `]`, string-aware. */
function extractBracketedSpan(source, start) {
  let depth = 1;
  let quote = null;
  let i = start;

  for (; i < source.length && depth > 0; i++) {
    const char = source[i];

    if (quote) {
      if (char === '\\') i++;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === "'" || char === '"' || char === '`') quote = char;
    else if (char === '[') depth++;
    else if (char === ']') depth--;
  }

  return source.slice(start, depth === 0 ? i - 1 : i);
}

function extractTopLevelObjects(body) {
  const objects = [];
  let depth = 0;
  let start = -1;
  let quote = null;

  for (let i = 0; i < body.length; i++) {
    const char = body[i];

    if (quote) {
      if (char === '\\') {
        i++;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      if (depth === 0) start = i;
      depth++;
      continue;
    }

    if (char === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        objects.push(body.slice(start, i + 1));
        start = -1;
      }
    }
  }

  return objects;
}

function parseRowObject(block) {
  const name = readQuotedField(block, 'name');

  if (!name) return null;

  return {
    name,
    type: readQuotedField(block, 'type') ?? '-',
    defaultValue: readQuotedField(block, 'defaultValue') ?? '-',
    description: readQuotedField(block, 'description') ?? '',
  };
}

function readQuotedField(block, key) {
  const match = block.match(new RegExp(`\\b${key}\\s*:\\s*`));

  if (!match) return null;

  const valueStart = match.index + match[0].length;
  const quote = block[valueStart];

  if (quote !== "'" && quote !== '"' && quote !== '`') return null;

  let i = valueStart + 1;

  while (i < block.length) {
    if (block[i] === '\\') {
      i += 2;
      continue;
    }
    if (block[i] === quote) break;
    i++;
  }

  return block.slice(valueStart + 1, i);
}
