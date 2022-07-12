import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderLigneComponent } from './order-ligne/order-ligne.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderHistoryComponent,
    OrderLigneComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
