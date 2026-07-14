# Kikita UI Docs Progress

Updated: 2026-07-15

Sources:

- Plan: `.local-notes/PLAN.md`
- Design reference: `.local-notes/claude-design/design/Docs Site Concept.dc.html`
- Architecture baseline: `.agents/architecture.md`
- Package source of truth: sibling `kikita-ui` repo docs and published `@kikita-labs/ui`

## Legend

- Done: implemented and passing the current consumer build.
- In progress: implemented enough to use, but still needs parity/content/test work.
- Pending: planned, not implemented yet.

## Plan Status

| Area                                      | Status      | Notes                                                                                                                                                                                        |
| ----------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project setup and package consumer wiring | Done        | Consumes published `@kikita-labs/ui`; stylesheet stays wired through `angular.json`; provider installed in app config.                                                                       |
| Shell layout                              | Done        | Typed active-page state, focus-safe responsive drawer, inert/scroll-lock behavior, route focus, safe areas, and the complete 320-1440 matrix are verified.                                   |
| Header                                    | Done        | Search/theme controls and registry-derived breadcrumbs have responsive truncation, long-label, dark/light, zoom, and forced-colors evidence.                                                 |
| Left sidebar                              | Done        | Typed navigation, collapsible groups, draft badges, CDK focus trap, Escape/backdrop/route close, trigger restoration, and skip-link behavior are verified.                                   |
| Right page TOC                            | Done        | Desktop section rail and mobile native jump control share registry state and have keyboard, focus, anchor, and responsive evidence.                                                          |
| Shared docs UI primitives                 | Done        | Eight reusable components have documented contracts, focused behavior/axe tests, container-aware overflow, keyboard CodeTabs/playground controls, and adapter-backed platform work.          |
| Foundation pages                          | Done        | Installation, theming, tokens, density, and accessibility routes exist with consumer-safe content.                                                                                           |
| Landing page                              | In progress | Real front door exists, using package primitives. Needs final design parity pass and content tightening.                                                                                     |
| Component overview                        | Done        | Category overview exists and reads from typed component metadata.                                                                                                                            |
| Component docs pages                      | Done        | Every roadmap component has a routed page: Actions, Forms, Feedback, Surfaces, Data and Identity are all `available`.                                                                        |
| Draft component pages                     | Done        | Missing docs routes render a draft page instead of dead links or 404s.                                                                                                                       |
| 404 page                                  | Done        | Uses a dedicated wildcard route and minimal shell layout.                                                                                                                                    |
| Search                                    | In progress | Header trigger and Ctrl+K command palette exist. Index covers nav items; section-heading indexing is still pending.                                                                          |
| Copy-link headings                        | In progress | Heading anchors and link controls exist. Needs final deep-link QA across pages.                                                                                                              |
| Syntax highlighting                       | Done        | Shiki-based HTML/TS/SCSS highlighting exists for light and dark themes.                                                                                                                      |
| Theme toggle                              | Done        | Persists light/dark mode and applies `data-kui-theme`.                                                                                                                                       |
| Seed color picker                         | Done        | Header picker uses Kikita UI popover/color input and updates seed colors live.                                                                                                               |
| Package smoke route                       | Done        | External consumer route proves package imports, styles, and provider setup.                                                                                                                  |
| Tests and review gates                    | In progress | Angular gates pass 341 tests; every installed component docs package has non-browser verification. Browser/Playwright evidence is deferred by explicit user request.                         |
| Architecture refactor                     | In progress | Infrastructure packages `00-green-baseline` through `08-foundation-resource-pages` are verified; every component work package is at least non-browser-verified with browser checks deferred. |

## Component Coverage

| Category          | Done pages                                                                                                                                                 | Draft pages / pending docs |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Actions           | Button, Icon Button, Menu, Command Palette                                                                                                                 | None                       |
| Forms             | Field, Input, Color Input, Select, Combobox, Date Picker, Calendar, File Upload, Segmented, Slider, Number Input, Textarea, Checkbox, Switch, Radio, Group | None                       |
| Feedback          | Badge, Loader, Skeleton, Tooltip, Toast, Empty State, Progress                                                                                             | None                       |
| Surfaces          | Card, Tabs, Accordion, Breadcrumbs, Popover, Dialog, Drawer, Dropdown, Separator, Stepper                                                                  | None                       |
| Data and Identity | Icon, Avatar, Table, Chip, Scrollbar, Tree                                                                                                                 | None                       |

## Next Milestones

1. Run the user-owned browser/manual responsive pass for the component pages.
2. Add section-heading search indexing and stronger scroll/copy-link tests in its owning future package.
3. Perform the separately scoped visual parity pass after structural component packages are verified.

## Current Risks

- Rendered component examples and Package Smoke now own their displayed source through 111 generated source records; non-rendered import/provider guidance remains intentionally page-authored.
- Component API schemas must keep being checked against installed package `.d.ts` before page work lands.
- Visual parity is not done just because routes exist; every page still needs comparison against the Claude design concept.
- Approved path aliases, explicit barrels, import sorting, and boundary checks are now enforced; feature-local deep imports remain for later package-local cleanup where appropriate.
- The Button Playground now has zero document overflow at 375px; package 05/06 must preserve that local-overflow contract across shared UI and the shell review matrix.
- Installed `@kikita-labs/ui` 0.3.1 solid Button renders white on `#8283ff` in dark preview state (axe contrast 3.16:1); shared docs chrome passes axe and no docs-only token override masks the upstream primitive issue.
- The initial production bundle is close to its warning budget; Shiki theme loading and registry changes must be measured rather than assumed safe.
- Package 06 closes at 799.86 kB initial raw size with 174 lazy chunks and no build warnings; package 07 must create headroom rather than raise the budget.
- Package 07 closes at 797.13 kB initial raw size, 132 exact lazy JS chunks, and eight Shiki theme chunks; the stats-based gate enforces the resulting headroom.
- Package 08 closes at 798.59 kB initial raw size, 132 exact lazy JS chunks, eight Shiki theme chunks, and a 24.77 kB largest route chunk; all performance budgets pass without warnings.
- Popover non-browser verification closes at 798.59 kB initial raw size, 132 exact lazy JS chunks, eight Shiki theme chunks, and a 24.77 kB largest route chunk; browser verification is intentionally not claimed.
- Dialog non-browser verification closes at 798.59 kB initial raw size, 132 exact lazy JS chunks, eight Shiki theme chunks, and a 24.77 kB largest route chunk; browser verification is intentionally not claimed.
- Drawer non-browser verification closes at 798.59 kB initial raw size, 132 exact lazy JS chunks, eight Shiki theme chunks, and a 24.77 kB largest route chunk; browser verification is intentionally not claimed.
- The complete installed-component docs wave closes at 849,996 initial bytes,
  162 exact lazy JS chunks, eight Shiki theme chunks, and a 24,487 byte largest
  route chunk. Browser verification is intentionally not claimed.
