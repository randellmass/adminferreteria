import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EquiposRoutingModule } from './equipos-routing.module';
import { ListadoEquiposComponent } from './pages/listado-equipos/listado-equipos.component';
import { RegistroEquiposComponent } from './pages/registro-equipos/registro-equipos.component';
import { EditarEquiposComponent } from './pages/editar-equipos/editar-equipos.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ListadoEquiposComponent, 
    RegistroEquiposComponent, 
    EditarEquiposComponent],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    ReactiveFormsModule
  ]
})
export class EquiposModule { }
