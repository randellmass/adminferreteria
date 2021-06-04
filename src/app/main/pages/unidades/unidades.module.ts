import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { ListadoUnidadesComponent } from './pages/listado-unidades/listado-unidades.component';


@NgModule({
  declarations: [ListadoUnidadesComponent],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    ReactiveFormsModule
  ]
})
export class UnidadesModule { }
