import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlmacenIndexComponent } from './pages/almacen-index/almacen-index.component';
import { AlmacenUsuariosIndexComponent } from './pages/almacen-usuarios-index/almacen-usuarios-index.component';

const routes: Routes = [{
    path:'',
    children:[
      {
        path:'listado', component:AlmacenIndexComponent
      },
      {
        path:'usuarios/:id', component:AlmacenUsuariosIndexComponent
      },
 
      {
        path:'', redirectTo:'listado', pathMatch:'full'
      },
      {
        path:'**', redirectTo:'listado', pathMatch:'full'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
