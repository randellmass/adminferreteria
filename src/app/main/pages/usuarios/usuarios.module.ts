import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { EditarUsuariosComponent } from './pages/editar-usuarios/editar-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilUsuariosComponent } from './pages/perfil-usuarios/perfil-usuarios.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
      ListadoUsuariosComponent, 
      RegistroUsuariosComponent, 
      EditarUsuariosComponent, 
      PerfilUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UsuariosModule { }
