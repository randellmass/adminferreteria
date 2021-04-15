import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ListadoFabricantesComponent } from './pages/listado-fabricantes/listado-fabricantes.component';
import { RegistroFabricantesComponent } from './pages/registro-fabricantes/registro-fabricantes.component';
import { FabricantesRoutingModule } from './fabricantes-routing.module';
import { EditarFabricantesComponent } from './pages/editar-fabricantes/editar-fabricantes.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ListadoFabricantesComponent, 
    RegistroFabricantesComponent, EditarFabricantesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FabricantesRoutingModule,
    SharedModule
  ]
})
export class FabricantesModule { }
