import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { KeycloakService } from './_utils/keycloak/keycloak.service';
import { keycloakHttpInterceptor } from './_utils/http/keycloak-http.interceptor';

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<void> {
  return () => keycloak.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([keycloakHttpInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService], // Wstrzykiwanie serwisu
      multi: true,
    },
  ],
};
