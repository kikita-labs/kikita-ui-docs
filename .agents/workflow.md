# Agent Workflow

Follow this workflow for every non-trivial docs-site change.

1. Read `AGENTS.md`.
2. Read this file and every document listed in the `AGENTS.md` Always Read
   section. These files form one contract; do not cherry-pick only the rules
   that are convenient for the current change.
3. Run `git status --short` and identify unrelated user changes. Do not revert
   or rewrite unrelated changes.
4. Use `angularCliKikitaDocs.list_projects` first for Angular workspace context.
5. Before documenting or changing any Kikita UI primitive, inspect the sibling
   library repository:
   - `../kikita-ui/docs/<primitive>.md`
   - `../kikita-ui/docs/component-roadmap.md`
   - `../kikita-ui/docs/state-coverage.md`
   - `../kikita-ui/CHANGELOG.md`
6. Verify the installed `@kikita-labs/ui` package version in `package.json` and
   lockfile before writing examples that depend on newly released APIs.
7. Use Kikita UI public package imports only. Do not import source files from the
   sibling library repository.
8. For structural or refactoring work, confirm tracked architecture guidance and
   prerequisites before editing.
9. Define the smallest behavior-preserving slice. Add characterization coverage
   before moving behavior that is not already protected by tests.
10. Update docs pages, the typed registry/navigation/search data, examples, API
    schemas, generated source artifacts, and tests together when a docs feature
    changes.
11. Run the relevant verification commands. If a command cannot run, record the
    exact reason in the final response and do not claim it passed.
    Browser-impacting structural work must build production output and run the
    relevant Playwright project; infrastructure completion runs
    `pnpm test:browser` and the package/performance/inventory/debt checks listed
    in `.agents/testing-and-quality.md`.
12. Before committing, review `git diff --check`, `git diff --stat`, and the
    relevant changed files. Confirm no tracked file contains Cyrillic or
    mojibake.

## Change Discipline

- Keep architecture, behavior, content, and visual redesign changes separate
  whenever they can be reviewed independently.
- Preserve public routes, stable section anchors, package-consumer examples,
  and accessibility behavior during structural refactors.
- Do not perform repository-wide mechanical edits before the target aliases,
  barrel policy, lint rules, and dependency boundaries are in place.
- Do not create compatibility layers with no removal task. Every temporary shim
  needs an owner work package and an explicit deletion gate.
- Stop a slice when its verification fails. Record the failure in the work
  package instead of continuing to stack unrelated changes on top.

If a library change is not yet released to the package version consumed by this
repo, do not document it as available. Either update the package first or mark
the docs work as blocked by release.
