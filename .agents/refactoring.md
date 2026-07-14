# Refactoring Protocol

This protocol applies to the planned project-wide architecture migration and to
all future non-trivial refactors.

## Core Rule

Refactor in behavior-preserving vertical slices. The goal is not a large diff;
the goal is a sequence of reviewable states where the app remains buildable and
the next step is unambiguous.

## Required Planning Inputs

Before editing:

1. read `AGENTS.md` and all mandatory `.agents` documents;
2. read `.local-notes/refactor/MASTER-REFACTOR-PLAN.md`;
3. read `.local-notes/refactor/COMPONENT-INVENTORY.md`;
4. read the matching infrastructure or component work package;
5. inspect current git status and preserve unrelated changes;
6. confirm prerequisite work packages are complete;
7. run or inspect the current relevant baseline.

If a work package is missing or contradicted by current code, update the plan
before implementation. Do not improvise a new architecture inside a component
diff.

## Slice Shape

Each slice defines:

- scope and explicit non-goals;
- current behavior that must remain;
- target boundary;
- files expected to change;
- tests added before movement;
- migration steps;
- temporary compatibility path, if unavoidable;
- deletion gate for that compatibility path;
- verification commands;
- responsive/accessibility evidence where applicable;
- rollback point.

## Separation Of Concerns

Keep these separate unless they are inseparable:

- aliases/barrels and functional behavior;
- route registry migration and visual redesign;
- platform abstraction and theme redesign;
- snippet generation and documentation-content rewrites;
- playground typing and new component APIs;
- responsive defect fixes and broad visual polish;
- library dependency updates and docs architecture.

Small, focused commits are easier to verify and revert.

## Migration Waves

### Wave 0: Green Baseline

- Fix existing lint errors.
- Record build/test/bundle baselines.
- Add smoke coverage for routes that will move.
- Do not begin architecture moves on a red baseline.

### Wave 1: Guardrails

- Add aliases.
- Add sorted imports and type-import rules.
- Add restricted globals.
- Add boundary rules and a cycle checker.
- Add initial barrels from low-level layers upward.

### Wave 2: Platform Boundary

- Add clipboard, storage, anchor, media/viewport, scheduling, and observation
  capabilities.
- Migrate `DocSection`, `CodeTabs`, `PageToc`,
  `ApiPlaygroundViewport`, theme behavior, and async examples.
- Add adapter tests before deleting direct access.

### Wave 3: Typed Sources Of Truth

- Introduce docs manifests and registry.
- Derive routes, paths, navigation, categories, breadcrumbs, search, and drafts.
- Add invariant tests.
- Introduce generated example source and stale-artifact checks.
- Type playground controls and values to remove assertions.

### Wave 4: Shared Docs UI

- Refactor shared docs UI one component at a time.
- Fix narrow viewport overflow and keyboard alternatives.
- Keep stable selectors, inputs, and page composition during the move.

### Wave 5: Shell And Responsive Architecture

- Replace custom drawer behavior with accessible overlay/drawer semantics.
- Add mobile TOC alternative.
- Centralize breakpoints.
- Verify 320-1440 widths, zoom, focus, and no page overflow.

### Wave 6: Component Feature Waves

Migrate component docs by dependency and risk:

1. simple/static: Badge, Loader, Skeleton, Separator, Card;
2. simple actions/identity: Button, Icon Button, Avatar, Chip;
3. native forms: Input, Textarea, Checkbox, Switch, Radio, Slider,
   Number Input, Field, Group;
4. composites: Tabs, Accordion, Progress, Empty State, Table;
5. overlays: Dropdown, Select, Combobox, Menu, Popover, Dialog, Drawer,
   Command Palette, Toast;
6. utilities: Scrollbar;
7. installed package components not yet represented in the docs registry.

Each component work package covers its page, examples, API schema, playground,
manifest, imports/barrels, tests, accessibility, responsive behavior, and
source-of-truth verification.

### Wave 7: Performance And Cleanup

- Measure bundle/chunk changes.
- Reduce Shiki/theme overhead.
- Remove compatibility files and obsolete constants.
- Tighten lint rules from warning/migration mode to error.
- Update architecture/progress and close work packages.

## No Big-Bang Rules

- Do not move all files and change all imports in one slice.
- Do not create all barrels and route registry changes simultaneously.
- Do not delete old route/navigation sources until equivalence tests pass.
- Do not use a temporary `any` or blanket lint disable to get a wave compiling.
- Do not relax budgets to hide a regression.
- Do not update dozens of snippets by hand when the generator is the target.

## Work Package Status

Use:

- `not-started`;
- `in-progress`;
- `blocked`;
- `verified`.

Every update records:

- date;
- changed files;
- decisions or deviations;
- commands and results;
- remaining tasks;
- blockers with exact evidence.

`verified` means every acceptance item is complete. A passing build alone does
not qualify.

## Refactor Review Checklist

- Is behavior protected?
- Is dependency direction improved?
- Is public API smaller or clearer?
- Are template members protected and internals private?
- Are stable references readonly?
- Did casts decrease?
- Did direct platform access decrease?
- Are aliases/barrels used according to policy?
- Are lazy chunks preserved?
- Is responsive/accessibility behavior equal or better?
- Were temporary paths deleted or given a removal gate?
- Is the work package updated with evidence?

## Blocking Conditions

Stop and record a blocker when:

- Angular MCP is unavailable;
- package typings and sibling source-of-truth disagree;
- the installed package lacks the API required by the planned slice;
- a prerequisite work package is incomplete;
- a user-owned overlapping edit cannot be preserved;
- baseline behavior cannot be characterized safely;
- the slice requires a new architecture decision not covered by current rules.

Do not silently guess around these conditions.
