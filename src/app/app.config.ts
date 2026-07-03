import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideKikitaUi } from '@kikita-labs/ui';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideKikitaUi({
      scrollbars: 'styled',
    }),
  ],
};
