import {createReducer, on} from '@ngrx/store';
import {
  loadConfigurationFailure,
  loadConfigurationSuccess,
  saveConfigurationFailure,
  saveConfigurationSuccess
} from '../actions/configuration.actions';
import {resetAppState} from '../actions/app.actions';
import {Configuration} from '../../models/configuration.model';

export interface ConfigurationState {
  configuration: Configuration | null;
  error: any;
}

export const initialState: ConfigurationState = {
  configuration: null,
  error: null
};

export const configurationReducer = createReducer(
  initialState,
  on(saveConfigurationSuccess, (state, {configuration}) => ({
    ...state,
    configuration,
    error: null
  })),
  on(saveConfigurationFailure, (state, {error}) => ({
    ...state,
    error
  })),
  on(loadConfigurationSuccess, (state, {configuration}) => ({
    ...state,
    configuration,
    error: null
  })),
  on(loadConfigurationFailure, (state, {error}) => ({
    ...state,
    error
  })),
  on(resetAppState, () => initialState)
);
