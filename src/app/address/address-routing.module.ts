import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../guard.guard';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  {
  path: '',canActivate: [GuardGuard],
  children: [
  {path: 'book',component: AddressComponent},
  {path: 'add',component:AddAddressComponent },

  ] ,
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
