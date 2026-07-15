# Testing And Quality Gates

Quality is part of the docs product. A green build alone is not sufficient for
an application with hundreds of components and interactive examples.

## Required Commands

The full local gate is:

```bash
pnpm format:check
pnpm lint
pnpm build
pnpm test
```

Add and run these gates as the refactor establishes them:

```bash
pnpm check:boundaries
pnpm check:generated
pnpm test:e2e
pnpm test:a11y
```

The established full architecture/browser gate is now:

```bash
pnpm format:check
pnpm lint
pnpm test
pnpm check:boundaries
pnpm check:generated
pnpm check:inventory
pnpm check:package-consumer
pnpm check:migration-debt
pnpm check:agent-surface
pnpm build
pnpm check:performance
pnpm test:browser
```

`pnpm test:browser` serves the current production output from
`dist/kikita-ui-docs/browser`. Run `pnpm build` first. Its four Playwright
projects can also be run independently with `test:e2e`, `test:a11y`,
`test:responsive`, or `test:visual`. Update visual baselines only when the
reviewed visual change is intentional; never use snapshot update to make an
unexplained diff green.

Use Angular CLI MCP `run_target` for configured Angular targets. If a command
cannot run, record the exact reason. Never report an unrun gate as passing.

## Baseline

Audit snapshot from 2026-07-12:

- production build: passing;
- unit tests: 3 files, 8 tests, passing;
- lint: failing with two label-association errors;
- production initial bundle: 790.98 kB against an 800 kB warning;
- component count: 198 actual Angular components;
- component-feature specs: none;
- barrels: none;
- deep relative imports: 488;
- direct browser global use remains in shared docs UI and one example.

The first refactor slice must establish a green baseline before structural work
continues.

## Test Layers

### Pure Unit Tests

Use for:

- registry derivation and route/path invariants;
- API schema serializers and playground value parsing;
- storage parsers and preference validation;
- snippet generation and HTML escaping;
- search index creation;
- theme seed validation;
- utility functions and exhaustive mappings.

### Angular Component Tests

Use TestBed for behavior visible through inputs, outputs, DOM, focus, and
accessibility state. Test:

- shared docs UI components;
- shell/header/sidebar/TOC interactions;
- overlay and focus behavior;
- every example with non-trivial state;
- page composition only when it has meaningful behavior.

Do not test private methods directly. Do not snapshot entire templates as a
substitute for behavior.

### Contract Tests

Add invariant tests that fail when:

- two docs manifests share a slug or route;
- an available component has no page loader;
- a playground path exists without a playground loader;
- navigation/search/category/breadcrumb data diverges from the registry;
- a stable route or anchor is removed without an explicit migration;
- generated example source is stale;
- generated agent Markdown, `llms.txt`, `llms-full.txt`, or MCP data is stale;
- API schema values are duplicated or invalid;
- a public package import referenced by docs is unavailable in the installed
  dependency.

Package-import checks must compile through the installed
`@kikita-labs/ui`, not sibling source.

### End-To-End Smoke

Cover at least:

- home to installation/components navigation;
- Ctrl/Cmd+K search, selection, and focus restoration;
- theme persistence and first-visit media preference;
- sidebar drawer open/close, focus trap, Escape, backdrop, navigation close;
- page TOC and fragment deep links;
- copy code and copy heading link success/failure;
- one simple, one form, one overlay, and one table playground;
- 404 and draft page;
- package smoke route.

### Accessibility

- Run axe on shell, home, a representative component page, playground, overlay
  state, draft, and 404.
- Add keyboard-path tests for composite controls.
- Keep automated checks honest: real assistive-technology review remains a
  separate library status.

### Visual And Responsive Regression

Maintain local/CI screenshots for representative routes at 390, 768, and 1440
widths in light and dark themes. Add focused baselines for overlays and the
mobile drawer. Do not snapshot every docs page when a shared component baseline
covers the same layout.

The tracked representative baselines are Button docs at 390, 768, and 1440 in
light/dark themes plus the open 390px mobile drawer. The responsive gate is
metric-based and separately verifies the complete 320/360/390/768/1024/1280/
1440 matrix on every route in `responsive.spec.ts`.

## Refactor Testing Rule

Before moving behavior:

1. identify observable behavior;
2. add a characterization test when coverage is absent;
3. refactor one boundary;
4. keep the test green;
5. add target-architecture tests;
6. delete the compatibility path in the same work package or record its removal
   gate.

Do not rewrite a test to accept broken behavior merely because the
implementation moved.

## Test Data

- Keep fixtures small, typed, immutable, and local to their feature.
- Prefer builders only when many tests vary the same object.
- Do not share mutable singleton fixtures.
- Use deterministic clocks/schedulers and ids.
- Avoid real network calls and uncontrolled global timers.
- Platform adapters must have lightweight fakes.

## Coverage Priorities

Priority order:

1. platform adapters and theme split;
2. typed docs registry and route derivation;
3. shared docs UI;
4. shell responsive/focus behavior;
5. playground schema and serializer;
6. interactive examples;
7. static page composition.

Do not chase a global percentage while high-risk behavior has no assertions.
After the priority suite exists, enforce meaningful changed-line coverage in
CI.

## Performance Gates

- Keep the production initial bundle below its configured warning.
- Measure before and after registry/barrel/Shiki changes.
- Preserve route-level lazy chunks.
- Avoid exporting component implementations from root barrels.
- Track initial JS, initial CSS, largest lazy routes, and number/size of Shiki
  theme chunks.
- Prefer an approved code-theme subset or a measured on-demand loader over a
  registry that references every Shiki theme.
- Add performance budgets only after recording a stable baseline; then tighten
  them deliberately.
- `check:performance` reads the Angular production `stats.json`; do not replace
  it with log scraping. Keep `tools/performance-baseline.json` synchronized only
  after a reviewed build change and never raise a limit merely to hide a
  regression.

## Definition Of Done

A code slice is done only when:

- relevant format, lint, build, and tests pass;
- architecture and generated-artifact checks pass when available;
- UI work has responsive and accessibility evidence;
- no new browser-global, deep-boundary, cast, or hand-maintained-snippet debt is
  introduced;
- the matching local work package records completed tasks and evidence;
- no tracked Cyrillic or mojibake is introduced;
- unrelated user changes remain untouched.
