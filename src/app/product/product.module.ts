import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductdetailsComponent } from './add-productdetails/add-productdetails.component';
import { AddProductcaracComponent } from './add-productcarac/add-productcarac.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddProductComponent,
    SidebarComponent,
    ProductDetailsComponent,
    AddProductdetailsComponent,
    AddProductcaracComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
 
   
  ]
})
export class ProductModule { }
