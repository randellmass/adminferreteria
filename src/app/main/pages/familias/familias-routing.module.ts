import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoFamiliasComponent } from './pages/listado-familias/listado-familias.component';
import { RegistroFamiliasComponent } from './pages/registro-familias/registro-familias.component';
import { EditarFamiliasComponent } from './pages/editar-familias/editar-familias.component';
import { ItemFamiliasComponent } from './pages/item-familias/item-familias.component';
import { ArchivoFamiliasComponent } from './pages/archivo-familias/archivo-familias.component';

const routes: Routes = [
  {
    path:'',
    children:[
        {
            path:'listado', component:ListadoFamiliasComponent
        },
        {
            path:'registrar', component:RegistroFamiliasComponent
        },
        {
            path:'editar/:id', component:EditarFamiliasComponent
        },
        {
            path:'items/:id', component:ItemFamiliasComponent
        },
        {
          path:'archivos/:id', component:ArchivoFamiliasComponent
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
export class FamiliasRoutingModule { }
