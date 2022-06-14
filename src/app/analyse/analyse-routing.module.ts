import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyseComponent } from './analyse/analyse.component';
import { NgChartsModule } from 'ng2-charts';
const routes: Routes = [ {
  path: '',
  children: [
    { path: 'all',component: AnalyseComponent},
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes),NgChartsModule],
  exports: [RouterModule]
})
export class AnalyseRoutingModule { }
