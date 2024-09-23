import {createAction, props} from '@ngrx/store';
import {Configuration} from '../../models/configuration.model';

export const saveConfiguration = createAction(
  '[Configuration] Save Configuration',
  props<{ configuration: Configuration }>()
);

export const saveConfigurationSuccess = createAction(
  '[Configuration] Save Configuration Success',
  props<{ configuration: Configuration }>()
);

export const saveConfigurationFailure = createAction(
  '[Configuration] Save Configuration Failure',
  props<{ error: any }>()
);

export const loadConfiguration = createAction(
  '[Configuration] Load Configuration',
  props<{ id: string }>()
);

export const loadConfigurationSuccess = createAction(
  '[Configuration] Load Configuration Success',
  props<{ configuration: Configuration }>()
);

export const loadConfigurationFailure = createAction(
  '[Configuration] Load Configuration Failure',
  props<{ error: any }>()
);
