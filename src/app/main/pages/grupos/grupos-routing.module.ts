import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoGruposComponent } from './pages/listado-grupos/listado-grupos.component';
import { RegistroGruposComponent } from './pages/registro-grupos/registro-grupos.component';
import { EditarGruposComponent } from './pages/editar-grupos/editar-grupos.component';

const routes: Routes = [
  {
    path:'',
    children:[
        {
            path:'listado', component:ListadoGruposComponent
        },
        {
            path:'registrar', component:RegistroGruposComponent
        },
        {
            path:'editar/:id', component:EditarGruposComponent
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
export class GruposRoutingModule { }
