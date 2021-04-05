import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoFabricantesComponent } from './pages/listado-fabricantes/listado-fabricantes.component';
import { RegistroFabricantesComponent } from './pages/registro-fabricantes/registro-fabricantes.component';
import { EditarFabricantesComponent } from './pages/editar-fabricantes/editar-fabricantes.component';

const routes: Routes = [
  {
    path:'listado', component:ListadoFabricantesComponent
  },
  {
    path:'registrar', component:RegistroFabricantesComponent
  },
  {
    path:'editar/:id', component:EditarFabricantesComponent
  },
  {
    path:'', redirectTo:'listado', pathMatch:'full'
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricantesRoutingModule { }
