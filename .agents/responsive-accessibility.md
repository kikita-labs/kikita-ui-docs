# Responsive Design And Accessibility

Every page and shared component must work from a narrow phone to a wide desktop
without horizontal page scrolling, inaccessible hidden content, or pointer-only
interaction.

## Acceptance Viewports

Review responsive UI at least at:

| Width  | Purpose                                               |
| ------ | ----------------------------------------------------- |
| 320px  | smallest supported phone and worst-case text wrapping |
| 360px  | narrow Android viewport                               |
| 390px  | common modern phone                                   |
| 768px  | tablet / playground tablet preset                     |
| 1024px | narrow desktop and shell rail transition              |
| 1280px | standard desktop                                      |
| 1440px | wide docs layout                                      |

Also test 200% browser zoom at a desktop viewport. A fixed device list does not
replace content-driven resizing between breakpoints.

## Mobile-First Rules

- Base styles describe the narrow layout.
- Add space and columns with `min-width` queries where practical.
- Use centralized shell breakpoints. Do not invent nearby one-off values.
- Prefer container queries inside reusable docs components.
- Use logical properties.
- Use `min-inline-size: 0` on grid/flex children that may contain code or
  tables.
- Use `max-inline-size: 100%` on media and preview surfaces.
- The document must never gain horizontal scrolling to accommodate a child.
- Component-local overflow is allowed only when the content is inherently
  tabular or code-like and the scroll region is keyboard reachable and visible.

## Shell Contract

Desktop:

- header remains usable at zoom;
- left navigation and page content have independent, intentional sizing;
- right table of contents is sticky and does not compress the content below its
  minimum readable width.

Tablet:

- right TOC becomes an in-page jump control rather than disappearing without an
  alternative;
- content padding decreases;
- header actions retain accessible names when text labels collapse.

Mobile:

- sidebar uses Kikita Drawer or a CDK-backed accessible overlay;
- opening traps focus, locks background scroll, marks background content inert,
  closes on Escape/backdrop/navigation, and restores focus to the trigger;
- safe-area insets are respected;
- close/search controls remain reachable with the on-screen keyboard;
- breadcrumbs truncate by a documented pattern without losing the current page
  name.

## Shared Docs UI

### Code Tabs

- The outer component never increases document width.
- Code scrolls inside a dedicated region.
- Tab controls wrap, scroll, or collapse intentionally.
- Copy remains keyboard accessible and has a non-color status signal.
- Long filenames and tokens do not overlap actions.

### API Table

- Wrap the table in a labelled horizontal scroll region on narrow widths.
- Do not set a table minimum width that leaks into the page.
- Keep the first column understandable while scrolling when feasible.
- Provide a stacked key/value presentation only if it preserves table
  semantics or has an equivalent accessible structure.

### Live Preview

- Example controls wrap and maintain touch targets.
- The preview may have its own horizontal scroll only when demonstrating a
  deliberately wider component.
- Mobile simulation width never exceeds the available host width.
- Theme and viewport controls have text alternatives.

### API Playground

- Controls stack on narrow layouts.
- Segmented option groups with many values scroll locally or switch to a select;
  labels must never be clipped.
- The width editor and drag handle cannot force a width wider than the host.
- Pointer resizing has keyboard buttons/inputs as an equivalent.
- Preview overlays stay scoped to the preview and remain viewport-safe.

### Tables, Tabs, And Composite Examples

- Every table example owns a local responsive scroll wrapper.
- Wide option matrices may wrap or scroll locally with an accessible label.
- Sticky headers/columns are verified inside the actual scroll container.
- Tabs remain operable at zoom and on touch.

## Typography And Content

- Text uses responsive line length, normally 45-80 characters.
- Do not prevent user font scaling.
- Long package names, URLs, CSS variables, and code tokens wrap or scroll inside
  their component.
- Status text does not rely on color alone.
- Truncation requires a discoverable full value when that value matters.

## Touch And Motion

- Interactive targets are at least 44 by 44 CSS pixels unless an equally easy
  adjacent target satisfies WCAG 2.2 target-size exceptions.
- Hover-only information has focus and touch alternatives.
- Honor `prefers-reduced-motion`.
- Motion is transform/opacity based where possible and must not block input.
- Focus is never moved merely because a pointer hovered.

## Accessibility Baseline

All changed UI must:

- pass Angular template accessibility lint;
- pass automated axe checks for affected routes;
- meet WCAG 2.2 AA contrast and focus appearance;
- use native HTML semantics before ARIA;
- expose an accessible name for every control;
- preserve logical heading order and landmarks;
- associate labels, hints, errors, and controls;
- support keyboard-only operation;
- keep focus visible and predictable;
- announce asynchronous status appropriately without noisy live regions;
- avoid duplicate ids and broken `aria-controls` / `aria-describedby`;
- work in forced-colors mode for essential states.

Do not claim a component is fully accessible when real assistive-technology
review remains pending in the library source-of-truth documentation.

## Focus Rules

- Route changes focus the main page heading or main content according to one
  consistent strategy.
- Fragment navigation moves visual position and makes the target discoverable
  without trapping focus.
- Dialogs/drawers restore focus to their trigger.
- Removed or disabled controls do not leave focus lost in the document body.
- Skip links become visible on focus.

## Responsive QA Evidence

For UI changes, record in the work package:

- routes reviewed;
- viewport widths;
- keyboard path;
- overflow check (`scrollWidth === clientWidth` for the document);
- axe result;
- light/dark and reduced-motion coverage when relevant;
- screenshots or visual notes for regressions found.

## Current Known Failures

The audit on 2026-07-12 found:

- the Button docs route has document-level horizontal overflow at 375px;
- the API table reaches roughly 375px while the content column is about 329px;
- the Button Playground route also overflows at 375px;
- playground segmented controls clip long option lists;
- the mobile TOC is hidden with no equivalent jump control;
- the custom mobile sidebar requires focus-trap, inert/background, Escape,
  scroll-lock, and focus-restoration verification;
- theming controls currently fail two label-association lint checks.

These are baseline defects, not acceptable patterns for new components.
