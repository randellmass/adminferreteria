import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FamiliasRoutingModule } from './familias-routing.module';
import { RegistroFamiliasComponent } from './pages/registro-familias/registro-familias.component';
import { ListadoFamiliasComponent } from './pages/listado-familias/listado-familias.component';
import { EditarFamiliasComponent } from './pages/editar-familias/editar-familias.component';
import { ItemFamiliasComponent } from './pages/item-familias/item-familias.component';


@NgModule({
  declarations: [
      RegistroFamiliasComponent, 
      ListadoFamiliasComponent, 
      EditarFamiliasComponent, ItemFamiliasComponent],
  imports: [
    CommonModule,
    FamiliasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FamiliasModule { }
