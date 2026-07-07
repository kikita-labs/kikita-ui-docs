# Kikita UI Docs Progress

Updated: 2026-07-07

Sources:

- Plan: `.local-notes/PLAN.md`
- Design reference: `.local-notes/claude-design/design/Docs Site Concept.dc.html`
- Architecture baseline: `docs/architecture.md`
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
| Shared docs UI primitives                 | In progress | Page header, doc section, code tabs, Shiki highlighting, live preview, API table, and draft state exist. API playground is still pending.        |
| Foundation pages                          | Done        | Installation, theming, tokens, density, and accessibility routes exist with consumer-safe content.                                               |
| Landing page                              | In progress | Real front door exists, using package primitives. Needs final design parity pass and content tightening.                                         |
| Component overview                        | Done        | Category overview exists and reads from typed component metadata.                                                                                |
| Component docs pages                      | In progress | First component wave exists: Button, Icon Button, Input/Field, Menu, Command Palette, Select, Checkbox, Switch.                                  |
| Draft component pages                     | Done        | Missing docs routes render a draft page instead of dead links or 404s.                                                                           |
| 404 page                                  | Done        | Uses a dedicated wildcard route and minimal shell layout.                                                                                        |
| Search                                    | In progress | Header trigger and Ctrl+K command palette exist. Index covers nav items; section-heading indexing is still pending.                              |
| Copy-link headings                        | In progress | Heading anchors and link controls exist. Needs final deep-link QA across pages.                                                                  |
| Syntax highlighting                       | Done        | Shiki-based HTML/TS/SCSS highlighting exists for light and dark themes.                                                                          |
| Theme toggle                              | Done        | Persists light/dark mode and applies `data-kui-theme`.                                                                                           |
| Seed color picker                         | Done        | Header picker uses Kikita UI popover/color input and updates seed colors live.                                                                   |
| Package smoke route                       | Done        | External consumer route proves package imports, styles, and provider setup.                                                                      |
| API playground                            | Pending     | Planned next. Needs shared playground primitive and first Button implementation.                                                                 |
| Tests and review gates                    | In progress | Build/test are used during changes. Need broader specs for shared docs UI and core services.                                                     |

## Component Coverage

| Category          | Done pages                                 | Draft pages / pending docs                                          |
| ----------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Actions           | Button, Icon Button, Menu, Command Palette | None                                                                |
| Forms             | Input/Field, Select, Checkbox, Switch      | Combobox, Slider, Number Input, Textarea, Radio, Group              |
| Feedback          | None                                       | Badge, Loader, Skeleton, Toast, Empty State, Progress               |
| Surfaces          | None                                       | Card, Tabs, Accordion, Popover, Dialog, Drawer, Dropdown, Separator |
| Data and Identity | None                                       | Avatar, Table, Chip, Scrollbar                                      |

## Next Milestones

1. Finish header/sidebar/TOC parity against `Docs Site Concept.dc.html`.
2. Add shared `api-playground` primitive.
3. Add Button playground route/content from verified package API.
4. Roll playground pattern into Input/Field and Select.
5. Continue component docs in roadmap order: remaining Forms, then Feedback, Surfaces, Data and Identity.
6. Add section-heading search indexing and stronger scroll/copy-link tests.

## Current Risks

- Example code snippets are still partly hand-maintained. Plan requires a real source-of-truth flow from example files.
- Component API schemas must keep being checked against installed package `.d.ts` before page work lands.
- Visual parity is not done just because routes exist; every page still needs comparison against the Claude design concept.
