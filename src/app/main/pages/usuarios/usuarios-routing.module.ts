import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { EditarUsuariosComponent } from './pages/editar-usuarios/editar-usuarios.component';
import { PerfilUsuariosComponent } from './pages/perfil-usuarios/perfil-usuarios.component';

const routes: Routes = [
  {
     path:'',
     children:[
       {
          path:'listado', component:ListadoUsuariosComponent
       },
       {
          path:'registrar', component:RegistroUsuariosComponent
       },
       {
          path:'editar/:id', component:EditarUsuariosComponent
       },
       {
          path:'perfil', component:PerfilUsuariosComponent
       },
       {
        path:'**',pathMatch:"full" ,redirectTo:"listado"
       }
    ],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
