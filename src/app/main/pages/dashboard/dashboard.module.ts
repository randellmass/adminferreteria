import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';

import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    VercomercialPedidoComponent, 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule,
  ]
})
export class DashboardModule { }
