import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { AddProductdetailsComponent } from './add-productdetails/add-productdetails.component';
import { AddProductcaracComponent } from './add-productcarac/add-productcarac.component';

const routes: Routes = [
  {
  path: '',
  children: [
  {path: 'all/:id',component: ProductComponent},
  {path: 'add',component:AddProductComponent },
  {path: 'details/:id',component:ProductDetailsComponent},
  {path: 'addProductdetails/:id',component:AddProductdetailsComponent},
  {path:'addProductcarac/:id',component:AddProductcaracComponent},
  ] ,
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
