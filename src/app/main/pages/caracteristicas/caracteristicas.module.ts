import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CaracteristicasRoutingModule } from './caracteristicas-routing.module';
import { ListadoCaracteristicasComponent } from './pages/listado-caracteristicas/listado-caracteristicas.component';


@NgModule({
  declarations: [ListadoCaracteristicasComponent],
  imports: [
    CommonModule,
    CaracteristicasRoutingModule,
    ReactiveFormsModule
  ]
})
export class CaracteristicasModule { }
