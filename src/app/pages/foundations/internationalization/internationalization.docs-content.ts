import type { ApiTableRow } from '@shared/docs-ui/api-table';
import type { CodeTab } from '@shared/docs-ui/code-tabs';

export const INTERNATIONALIZATION_SETTINGS_ROWS = [
  {
    name: 'Locale',
    type: 'locale',
    description:
      'Month and weekday names, week start and weekend, date and time layout, numbers and plural rules.',
  },
  {
    name: 'Messages',
    type: 'messages',
    description:
      'The text of the library: accessible names, visible words, placeholders, hints and announcements.',
  },
] as const satisfies readonly ApiTableRow[];

export const INTERNATIONALIZATION_QUICK_TABS = [
  {
    label: 'Root provider',
    filename: 'app.config.ts',
    language: 'ts',
    code: `import { provideKikitaUi, type KuiMessagesLayer } from '@kikita-labs/ui';

const german: KuiMessagesLayer = {
  pagination: { next: 'Weiter', previous: 'Zurueck' },
  calendar: { today: 'Heute' },
};

provideKikitaUi({ locale: 'de-DE', messages: german });`,
  },
  {
    label: 'Function message',
    filename: 'messages.ts',
    language: 'ts',
    code: `import { type KuiMessagesLayer } from '@kikita-labs/ui';

const german: KuiMessagesLayer = {
  pagination: {
    summary: ({ start, end, total }) => \`\${start}-\${end} von \${total}\`,
  },
};`,
  },
] as const satisfies readonly CodeTab[];

export const INTERNATIONALIZATION_RUNTIME_TABS = [
  {
    label: 'Signals',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({
  locale: () => inject(LanguageService).locale, // Signal<string>
  messages: () => inject(LanguageService).messages, // Signal<KuiMessagesLayer>
});`,
  },
  {
    label: 'KuiI18n',
    filename: 'language.service.ts',
    language: 'ts',
    code: `inject(KuiI18n).setLocale('fr-FR');
inject(KuiI18n).setMessages(frenchMessages);`,
  },
  {
    label: 'Angular LOCALE_ID',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({ locale: () => inject(LOCALE_ID) });`,
  },
] as const satisfies readonly CodeTab[];

export const INTERNATIONALIZATION_SUBTREE_TABS = [
  {
    label: 'Subtree level',
    filename: 'booking.component.ts',
    language: 'ts',
    code: `@Component({
  providers: [
    provideKuiI18n({ locale: 'fr-FR', messages: { calendar: { today: "Aujourd'hui" } } }),
  ],
})
export class BookingComponent {}`,
  },
] as const satisfies readonly CodeTab[];

export const INTERNATIONALIZATION_HELPERS_ROWS = [
  {
    name: 'ctx.locale',
    type: 'string',
    description: 'The resolved locale tag.',
  },
  {
    name: 'ctx.formatNumber(n)',
    type: 'string',
    description:
      'A number with the grouping and decimal separators of the locale, in Latin digits.',
  },
  {
    name: 'ctx.plural(n, { one, ... })',
    type: 'string',
    description: 'The form Intl.PluralRules selects: zero, one, two, few, many or other.',
  },
] as const satisfies readonly ApiTableRow[];

export const INTERNATIONALIZATION_PLURAL_TABS = [
  {
    label: 'Plural message',
    filename: 'messages.ts',
    language: 'ts',
    code: `fileUpload: {
  tooMany: ({ max }, { formatNumber, plural }) =>
    \`Maksymalnie \${formatNumber(max)} \${plural(max, { one: 'plik', few: 'pliki', many: 'plikow', other: 'pliku' })}\`,
},`,
  },
  {
    label: 'Translation library',
    filename: 'app.config.ts',
    language: 'ts',
    code: `provideKikitaUi({
  messages: () => {
    const transloco = inject(TranslocoService);
    const catalogue = toSignal(transloco.selectTranslateObject('kui'));
    return computed(() => toKuiMessages(catalogue()));
  },
});`,
  },
] as const satisfies readonly CodeTab[];

export const INTERNATIONALIZATION_AREAS_ROWS = [
  {
    name: 'Calendar',
    type: 'locale',
    description:
      'Month and weekday names; heading order; first day and weekend from Intl.Locale getWeekInfo (static fallback for older engines); every day button named with its full date.',
  },
  {
    name: 'Date Picker',
    type: 'locale',
    description:
      'Field order and separator of the numeric date (10/03/2026, 03.10.2026). Parsing reads digit groups and needs a four digit year; format pins a layout.',
  },
  {
    name: 'Time Picker',
    type: 'locale',
    description:
      'Default 12 or 24 hour cycle, the separator, the day period text and its position; typing accepts the locale AM/PM text and ASCII am/pm.',
  },
  {
    name: 'Pagination, Carousel, Media Viewer, OTP',
    type: 'locale',
    description: 'Counts and positions are formatted with the locale.',
  },
  {
    name: 'Charts',
    type: 'locale',
    description:
      'The default value format is the compact notation of the locale (1.2K in English, 1,5 Mio. in German).',
  },
  {
    name: 'File Upload',
    type: 'locale',
    description: 'Sizes use Intl units (2.5 MB, 340 kB) and progress uses a percent format.',
  },
] as const satisfies readonly ApiTableRow[];

export const INTERNATIONALIZATION_REFERENCE_ROWS = [
  {
    name: 'provideKikitaUi({ locale, messages })',
    type: 'Provider',
    description: 'Root locale and messages.',
  },
  {
    name: 'provideKuiI18n({ locale, messages })',
    type: 'Provider[]',
    description: 'A level for a subtree.',
  },
  {
    name: 'provideKuiLocale(locale)',
    type: 'Provider[]',
    description: 'Locale only. Accepts a tag, a Signal or a function.',
  },
  {
    name: 'provideKuiMessages(messages)',
    type: 'Provider[]',
    description: 'Messages only.',
  },
  {
    name: 'KuiI18n',
    type: 'service',
    description: 'locale, messages, context, get(group), setLocale and setMessages.',
  },
  {
    name: 'KuiMessages, KuiMessagesLayer',
    type: 'types',
    description: 'The full message map and its partial override.',
  },
  {
    name: 'KuiMessageContext, KuiPluralForms',
    type: 'types',
    description: 'Helpers passed to function messages.',
  },
  {
    name: 'KUI_ENGLISH_MESSAGES',
    type: 'KuiMessages',
    description: 'The complete English pack.',
  },
  {
    name: 'KUI_LOCALE',
    type: 'InjectionToken',
    description: 'Root locale source: request, transfer state, navigator.',
  },
  {
    name: 'getKuiCalendarLocaleText(locale)',
    type: 'function',
    description: 'Month and weekday names, first day and weekend for a locale (pure, no cache).',
  },
] as const satisfies readonly ApiTableRow[];
