# Git Policy

- Never add `Co-authored-by`, `Generated-by`, AI attribution, or assistant
  attribution lines to commit messages.
- Never claim co-authorship for Claude, Codex, ChatGPT, or any other AI tool.
- Commit messages must be concise, English, and focused on the user-visible or
  technical change.
- Do not commit unless the user asks for a commit or the current task explicitly
  includes committing.
- Before committing, check whether the docs change depends on a library release.
- If docs were updated because of `../kikita-ui/CHANGELOG.md`, mention that in
  the commit body without adding AI attribution.
