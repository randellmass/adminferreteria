import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { RegistroCategoriasComponent } from './pages/registro-categorias/registro-categorias.component';
import { ListadoCategoriasComponent } from './pages/listado-categorias/listado-categorias.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';


@NgModule({
  declarations: [
      RegistroCategoriasComponent, 
      ListadoCategoriasComponent, 
      EditarCategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoriasModule { }
