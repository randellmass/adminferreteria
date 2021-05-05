import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';


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
