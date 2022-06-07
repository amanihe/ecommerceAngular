import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
  path: '',
  children: [
  {path: 'etats',component: OrderComponent},
  {path: 'history', component: OrderHistoryComponent},

  ] ,
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
