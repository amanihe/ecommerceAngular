import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderLigneComponent } from './order-ligne/order-ligne.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'etats', component: OrderComponent },
      { path: 'history', component: OrderHistoryComponent },
      { path: 'lignes', component: OrderLigneComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
