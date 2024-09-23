import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ConfigurationService} from '../../services/configuration.service';
import {
  loadConfiguration,
  loadConfigurationFailure,
  loadConfigurationSuccess,
  saveConfiguration,
  saveConfigurationFailure,
  saveConfigurationSuccess
} from '../actions/configuration.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ConfigurationEffects {

  actions$ = inject(Actions)

  constructor(
    private configurationService: ConfigurationService
  ) {
  }

  saveConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveConfiguration),
      mergeMap(action =>
        this.configurationService.createConfiguration(action.configuration).pipe(
          map(configuration => saveConfigurationSuccess({configuration})),
          catchError(error => of(saveConfigurationFailure({error})))
        )
      )
    )
  );

  loadConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConfiguration),
      mergeMap(action =>
        this.configurationService.getConfiguration(action.id).pipe(
          map(configuration => loadConfigurationSuccess({configuration})),
          catchError(error => of(loadConfigurationFailure({error})))
        )
      )
    )
  );
}
