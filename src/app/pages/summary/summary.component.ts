import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Configuration} from '../../models/configuration.model';
import {Order} from '../../models/order.model';
import {AsyncPipe, DatePipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {resetAppState} from "../../state/actions/app.actions";

interface AppState {
  configuration: {configuration: Configuration, error: any};
  order: {order: Order, error: any};
}

interface SummaryData {
  configuration: Configuration;
  order: Order;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatButton,
    DatePipe,
    NgForOf,
    JsonPipe,
    /* Angular Material Modules */]
})
export class SummaryComponent {
  summaryData$: Observable<SummaryData | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.summaryData$ = combineLatest([
      this.store.select(state => state.configuration.configuration),
      this.store.select(state => state.order.order),
    ]).pipe(
      map(([configuration, order]) => {
        if (configuration && order) {
          console.log({configuration, order})
          return {configuration, order};
        }
        return null;
      })
    )
  }

  finish(): void {
    this.store.dispatch(resetAppState());
    this.router.navigate(['/']);
  }
}
