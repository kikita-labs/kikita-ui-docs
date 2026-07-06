import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};
