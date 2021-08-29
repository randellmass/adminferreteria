import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';
import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado', component:EquiposListadoComponent
      },
      {
        path:'detalle/:id', component:EquiposDetallesComponent
      },
      {
        path:'pedido', component:VercomercialPedidoComponent
      },
      {
        path:'', redirectTo:'listado'
      },
      {
        path:'**', redirectTo:'listado'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
