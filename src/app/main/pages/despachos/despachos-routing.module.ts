import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespachoAdminDetalleIndexComponent } from './pages/despacho-admin-detalle-index/despacho-admin-detalle-index.component';
import { DespachoAdminIndexComponent } from './pages/despacho-admin-index/despacho-admin-index.component';
import { DespachoAdminPedidoIndexComponent } from './pages/despacho-admin-pedido-index/despacho-admin-pedido-index.component';

const routes: Routes = [
  {
    path:'',
    children:
    [
      {
         path:'pedidos', component: DespachoAdminPedidoIndexComponent
      },
      {
        path:'listado', component: DespachoAdminIndexComponent
      },
      {
        path:'detalle/:id', component: DespachoAdminDetalleIndexComponent
      },
      {
        path:'**', redirectTo:'listado', pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespachosRoutingModule { }
