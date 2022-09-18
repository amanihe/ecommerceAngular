import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture/facture.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FactureComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    FormsModule,
  ]
})
export class FactureModule { }
