import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ValidateComponent } from './validate/validate.component';

const routes: Routes = [
  {
  path: '',
  children: [
  {path: 'first',component: CheckoutComponent},
  {path: 'finish',component: ValidateComponent},

  ] ,
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
