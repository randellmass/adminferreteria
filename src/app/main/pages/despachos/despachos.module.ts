import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespachosRoutingModule } from './despachos-routing.module';
import { DespachoAdminIndexComponent } from './pages/despacho-admin-index/despacho-admin-index.component';
import { DespachoAdminPedidoIndexComponent } from './pages/despacho-admin-pedido-index/despacho-admin-pedido-index.component';
import { SharedModule } from '../../shared/shared.module';
import { DespachoAdminDetalleIndexComponent } from './pages/despacho-admin-detalle-index/despacho-admin-detalle-index.component';


@NgModule({
  declarations: [DespachoAdminIndexComponent, DespachoAdminPedidoIndexComponent, DespachoAdminDetalleIndexComponent],
  imports: [
    CommonModule,
    DespachosRoutingModule,
    SharedModule
  ]
})
export class DespachosModule { }
