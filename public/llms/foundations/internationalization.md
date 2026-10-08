# Internationalization

> Locale and messages are two independent settings: the locale formats dates, numbers and plurals, the messages translate the text the library owns.

- Status: available
- Route: /foundations/internationalization
- Package: @kikita-labs/ui@2.0.0

## Content

### Locale and messages
An application can change either one without the other: German dates with English labels, or French messages with the locale of the request. The library ships English only.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Locale | locale | - | Month and weekday names, week start and weekend, date and time layout, numbers and plural rules. |
| Messages | messages | - | The text of the library: accessible names, visible words, placeholders, hints and announcements. |

### Quick start
Set the locale and a partial messages layer in the root provider. Only the keys you write change; every other key keeps its English default.
#### app.config.ts

```ts
import { provideKikitaUi, type KuiMessagesLayer } from '@kikita-labs/ui';

const german: KuiMessagesLayer = {
  pagination: { next: 'Weiter', previous: 'Zurueck' },
  calendar: { today: 'Heute' },
};

provideKikitaUi({ locale: 'de-DE', messages: german });
```

#### messages.ts

```ts
import { type KuiMessagesLayer } from '@kikita-labs/ui';

const german: KuiMessagesLayer = {
  pagination: {
    summary: ({ start, end, total }) => `${start}-${end} von ${total}`,
  },
};
```

### Follow the language at runtime
Pass a Signal or a function. The library re-renders its labels when the signal changes and nothing is recreated.
#### app.config.ts

```ts
provideKikitaUi({
  locale: () => inject(LanguageService).locale, // Signal<string>
  messages: () => inject(LanguageService).messages, // Signal<KuiMessagesLayer>
});
```

#### language.service.ts

```ts
inject(KuiI18n).setLocale('fr-FR');
inject(KuiI18n).setMessages(frenchMessages);
```

#### app.config.ts

```ts
provideKikitaUi({ locale: () => inject(LOCALE_ID) });
```

### Override a subtree or one instance
Levels and per-instance inputs let one part of the page differ without affecting another.
#### booking.component.ts

```ts
@Component({
  providers: [
    provideKuiI18n({ locale: 'fr-FR', messages: { calendar: { today: "Aujourd'hui" } } }),
  ],
})
export class BookingComponent {}
```

### Writing a translation
Copy KUI_ENGLISH_MESSAGES, translate the values and let the compiler check every key.
#### messages.ts

```ts
fileUpload: {
  tooMany: ({ max }, { formatNumber, plural }) =>
    `Maksymalnie ${formatNumber(max)} ${plural(max, { one: 'plik', few: 'pliki', many: 'plikow', other: 'pliku' })}`,
},
```

#### app.config.ts

```ts
provideKikitaUi({
  messages: () => {
    const transloco = inject(TranslocoService);
    const catalogue = toSignal(transloco.selectTranslateObject('kui'));
    return computed(() => toKuiMessages(catalogue()));
  },
});
```
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ctx.locale | string | - | The resolved locale tag. |
| ctx.formatNumber(n) | string | - | A number with the grouping and decimal separators of the locale, in Latin digits. |
| ctx.plural(n, { one, ... }) | string | - | The form Intl.PluralRules selects: zero, one, two, few, many or other. |

### Where the locale comes from
The locale is resolved from the nearest source and checked against the runtime Intl.

### What the locale controls
Each area below follows the resolved locale.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Calendar | locale | - | Month and weekday names; heading order; first day and weekend from Intl.Locale getWeekInfo (static fallback for older engines); every day button named with its full date. |
| Date Picker | locale | - | Field order and separator of the numeric date (10/03/2026, 03.10.2026). Parsing reads digit groups and needs a four digit year; format pins a layout. |
| Time Picker | locale | - | Default 12 or 24 hour cycle, the separator, the day period text and its position; typing accepts the locale AM/PM text and ASCII am/pm. |
| Pagination, Carousel, Media Viewer, OTP | locale | - | Counts and positions are formatted with the locale. |
| Charts | locale | - | The default value format is the compact notation of the locale (1.2K in English, 1,5 Mio. in German). |
| File Upload | locale | - | Sizes use Intl units (2.5 MB, 340 kB) and progress uses a percent format. |

### Accessibility and testing
Accessible names come from the same messages as the visible text.

### Reference
The public API of the locale and messages layer.
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| provideKikitaUi({ locale, messages }) | Provider | - | Root locale and messages. |
| provideKuiI18n({ locale, messages }) | Provider[] | - | A level for a subtree. |
| provideKuiLocale(locale) | Provider[] | - | Locale only. Accepts a tag, a Signal or a function. |
| provideKuiMessages(messages) | Provider[] | - | Messages only. |
| KuiI18n | service | - | locale, messages, context, get(group), setLocale and setMessages. |
| KuiMessages, KuiMessagesLayer | types | - | The full message map and its partial override. |
| KuiMessageContext, KuiPluralForms | types | - | Helpers passed to function messages. |
| KUI_ENGLISH_MESSAGES | KuiMessages | - | The complete English pack. |
| KUI_LOCALE | InjectionToken | - | Root locale source: request, transfer state, navigator. |
| getKuiCalendarLocaleText(locale) | function | - | Month and weekday names, first day and weekend for a locale (pure, no cache). |
