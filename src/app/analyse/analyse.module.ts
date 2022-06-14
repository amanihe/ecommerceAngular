import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyseRoutingModule } from './analyse-routing.module';
import { AnalyseComponent } from './analyse/analyse.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AnalyseComponent
  ],
  imports: [
    CommonModule,
    AnalyseRoutingModule,
    NgChartsModule,


  ]
})
export class AnalyseModule { }
