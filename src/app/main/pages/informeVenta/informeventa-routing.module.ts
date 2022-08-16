import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresupuestoAdminDetalleIndexComponent } from './pages/presupuesto-admin-detalle-index/presupuesto-admin-detalle-index.component';

import { PresupuestoAdminIndexComponent } from './pages/presupuesto-admin-index/presupuesto-admin-index.component';
import { PresupuestoAdminResumenIndexComponent } from './pages/presupuesto-admin-resumen-index/presupuesto-admin-resumen-index.component';
import { PresupuestoAdminUpdateComponent } from './pages/presupuesto-admin-update/presupuesto-admin-update.component';
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
        path:'update/:id', component:PresupuestoAdminUpdateComponent
      },
      {
        path:'semana/listado', component:SemanaIndexComponent
      },
      {
        path:'resumen', component:PresupuestoAdminResumenIndexComponent
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
