import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EquiposRoutingModule } from './equipos-routing.module';
import { ListadoEquiposComponent } from './pages/listado-equipos/listado-equipos.component';
import { RegistroEquiposComponent } from './pages/registro-equipos/registro-equipos.component';
import { EditarEquiposComponent } from './pages/editar-equipos/editar-equipos.component';
import { SharedModule } from '../../shared/shared.module';
import { ArchivoEquiposComponent } from './pages/archivo-equipos/archivo-equipos.component';
import { CaracteristicaEquiposComponent } from './pages/caracteristica-equipos/caracteristica-equipos.component';
import { RegistroCaracteristicaEquiposComponent } from './pages/registro-caracteristica-equipos/registro-caracteristica-equipos.component';
import { EditarCaracteristicaEquiposComponent } from './pages/editar-caracteristica-equipos/editar-caracteristica-equipos.component';
import { ListadoPreciosEquiposComponent } from './pages/listado-precios-equipos/listado-precios-equipos.component';
import { RegistroPreciosEquiposComponent } from './pages/registro-precios-equipos/registro-precios-equipos.component';


@NgModule({
  declarations: [
    ListadoEquiposComponent, 
    RegistroEquiposComponent, 
    EditarEquiposComponent, 
    ArchivoEquiposComponent, 
    CaracteristicaEquiposComponent, 
    RegistroCaracteristicaEquiposComponent, 
    EditarCaracteristicaEquiposComponent, ListadoPreciosEquiposComponent, RegistroPreciosEquiposComponent],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class EquiposModule { }
