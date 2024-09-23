import {Routes} from '@angular/router';
import {ConfigurationFormComponent} from './pages/configuration-form/configuration-form.component';
import {OrderFormComponent} from './pages/order-form/order-form.component';
import {SummaryComponent} from './pages/summary/summary.component';

export const routes: Routes = [
  {path: '', redirectTo: 'configuration', pathMatch: 'full'},
  {path: 'configuration', component: ConfigurationFormComponent},
  {path: 'order', component: OrderFormComponent},
  {path: 'summary', component: SummaryComponent},
];
