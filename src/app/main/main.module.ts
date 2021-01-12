import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SolicitudesDashboardComponent } from './pages/dashboard/pages/solicitudes/solicitudes-dashboard/solicitudes-dashboard.component';


@NgModule({
  declarations: [SolicitudesDashboardComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ]
})
export class MainModule { }
