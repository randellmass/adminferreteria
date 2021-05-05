import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';
import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    EquiposListadoComponent, 
    EquiposDetallesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
