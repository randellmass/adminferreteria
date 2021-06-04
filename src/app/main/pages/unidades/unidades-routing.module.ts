import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoUnidadesComponent } from './pages/listado-unidades/listado-unidades.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado', component:ListadoUnidadesComponent
      },
      {
        path:'**', pathMatch:'full', redirectTo:'listado'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule { }
