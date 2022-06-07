import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import {routes} from './cart-routing.module';


@NgModule({
  declarations: [
    CartDetailsComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CartModule { }
