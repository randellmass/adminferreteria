import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SolicitudesDashboardComponent } from './pages/dashboard/pages/solicitudes/solicitudes-dashboard/solicitudes-dashboard.component';
import { MainComponent } from './main.component';


@NgModule({
  declarations: [
    SolicitudesDashboardComponent,
    MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
