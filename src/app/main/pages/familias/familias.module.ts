import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FamiliasRoutingModule } from './familias-routing.module';
import { RegistroFamiliasComponent } from './pages/registro-familias/registro-familias.component';
import { ListadoFamiliasComponent } from './pages/listado-familias/listado-familias.component';
import { EditarFamiliasComponent } from './pages/editar-familias/editar-familias.component';
import { ItemFamiliasComponent } from './pages/item-familias/item-familias.component';
import { SharedModule } from '../../shared/shared.module';
import { ArchivoFamiliasComponent } from './pages/archivo-familias/archivo-familias.component';


@NgModule({
  declarations: [
      RegistroFamiliasComponent, 
      ListadoFamiliasComponent, 
      EditarFamiliasComponent, ItemFamiliasComponent, ArchivoFamiliasComponent],
  imports: [
    CommonModule,
    FamiliasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class FamiliasModule { }
