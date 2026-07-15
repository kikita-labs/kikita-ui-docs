/**
 * Splits a Markdown document into its top-level `## ` sections. Used to pull structured facts
 * (Usage, Accessibility) out of the sibling library's authored `../kikita-ui/docs/<slug>.md`
 * files instead of scraping rendered Angular templates, per `.agents/agent-surface.md`'s
 * "prefer structured generators over scraping rendered HTML" rule.
 *
 * @param {string} source
 * @returns {Map<string, string>} heading text (without `## `) -> trimmed section body
 */
export function splitMarkdownSections(source) {
  const sections = new Map();
  const headingPattern = /^##\s+(.+)$/gm;
  const matches = [...source.matchAll(headingPattern)];

  for (const [index, match] of matches.entries()) {
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd = matches[index + 1]?.index ?? source.length;

    sections.set(heading, source.slice(bodyStart, bodyEnd).trim());
  }

  return sections;
}
