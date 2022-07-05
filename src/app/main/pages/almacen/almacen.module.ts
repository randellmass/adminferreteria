import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenUsuariosIndexComponent } from './pages/almacen-usuarios-index/almacen-usuarios-index.component';
import { AlmacenIndexComponent } from './pages/almacen-index/almacen-index.component';


@NgModule({
  declarations: [AlmacenUsuariosIndexComponent, AlmacenIndexComponent],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AlmacenModule { }
