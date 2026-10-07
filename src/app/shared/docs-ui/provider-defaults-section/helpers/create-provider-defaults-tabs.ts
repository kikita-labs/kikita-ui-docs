import { type CodeTab } from '@shared/docs-ui/code-tabs';

/** Application-wide and subtree snippets for one `defaults.<key>` entry. */
export function createProviderDefaultsTabs(defaultsKey: string): readonly CodeTab[] {
  return [
    {
      label: 'Application',
      filename: 'app.config.ts',
      language: 'ts',
      code: `import { provideKikitaUi } from '@kikita-labs/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKikitaUi({
      defaults: {
        ${defaultsKey}: {
          /* options below */
        },
      },
    }),
  ],
};`,
    },
    {
      label: 'Subtree',
      filename: 'feature.providers.ts',
      language: 'ts',
      code: `import { provideKuiDefaults } from '@kikita-labs/ui';

// A component, route or environment injector: applies to that subtree only.
providers: [
  provideKuiDefaults({
    ${defaultsKey}: {
      /* options below */
    },
  }),
];`,
    },
  ];
}
