# Platform Access And State Management

This application is signals-first and browser-capability-safe. This document
defines where state lives and where browser APIs may be used.

## State Ownership

Use the narrowest owner:

- local interaction state: the component that renders it;
- feature state: a feature-local service only when sibling components share it;
- app state: a core service only when independent areas share one source;
- URL state: the Angular Router;
- persisted preference: a domain service backed by the storage adapter;
- server/request state: an async service or resource, projected to signals at
  the component boundary.

Do not promote state to a service for convenience. Do not duplicate URL or
derived state in multiple writable signals.

## Signals Contract

- Writable signals are private unless the owning component template changes
  them directly through an intentional model.
- Services expose readonly signals and public command methods.
- Derived state is computed.
- Effects perform external side effects only.
- Signal writes are synchronous, small, and predictable.
- Collection updates return a new array, object, map, or set.
- Avoid writable maps/sets escaping their owner.
- Do not use Subjects, BehaviorSubjects, NgRx, or mutable singleton objects as
  application state.

## Router State

- Prefer route data, params, query params, fragments, and router navigation.
- Convert router streams with `toSignal()` when state is consumed
  declaratively.
- Use `takeUntilDestroyed()` only for command-like side effects.
- Do not parse the current URL independently in the header, shell, sidebar, and
  search. Derive common page identity from the typed registry and active route.
- Do not call `history.pushState`, assign `location.hash`, or build navigation
  behavior around direct location mutation.

## Browser API Rule

Outside `src/app/core/platform/**`, the following are forbidden:

- `window`, `document`, and `navigator`;
- `localStorage` and `sessionStorage`;
- `location` and `history`;
- `matchMedia`;
- `IntersectionObserver`, `ResizeObserver`, and `MutationObserver`;
- `requestAnimationFrame`, `setTimeout`, and `setInterval`;
- manually attached document/window listeners.

Injecting `DOCUMENT` directly into an ordinary component is also forbidden.
The adapter layer may inject `DOCUMENT`, `PLATFORM_ID`,
`ViewportScroller`, CDK services, and other Angular platform facilities.

Tests may use the test environment's DOM to assert adapter effects. Test setup
must reset modified state.

## Required Platform Capabilities

Create small adapters, not one generic browser facade:

### Clipboard

- Input: text to copy.
- Output: typed success/failure result.
- Use the injected document's default view or supported browser capability only
  inside the adapter.
- Components decide toast copy; the adapter does not own presentation.
- Provide a deterministic test fake.

### Storage

- Namespaced keys only.
- Typed read/write/remove methods with parser and serializer functions.
- Handle unavailable, denied, corrupt, and quota failures.
- No raw JSON parsing in feature services.
- Server mode returns a defined fallback without throwing.

### Anchor Navigation

- Own fragment navigation, scroll offset, focus transfer, and reduced-motion
  behavior.
- Use Router/ViewportScroller rather than history/location mutation.
- Preserve stable URLs and browser back/forward behavior.
- Let `DocSection` and `PageToc` share this capability.

### Viewport And Media

- Use CDK `BreakpointObserver` or an equivalent injected adapter.
- Expose readonly signals for application breakpoints and user preferences.
- Centralize breakpoint definitions.
- Do not scatter `matchMedia` calls or duplicate breakpoint numbers in
  TypeScript.

### Heading Observation

- Prefer an explicit section registry: `DocSection` registers id and label,
  and `PageToc` consumes the registry.
- If intersection observation remains necessary, isolate it in a directive or
  adapter with lifecycle cleanup and a test fake.
- Do not query `#main-content h2[id]` after arbitrary timeouts.

### Scheduling

- Prefer `afterNextRender` / `afterRenderEffect` for render timing.
- Prefer RxJS `timer` with destruction/cancellation for simulated async work.
- Use an injected scheduler abstraction only when deterministic delay is part
  of a feature contract.
- No component-owned global timers.

### Element Resize And Pointer Tracking

- Encapsulate observer/listener setup in a directive or adapter.
- Clean up through `DestroyRef`.
- Use pointer capture when appropriate.
- Preserve keyboard alternatives; resizing cannot be pointer-only.

## Theme Architecture

Split the current theme responsibilities:

- theme mode state and commands;
- seed-color state and validation;
- code-theme preference;
- theme stylesheet rendering;
- persisted preference adapter.

The domain services expose signals. The platform adapters own storage and DOM
effects. Theme parsing and validation are pure functions with tests.

Do not put storage access, DOM style creation, media preference detection,
theme creation, code-theme selection, and every public command in one growing
service.

## Async Examples

Examples are consumer code and must model safe Angular patterns:

- request cancellation for changing queries;
- explicit loading, empty, success, and error state;
- no naked `window.setTimeout`;
- no subscription without cleanup/error behavior;
- signals for rendered state;
- realistic provider/service boundaries when the example claims to demonstrate
  async data.

Keep examples short, but do not teach unsafe shortcuts.

## Error Handling

- Platform failures become typed results or domain fallbacks.
- Components present user-facing failure only when actionable.
- Do not silently catch and return from every side effect.
- Corrupt stored data falls back safely and may be removed by the storage
  adapter.
- Clipboard failure produces a clear toast and leaves the URL intact.
- Highlighting failure falls back to escaped plain code, never unsafe HTML.

## Enforcement

Add restricted-global and restricted-import lint rules. Maintain an allow-list
only for `core/platform/**` and test setup. A comment disabling the rule needs
an ADR or work-package reference and a removal condition.

## Current Migration Targets

- `DocsThemeService`: split platform and domain concerns.
- `PageToc`: replace DOM query, observer ownership, timeout, and history calls.
- `DocSection`: replace direct document, navigator, window, and history access.
- `CodeTabs`: route clipboard work through the adapter.
- `ApiPlaygroundViewport`: isolate pointer/viewport behavior and add keyboard
  resizing.
- async Combobox example: replace the global timer with a cancellable Angular
  async pattern.
