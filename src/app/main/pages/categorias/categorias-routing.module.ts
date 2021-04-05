import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';
import { ListadoCategoriasComponent } from './pages/listado-categorias/listado-categorias.component';
import { RegistroCategoriasComponent } from './pages/registro-categorias/registro-categorias.component';

const routes: Routes = [
  {
    path:'',
    children:[
        {
            path:'listado', component:ListadoCategoriasComponent
        },
        {
            path:'registrar', component:RegistroCategoriasComponent
        },
        {
            path:'editar/:id', component:EditarCategoriasComponent
        },
        {
            path:'**', pathMatch:"full", redirectTo:'listado'
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
