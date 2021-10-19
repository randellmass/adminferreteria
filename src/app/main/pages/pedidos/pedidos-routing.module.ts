import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPedidosComponent } from './pages/editar-pedidos/editar-pedidos.component';
import { ListadoOrdenComponent } from './pages/listado-orden/listado-orden.component';
import { ListadoPedidosComponent } from './pages/listado-pedidos/listado-pedidos.component';
import { RegistroPedidosComponent } from './pages/registro-pedidos/registro-pedidos.component';
import { VerPedidosComponent } from './pages/ver-pedidos/ver-pedidos.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
         path:'listado', component:ListadoPedidosComponent
      },
      {
         path:'registro', component:RegistroPedidosComponent
      },
      {
         path:'editar/:id', component:EditarPedidosComponent
      },
      {
        path:'ordenes/:id', component:ListadoOrdenComponent
      },
      {
        path:'ver/:id', component:VerPedidosComponent
      },
      {
         path:'**', redirectTo:'listado'
      }
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
