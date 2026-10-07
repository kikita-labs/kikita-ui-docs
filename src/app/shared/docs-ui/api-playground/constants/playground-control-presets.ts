import { PLAYGROUND_LOCALES } from './playground-locales';

/** Shared `locale` control: spread it into `definePlaygroundControls` for locale-aware primitives. */
export const PLAYGROUND_LOCALE_CONTROL = {
  key: 'locale',
  label: 'locale',
  kind: 'enum',
  options: PLAYGROUND_LOCALES,
  defaultValue: 'en-US',
} as const;

/**
 * Shared `messages` control: `default` keeps the English messages, `custom` makes the preview use
 * the element's own custom message fixture (kept next to that element's playground).
 */
export const PLAYGROUND_MESSAGES_CONTROL = {
  key: 'messages',
  label: 'messages',
  kind: 'enum',
  options: ['default', 'custom'],
  defaultValue: 'default',
} as const;
