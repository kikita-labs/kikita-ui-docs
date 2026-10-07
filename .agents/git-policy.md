# Git Policy

- Never add `Co-authored-by`, `Generated-by`, AI attribution, or assistant
  attribution lines to commit messages.
- Never claim co-authorship for Claude, Codex, ChatGPT, or any other AI tool.
- Commit messages must be concise, English, and focused on the user-visible or
  technical change.
- Do not commit unless the user asks for a commit or the current task explicitly
  includes committing.
- Before committing, check whether the docs change depends on a library release.
- If docs were updated because of a `kikita-labs/kikita-ui` changelog entry,
  mention that in the commit body without adding AI attribution.

## Release Branches

- `release/v<major>` branches document one older major version of
  `@kikita-labs/ui` and publish it under `/<id>/` (see
  `.agents/versioned-docs.md`). Pushing one triggers `archive-docs.yml`.
- Branch `release/v<major>` from the last `main` commit that documents that
  major. Do not merge `main` into it.
- Only the owner decides when a release branch is created or when support for
  it ends.
- Do not push to a release branch to experiment: every push republishes that
  version.
