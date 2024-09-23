import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {importProvidersFrom, isDevMode} from '@angular/core';
import {appConfig} from "./app/app.config";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from "@angular/material/core";
import {configurationReducer} from "./app/state/reducers/configuration.reducer";
import {orderReducer} from "./app/state/reducers/order.reducer";
import {ConfigurationEffects} from "./app/state/effects/configuration.effects";
import {OrderEffects} from "./app/state/effects/order.effects";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      configuration: configurationReducer,
      order: orderReducer
    }),
    provideEffects([ConfigurationEffects, OrderEffects]),
    importProvidersFrom(MatNativeDateModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })

]
});
