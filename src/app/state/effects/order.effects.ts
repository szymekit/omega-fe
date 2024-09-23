import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {OrderService} from '../../services/order.service';
import {
  loadOrder,
  loadOrderFailure,
  loadOrderSuccess,
  saveOrder,
  saveOrderFailure,
  saveOrderSuccess
} from '../actions/order.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class OrderEffects {

  actions$ = inject(Actions)

  constructor(
    private orderService: OrderService
  ) {
  }

  saveOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveOrder),
      mergeMap(action =>
        this.orderService.createOrder(action.order).pipe(
          map(order => saveOrderSuccess({order})),
          catchError(error => of(saveOrderFailure({error})))
        )
      )
    )
  );

  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrder),
      mergeMap(action =>
        this.orderService.getOrder(action.id).pipe(
          map(order => loadOrderSuccess({order})),
          catchError(error => of(loadOrderFailure({error})))
        )
      )
    )
  );
}
