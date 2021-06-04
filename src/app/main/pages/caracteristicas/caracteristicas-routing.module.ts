import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoCaracteristicasComponent } from './pages/listado-caracteristicas/listado-caracteristicas.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado',component:ListadoCaracteristicasComponent
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
export class CaracteristicasRoutingModule { }
