import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
  path: '',
  children: [
  {path: 'all/:id',component: ProductComponent},
  {path: 'add',component:AddProductComponent },
  {path: 'details/:id',component:ProductDetailsComponent},
  ] ,
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
