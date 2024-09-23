import {createReducer, on} from '@ngrx/store';
import {loadOrderFailure, loadOrderSuccess, saveOrderFailure, saveOrderSuccess} from '../actions/order.actions';
import {resetAppState} from '../actions/app.actions';
import {Order} from '../../models/order.model';

export interface OrderState {
  order: Order | null;
  error: any;
}

export const initialState: OrderState = {
  order: null,
  error: null
};

export const orderReducer = createReducer(
  initialState,
  on(saveOrderSuccess, (state, {order}) => ({
    ...state,
    order,
    error: null
  })),
  on(saveOrderFailure, (state, {error}) => ({
    ...state,
    error
  })),
  on(loadOrderSuccess, (state, {order}) => ({
    ...state,
    order,
    error: null
  })),
  on(loadOrderFailure, (state, {error}) => ({
    ...state,
    error
  })),
  on(resetAppState, () => initialState)
);
