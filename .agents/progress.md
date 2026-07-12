# Kikita UI Docs Progress

Updated: 2026-07-12

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

| Area                                      | Status      | Notes                                                                                                                                            |
| ----------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Project setup and package consumer wiring | Done        | Consumes published `@kikita-labs/ui`; stylesheet stays wired through `angular.json`; provider installed in app config.                           |
| Shell layout                              | In progress | Header, left sidebar, main content, right TOC, responsive drawer, not-found layout exist. Ongoing work is exact design parity and mobile polish. |
| Header                                    | In progress | Search, seed color picker, and theme toggle exist. Removed the old package-smoke brackets action to match the current design direction.          |
| Left sidebar                              | In progress | Typed component tree, active-route state, draft badges, and collapsible groups exist. Needs final spacing/icon parity pass against design.       |
| Right page TOC                            | In progress | Section rail exists with full-height border and active section state. Needs final scroll behavior QA on long pages.                              |
| Shared docs UI primitives                 | Done        | Page header, doc section, code tabs, Shiki highlighting, live preview, API table, draft state, and API playground all exist and are reused.      |
| Foundation pages                          | Done        | Installation, theming, tokens, density, and accessibility routes exist with consumer-safe content.                                               |
| Landing page                              | In progress | Real front door exists, using package primitives. Needs final design parity pass and content tightening.                                         |
| Component overview                        | Done        | Category overview exists and reads from typed component metadata.                                                                                |
| Component docs pages                      | Done        | Every roadmap component has a routed page: Actions, Forms, Feedback, Surfaces, Data and Identity are all `available`.                            |
| Draft component pages                     | Done        | Missing docs routes render a draft page instead of dead links or 404s.                                                                           |
| 404 page                                  | Done        | Uses a dedicated wildcard route and minimal shell layout.                                                                                        |
| Search                                    | In progress | Header trigger and Ctrl+K command palette exist. Index covers nav items; section-heading indexing is still pending.                              |
| Copy-link headings                        | In progress | Heading anchors and link controls exist. Needs final deep-link QA across pages.                                                                  |
| Syntax highlighting                       | Done        | Shiki-based HTML/TS/SCSS highlighting exists for light and dark themes.                                                                          |
| Theme toggle                              | Done        | Persists light/dark mode and applies `data-kui-theme`.                                                                                           |
| Seed color picker                         | Done        | Header picker uses Kikita UI popover/color input and updates seed colors live.                                                                   |
| Package smoke route                       | Done        | External consumer route proves package imports, styles, and provider setup.                                                                      |
| Tests and review gates                    | In progress | Build/test are used during changes. Need broader specs for shared docs UI and core services.                                                     |

## Component Coverage

| Category          | Done pages                                                                                     | Draft pages / pending docs |
| ----------------- | ---------------------------------------------------------------------------------------------- | -------------------------- |
| Actions           | Button, Icon Button, Menu, Command Palette                                                     | None                       |
| Forms             | Field, Input, Select, Combobox, Slider, Number Input, Textarea, Checkbox, Switch, Radio, Group | None                       |
| Feedback          | Badge, Loader, Skeleton, Toast, Empty State, Progress                                          | None                       |
| Surfaces          | Card, Tabs, Accordion, Popover, Dialog, Drawer, Dropdown, Separator                            | None                       |
| Data and Identity | Avatar, Table, Chip, Scrollbar                                                                 | None                       |

## Next Milestones

1. Finish header/sidebar/TOC parity against `Docs Site Concept.dc.html`.
2. Add section-heading search indexing and stronger scroll/copy-link tests.
3. Visual parity pass against the Claude design concept for every routed component page (routes existing is not the same as design-matched).
4. Revisit example code snippets that are still hand-maintained instead of generated from the example source files.

## Current Risks

- Example code snippets are still partly hand-maintained. Plan requires a real source-of-truth flow from example files.
- Component API schemas must keep being checked against installed package `.d.ts` before page work lands.
- Visual parity is not done just because routes exist; every page still needs comparison against the Claude design concept.
