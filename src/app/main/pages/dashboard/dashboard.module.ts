import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';
import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { SharedModule } from '../../shared/shared.module';
import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquiposListadoComponent, 
    EquiposDetallesComponent, VercomercialPedidoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
