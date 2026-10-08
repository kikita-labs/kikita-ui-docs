# Migrating to 2.0

> Every breaking change of @kikita-labs/ui 2.0: renamed exports, provider defaults, locale and messages, icons, tokens, component behaviour and the charts.

- Status: available
- Route: /foundations/migration
- Package: @kikita-labs/ui@2.0.0

## Content

### Automatic migration
Update the package and run the migration that ships with it. It renames identifiers only and never touches strings, comments or templates.
#### terminal

```bash
ng update @kikita-labs/ui
```

#### terminal

```bash
ng update @kikita-labs/ui --migrate-only --from=1.8.0 --to=2.0.0
```

#### terminal

```bash
git grep -nE "Kui[A-Za-z]+(Component|Directive)\b|KuiToastService|kuiProvideLocale"
```

### Naming rule and renamed exports
An Angular class is named for what it is, not for the construct that declares it. There are no compatibility aliases: the old names no longer exist in 2.0.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| KuiButtonDirective | KuiButton | - | A directive loses its suffix. |
| KuiTabsComponent | KuiTabs | - | A component loses its suffix. |
| KuiToastService | KuiToast | - | A service loses its suffix; kuiToast() still returns it. |
| KuiSelectCellComponent | KuiSelectCell | - | Table selection parts are renamed the same way. |
| kuiProvideLocale | provideKuiLocale | - | Returns Provider[] and accepts a Signal. |

### Provider defaults
Component defaults moved from six injection tokens to one mechanism, KuiDefaults. A nested provider now merges with its parent per property.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| KUI_BUTTON_OPTIONS, KUI_FIELD_OPTIONS, KUI_SELECT_OPTIONS | provideKuiDefaults({ button, field, select }) | - | The injection tokens are removed. |
| KUI_COMBOBOX_OPTIONS, KUI_TOOLTIP_OPTIONS, KUI_TOAST_OPTIONS | provideKuiDefaults({ combobox, tooltip, toast }) | - | The injection tokens are removed. |
| kuiProvideButtonOptions, kuiProvideFieldOptions, kuiProvideSelectOptions | provideKuiDefaults | - | Deprecated, forward to provideKuiDefaults, removed in 3.0. |
| kuiProvideComboboxOptions, kuiProvideTooltipOptions, provideKuiToastOptions | provideKuiDefaults | - | Deprecated, forward to provideKuiDefaults, removed in 3.0. |
| provideKikitaUi({ tooltip }) | provideKikitaUi({ defaults: { tooltip } }) | - | Deprecated. |
| KikitaUiDefaults | KuiComponentDefaults | - | Deprecated alias, removed in 3.0. |
| KuiButtonOptions as { button, iconButton } | KuiButtonProviderOptions | - | KuiButtonOptions now describes one button. |

### Locale and messages
All text the library owns is a typed message with an English default.

### Icons
Structural icons are replaceable data, and the Lucide set is read at a pinned version.

### Component behaviour
Behaviour that differs from 1.x. Each item names the component, so search this list for the ones you use.

### Packaging and styles
Style delivery changed, and field and icon now need the shared stylesheet like every other component.

### Token and style changes
Token names are kept with the exceptions below. Colour tokens have their own table on the Theming page.

### Chart behaviour
The four charts changed their keyboard model, tooltip data and sizing.

### Verify the upgrade
Work through these checks in order after the automatic migration.
