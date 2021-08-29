import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { ListadoPedidosComponent } from './pages/listado-pedidos/listado-pedidos.component';
import { RegistroPedidosComponent } from './pages/registro-pedidos/registro-pedidos.component';
import { EditarPedidosComponent } from './pages/editar-pedidos/editar-pedidos.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroOrdenComponent } from './pages/registro-orden/registro-orden.component';
import { ListadoOrdenComponent } from './pages/listado-orden/listado-orden.component';
import { VerPedidosComponent } from './pages/ver-pedidos/ver-pedidos.component';


@NgModule({
  declarations: [
      ListadoPedidosComponent, 
      RegistroPedidosComponent, 
      EditarPedidosComponent, 
      RegistroOrdenComponent, 
      ListadoOrdenComponent, VerPedidosComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class PedidosModule { }
