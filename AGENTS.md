# AGENTS.md

This repository contains Kikita UI Docs, the future public documentation and
external consumer verification app for `@kikita-labs/ui`.

This file is the mandatory entry point for every AI agent. Read it first, then
read the linked `.agents/*.md` files required by the task.

## Must Read

Always read:

- `.agents/workflow.md`
- `.agents/library-sync.md`
- `.agents/git-policy.md`
- `.agents/architecture.md`
- `.agents/angular-code-style.md`
- `.agents/imports-and-boundaries.md`
- `.agents/platform-and-state.md`
- `.agents/responsive-accessibility.md`
- `.agents/testing-and-quality.md`
- `.agents/refactoring.md`
- `.agents/progress.md`

For Angular work, use `angularCliKikitaDocs.list_projects` first.

For docs that describe library primitives, also read the source-of-truth files in
the sibling library repository:

- `../kikita-ui/CHANGELOG.md`
- `../kikita-ui/docs/<primitive>.md`
- `../kikita-ui/docs/component-roadmap.md`
- `../kikita-ui/docs/state-coverage.md`
- `../kikita-ui/.local-notes/claude-design/design system/<component>.dc.html`

For component documentation page work, also read:

- `.agents/component-doc-page.md`

If present, also read:

- `.local-notes/LIBRARY-BREAKING-CHANGES.md`

## Non-Negotiable Rules

- Angular 22+ only.
- Keep all tracked content in English.
- Do not add Cyrillic text or mojibake to tracked files.
- Consume `@kikita-labs/ui` as a package dependency, not by importing source from
  the sibling `kikita-ui` repository.
- Do not document unreleased library source behavior as if it is available in the
  installed package.
- Check the installed `@kikita-labs/ui` version before writing examples that
  depend on new APIs.
- Use Kikita UI primitives for docs UI wherever possible.
- Do not invent component API. Check the installed package types and sibling
  library docs before writing examples.
- Keep examples practical and copy-pasteable for normal Angular consumers.
- Prefer native HTML semantics before ARIA.
- Do not add broad visual polish that conflicts with the Kikita design system.
- Angular state in this app is signals-only. Do not introduce NgRx or other
  external state stores.
- Keep browser APIs behind the adapters described in
  `.agents/platform-and-state.md`. Components, pages, examples, and ordinary
  feature services must not access `window`, `document`, `navigator`, browser
  storage, observers, history, location, or timer globals directly.
- Apply explicit class-member visibility. Public members are intentional API,
  protected members are template-facing, and private members are internal.
  Make injected dependencies, signals, inputs, outputs, and stable callbacks
  `readonly` unless reassignment is required and documented.
- Use path aliases only across architectural boundaries and local relative
  imports inside one feature. Follow `.agents/imports-and-boundaries.md`; do
  not introduce arbitrary alias schemes or broad barrels.
- New or changed UI must satisfy the responsive and accessibility acceptance
  matrix in `.agents/responsive-accessibility.md`.
- Structural refactors must be delivered as small verified slices. Do not mix
  broad architecture moves with unrelated visual or documentation-content
  changes.
- Never add `Co-authored-by`, `Generated-by`, AI attribution, or assistant
  attribution lines to commit messages.
- Never claim co-authorship for Claude, Codex, ChatGPT, or any other AI tool.

## Angular MCP

This repo uses the `angularCliKikitaDocs` MCP server.

Use the MCP resource `instructions://best-practices` from
`angularCliKikitaDocs` as the primary source for Angular best practices in
Codex. The Angular CLI MCP `get_best_practices` and `search_documentation` tools
may return `Unexpected response type` in Codex even while the server is healthy;
in that case, use the readable MCP resource and the working `list_projects` /
`run_target` tools.

If the MCP server is unavailable or not connected, stop and tell the user. Do
not silently fall back to guesses.

## Local Notes

`.local-notes/` is gitignored and can contain planning docs for this repo.

Read these before structural docs work when present:

- `.local-notes/PLAN.md`
- `.local-notes/claude-design/briefs/design-brief.md`
- `.local-notes/LIBRARY-BREAKING-CHANGES.md`
- `.local-notes/refactor/MASTER-REFACTOR-PLAN.md`
- `.local-notes/refactor/COMPONENT-INVENTORY.md`
- `.local-notes/refactor/components/<component>.md`

The files under `.local-notes/refactor/` are the execution source of truth for
the planned architecture migration. Before refactoring an area, read the master
plan and its matching work package. Update the work package status, evidence,
and remaining tasks in the same change. Do not mark a package complete without
all required verification.

## Source Of Truth

The sibling library repository remains the implementation source of truth:

```text
../kikita-ui
```

The docs app is the external consumer proof. It must verify package imports,
styles, providers, and examples through the installed `@kikita-labs/ui` package.
