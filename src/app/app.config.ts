import { type ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withNavigationErrorHandler } from '@angular/router';

import { provideKikitaUi } from '@kikita-labs/ui';

import { DocsStaleBuildReloadService } from '@core/platform';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'disabled',
        scrollPositionRestoration: 'enabled',
      }),
      withNavigationErrorHandler(({ error }) => {
        inject(DocsStaleBuildReloadService).reloadIfStaleChunk(error);
      }),
    ),
    provideKikitaUi({
      scrollbars: 'styled',
    }),
    provideClientHydration(),
  ],
};
