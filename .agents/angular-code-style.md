# Angular 22 And TypeScript Code Style

This is the mandatory coding standard for production code, examples, tests, and
generated TypeScript in this repository.

## Angular Baseline

- Angular 22 or newer only.
- Standalone artifacts only. Do not add NgModules.
- Do not write `standalone: true`; it is the default.
- Do not set `ChangeDetectionStrategy.OnPush`; it is the Angular 22 default.
- Prefer `inject()` over constructor injection.
- Use `input()`, `input.required()`, `model()`, and `output()` instead of
  decorator inputs/outputs.
- Put host bindings and listeners in the decorator `host` object. Do not use
  `@HostBinding` or `@HostListener`.
- Use native control flow: `@if`, `@for`, `@switch`, and `@defer` when
  deferral is measured and appropriate.
- Use `NgOptimizedImage` for static raster images.
- Prefer Signal Forms for new forms. Use typed reactive forms only when Signal
  Forms cannot express the requirement.
- Keep the app compatible with zoneless change detection.

## Class Member Visibility

Every class member has intentional visibility:

- `public`: an actual class API consumed by another TypeScript class or an
  Angular input/output/model. Public is never the default by accident.
- `protected`: consumed only by the class template.
- `private`: implementation detail not used by the template.

Use explicit visibility on fields, accessors, and methods. Constructors are the
only normal exception.

Examples:

```ts
export class ExampleCard {
  public readonly title = input.required<string>();
  public readonly selected = output<string>();

  private readonly router = inject(Router);
  private readonly selectedId = signal<string | null>(null);

  protected readonly isSelected = computed(() => this.selectedId() !== null);

  protected select(id: string): void {
    this.selectedId.set(id);
    this.selected.emit(id);
  }
}
```

## Readonly Rules

Use `readonly` for:

- injected dependencies;
- input, output, model, signal, computed, query, and resource references;
- static view data and constant arrays;
- callback properties and snippet builders that are not reassigned;
- exposed service signals;
- context objects and immutable model properties.

A writable signal is still a readonly field: its value changes, its field
reference does not.

Omit `readonly` only when the property reference must be reassigned. Document
why reassignment is part of the lifecycle. Prefer a signal over a mutable field
when the template depends on the value.

## Component Shape

Order a component class consistently:

1. public Angular API: inputs, models, outputs;
2. injected dependencies;
3. private writable state;
4. protected readonly template state and constants;
5. constructor/render hooks;
6. protected template event handlers;
7. private helpers.

Decorator order:

1. selector;
2. imports;
3. providers;
4. template/templateUrl;
5. styleUrl/styleUrls;
6. host;
7. exportAs.

Keep decorator imports alphabetized by exported symbol after import sorting.

## Signals

- Use `signal()` for owned mutable state.
- Use `computed()` for derivation.
- Expose service-owned writable signals with `.asReadonly()`.
- Update collections immutably with `.set()` or `.update()`.
- Do not use `mutate()`.
- Do not read signals repeatedly in one algorithm when one local read is
  clearer.
- Do not create an effect to synchronize derived state.
- Effects are for external side effects and require a clear owner and cleanup.
- Use `untracked()` only when the non-dependency is intentional and explained
  by the surrounding function.
- Do not store transient template calculations in methods called on every
  render; use computed state or precomputed view models.

## RxJS Interop

RxJS remains valid for router events, package APIs, HTTP, timers, and external
streams. It is not the component state store.

- Convert a stream to a signal with `toSignal()` when the template or computed
  state consumes it.
- Use `takeUntilDestroyed()` for imperative subscriptions.
- A direct `.subscribe()` needs an intentional side effect and error policy.
- Do not add Subjects or BehaviorSubjects as state containers.
- Do not nest subscriptions.
- Keep stream mapping pure and handle cancellation for request-like behavior.

## Types

- Strict TypeScript is required.
- Never use `any`. Use `unknown` at untrusted boundaries, then narrow.
- Prefer inference when the type is obvious.
- Use `satisfies` to validate constant configuration without widening it.
- Prefer discriminated unions to boolean flag combinations.
- Prefer readonly arrays/records for reference data.
- Use `import type` for type-only imports.
- Do not add type assertions to silence a design problem. Narrow, parse, or
  improve the generic API.
- Double assertions and non-null assertions are forbidden.
- Validate values read from JSON, storage, route data, DOM events, and package
  callbacks before treating them as a domain type.
- Use exhaustive switches with a `never` guard for closed unions.
- Prefer `const` objects plus literal unions over enums unless runtime enum
  semantics are specifically required.

## Functions

- Keep one abstraction level per function.
- Use early returns for invalid or terminal paths.
- Prefer at most three positional parameters; use an options object above that.
- Keep transformations pure. Move I/O to an adapter or command method.
- Name event handlers by intent: `openSearch`, `selectViewport`,
  `handleMenuKeydown`.
- Name boolean values with `is`, `has`, `can`, or `should`.
- A callback stored as a field is `readonly`.
- Do not hide errors in empty catches. Return a typed fallback/result or report
  the failure through the owning UI contract.

## Templates

- Prefer native elements and semantics.
- Keep expressions simple; no parsing, filtering, sorting, or object
  construction in templates.
- Every `@for` has a stable track expression. Use `$index` only for truly
  static positional content.
- Do not use `ngClass` or `ngStyle`; use class and style bindings.
- Use property and attribute bindings intentionally. Do not add ARIA where
  native semantics already express the contract.
- Event handlers do not cast `$event` in the template.
- Repeated signal reads should be captured with `@let` when it improves
  clarity.
- Avoid template method calls for derivation. Small id/lookup helpers are
  acceptable only when pure and proven insignificant.
- Keep headings hierarchical and form labels associated with controls.

## DOM Events

Prefer typed helpers over repeated assertions:

```ts
export function eventInputValue(event: Event): string {
  const target = event.target;
  return target instanceof HTMLInputElement ? target.value : '';
}
```

Feature code must not repeatedly cast `event.target as HTMLInputElement`.
Shared controls should expose value-centric outputs where possible.

## Files And Naming

- Kebab-case filenames and folders.
- Page classes end with `Page`; example classes end with `Example`.
- Services end with `Service`; adapters use a capability name.
- Constants use `UPPER_SNAKE_CASE`.
- Types and classes use PascalCase; values and functions use camelCase.
- Do not prefix interfaces with `I`.
- Use one primary Angular artifact per implementation file.
- Keep `.ts`, `.html`, and `.scss` together for non-trivial components.
- Inline templates are acceptable only for very small, behavior-light
  components and examples.

## Comments

Comments explain a constraint, workaround, or reason that code cannot express.
Do not narrate the code. Every TODO includes a work-package reference or issue
and a removal condition.

## Review Thresholds

- Review TypeScript above 150 lines and require decomposition reasoning above
  200 lines.
- Review templates above 120 lines.
- Review SCSS above 160 lines and obey Angular style budgets.
- Review functions above 30 lines or with nested branching beyond two levels.
- Do not split files mechanically to game thresholds.

## Prohibited Angular Patterns

- NgModules, NgRx, decorator inputs/outputs, host decorators.
- Explicit standalone or OnPush flags.
- Template-driven forms for new code.
- Unmanaged subscriptions.
- Browser globals in feature code.
- State mutation hidden inside getters or computed functions.
- Side effects in signal derivations.
- Services that combine unrelated theme, storage, DOM, and navigation
  responsibilities.
