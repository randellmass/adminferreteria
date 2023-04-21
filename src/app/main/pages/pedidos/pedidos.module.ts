import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { ListadoPedidosComponent } from './pages/listado-pedidos/listado-pedidos.component';
import { RegistroPedidosComponent } from './pages/registro-pedidos/registro-pedidos.component';
import { EditarPedidosComponent } from './pages/editar-pedidos/editar-pedidos.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerPedidosComponent } from './pages/ver-pedidos/ver-pedidos.component';
import { InformePedidosComponent } from './pages/informe-pedidos/informe-pedidos.component';


@NgModule({
  declarations: [
      ListadoPedidosComponent, 
      RegistroPedidosComponent, 
      EditarPedidosComponent, 
      VerPedidosComponent, InformePedidosComponent,],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PedidosModule { }
