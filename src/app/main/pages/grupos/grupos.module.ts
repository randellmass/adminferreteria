import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GruposRoutingModule } from './grupos-routing.module';
import { RegistroGruposComponent } from './pages/registro-grupos/registro-grupos.component';
import { ListadoGruposComponent } from './pages/listado-grupos/listado-grupos.component';
import { EditarGruposComponent } from './pages/editar-grupos/editar-grupos.component';


@NgModule({
  declarations: [
    RegistroGruposComponent, 
    ListadoGruposComponent, 
    EditarGruposComponent],
  imports: [
    CommonModule,
    GruposRoutingModule,
    ReactiveFormsModule
  ]
})
export class GruposModule { }
