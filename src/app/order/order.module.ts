import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderLigneComponent } from './order-ligne/order-ligne.component';


//drag and drop modules
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

//icone
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    OrderComponent,
    OrderHistoryComponent,
    OrderLigneComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    DragDropModule,
    MatIconModule
  ]
})
export class OrderModule { }
