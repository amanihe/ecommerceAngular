import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  {
  path: '',
  children: [
  {path: 'all',component: FactureComponent},
  {path: 'detailsPDF/:id',component : DetailsComponent},
  {path: 'all/:id',component: FactureComponent},
  ] ,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactureRoutingModule { }
