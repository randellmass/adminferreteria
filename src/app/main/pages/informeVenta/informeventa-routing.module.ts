import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresupuestoAdminDetalleIndexComponent } from './pages/presupuesto-admin-detalle-index/presupuesto-admin-detalle-index.component';

import { PresupuestoAdminIndexComponent } from './pages/presupuesto-admin-index/presupuesto-admin-index.component';
import { SemanaIndexComponent } from './pages/semana-index/semana-index.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado', component:PresupuestoAdminIndexComponent
      },
      {
        path:'detalle/:id', component:PresupuestoAdminDetalleIndexComponent
      },
      {
        path:'semana/listado', component:SemanaIndexComponent
      },
      {
        path:'', redirectTo:'listado', pathMatch:'full'
      },
      {
        path:'**', redirectTo:'listado', pathMatch:'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformeventaRoutingModule { }
