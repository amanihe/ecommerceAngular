import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../guard.guard';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartItemComponent } from './cart-item/cart-item.component';
export const routes: Routes = [
 {
 path: 'cart', component:CartDetailsComponent, canActivate: [GuardGuard],
 children: [
 {path:'item',component:CartItemComponent},
 ] ,
 }
];
