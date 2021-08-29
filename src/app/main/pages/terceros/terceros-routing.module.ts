import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoTercerosComponent } from './pages/listado-terceros/listado-terceros.component';

const routes: Routes = [
  {
     path:'',
     children: [
       {
          path:'listado', component:ListadoTercerosComponent
       },
       {
          path:'**', redirectTo:'listado'
       }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TercerosRoutingModule { }
