import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';
import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';
import { SharedModule } from '../../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    EquiposListadoComponent, 
    EquiposDetallesComponent, VercomercialPedidoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule,
  ]
})
export class DashboardModule { }
