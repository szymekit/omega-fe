import {createAction, props} from '@ngrx/store';
import {Order} from '../../models/order.model';

export const saveOrder = createAction(
  '[Order] Save Order',
  props<{ order: Order }>()
);

export const saveOrderSuccess = createAction(
  '[Order] Save Order Success',
  props<{ order: Order }>()
);

export const saveOrderFailure = createAction(
  '[Order] Save Order Failure',
  props<{ error: any }>()
);

export const loadOrder = createAction(
  '[Order] Load Order',
  props<{ id: string }>()
);

export const loadOrderSuccess = createAction(
  '[Order] Load Order Success',
  props<{ order: Order }>()
);

export const loadOrderFailure = createAction(
  '[Order] Load Order Failure',
  props<{ error: any }>()
);
