import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivoEquiposComponent } from './pages/archivo-equipos/archivo-equipos.component';
import { CaracteristicaEquiposComponent } from './pages/caracteristica-equipos/caracteristica-equipos.component';

import { EditarEquiposComponent } from './pages/editar-equipos/editar-equipos.component';
import { ListadoEquiposComponent } from './pages/listado-equipos/listado-equipos.component';
import { RegistroEquiposComponent } from './pages/registro-equipos/registro-equipos.component';

const routes: Routes = [
  {
    path:'',
    children: [
      {
        path:'listado', component:ListadoEquiposComponent
      },
      {
        path:'registrar', component:RegistroEquiposComponent
      },
      {
        path:'editar/:id', component:EditarEquiposComponent
      },
      {
        path:'archivos/:id', component:ArchivoEquiposComponent
      },
      {
        path:'caracteristica/:id', component:CaracteristicaEquiposComponent
      },
      {
        path:'**', pathMatch:'full', redirectTo:'listado'
      }
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
