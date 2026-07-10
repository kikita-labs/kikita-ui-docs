# Agent Workflow

Follow this workflow for every non-trivial docs-site change.

1. Read `AGENTS.md`.
2. Read this file.
3. Run `git status --short` and identify unrelated user changes. Do not revert
   or rewrite unrelated changes.
4. Use `angularCliKikitaDocs.list_projects` first for Angular workspace context.
5. Before documenting or changing any Kikita UI primitive, inspect the sibling
   library repository:
   - `../kikita-ui/docs/<primitive>.md`
   - `../kikita-ui/docs/component-roadmap.md`
   - `../kikita-ui/docs/state-coverage.md`
   - `../kikita-ui/CHANGELOG.md`
   - `../kikita-ui-docs/.local-notes/LIBRARY-BREAKING-CHANGES.md`, if present
6. Verify the installed `@kikita-labs/ui` package version in `package.json` and
   lockfile before writing examples that depend on newly released APIs.
7. Use Kikita UI public package imports only. Do not import source files from the
   sibling library repository.
8. Update docs pages, navigation, examples, and local status notes together when
   a docs feature changes.
9. Run the relevant verification commands. If a command cannot run, record the
   exact reason in the final response and do not claim it passed.
10. Before committing, review `git diff --check`, `git diff --stat`, and the
    relevant changed files. Confirm no tracked file contains Cyrillic or
    mojibake.

If a library change is not yet released to the package version consumed by this
repo, do not document it as available. Either update the package first or mark
the docs work as blocked by release.
