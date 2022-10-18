import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { DespachosRoutingModule } from './despachos-routing.module';
import { DespachoAdminIndexComponent } from './pages/despacho-admin-index/despacho-admin-index.component';
import { DespachoAdminPedidoIndexComponent } from './pages/despacho-admin-pedido-index/despacho-admin-pedido-index.component';
import { SharedModule } from '../../shared/shared.module';
import { DespachoAdminDetalleIndexComponent } from './pages/despacho-admin-detalle-index/despacho-admin-detalle-index.component';
import { DespachoAdminPedidoUpdateComponent } from './pages/despacho-admin-pedido-update/despacho-admin-pedido-update.component';
import { DespachoAdminDetalleUpdateComponent } from './pages/despacho-admin-detalle-update/despacho-admin-detalle-update.component';


@NgModule({
  declarations: [DespachoAdminIndexComponent, DespachoAdminPedidoIndexComponent, DespachoAdminDetalleIndexComponent, DespachoAdminPedidoUpdateComponent, DespachoAdminDetalleUpdateComponent],
  imports: [
    CommonModule,
    DespachosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule,
  ]
})
export class DespachosModule { }
