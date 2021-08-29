import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoOrdenComponent } from './pages/listado-orden/listado-orden.component';
import { ListadoPedidosComponent } from './pages/listado-pedidos/listado-pedidos.component';
import { VerPedidosComponent } from './pages/ver-pedidos/ver-pedidos.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
         path:'listado', component:ListadoPedidosComponent
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
