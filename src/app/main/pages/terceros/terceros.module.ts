import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TercerosRoutingModule } from './terceros-routing.module';
import { ListadoTercerosComponent } from './pages/listado-terceros/listado-terceros.component';
import { RegistroTercerosComponent } from './pages/registro-terceros/registro-terceros.component';
import { EditarTercerosComponent } from './pages/editar-terceros/editar-terceros.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ListadoTercerosComponent, 
    RegistroTercerosComponent, 
    EditarTercerosComponent],
  imports: [
    CommonModule,
    TercerosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class TercerosModule { }
