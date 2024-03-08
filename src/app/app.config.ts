import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {UserDataRestService} from 'data-layers';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    UserDataRestService
  ]
};
