import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotchillerRoutingModule } from './cotchiller-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoCotizacionComponent } from './pages/listado-cotizacion/listado-cotizacion.component';
import { RegistroCotizacionComponent } from './pages/registro-cotizacion/registro-cotizacion.component';
import { ListadoProductoCotComponent } from './pages/listado-producto-cot/listado-producto-cot.component';
import { RegistroProductoCotComponent } from './pages/registro-producto-cot/registro-producto-cot.component';
import { ListadoProductoCompnteCotComponent } from './pages/listado-producto-compnte-cot/listado-producto-compnte-cot.component';
import { RegistroProductoCompnteCotComponent } from './pages/registro-producto-compnte-cot/registro-producto-compnte-cot.component';
import { SharedModule } from '../../shared/shared.module';
import { EditarProductoCotComponent } from './pages/editar-producto-cot/editar-producto-cot.component';
import { ListadoLpmaterialComponent } from './pages/listado-lpmaterial/listado-lpmaterial.component';
import { RegistroLpmaterialComponent } from './pages/registro-lpmaterial/registro-lpmaterial.component';
import { RegistroLpmaterialDetalleComponent } from './pages/registro-lpmaterial-detalle/registro-lpmaterial-detalle.component';
import { ListadoLpmaterialDetalleComponent } from './pages/listado-lpmaterial-detalle/listado-lpmaterial-detalle.component';


@NgModule({
  declarations: [
        ListadoCotizacionComponent,
        RegistroCotizacionComponent, 
        ListadoProductoCotComponent, 
        RegistroProductoCotComponent, 
        ListadoProductoCompnteCotComponent, 
        RegistroProductoCompnteCotComponent, 
        EditarProductoCotComponent, 
        ListadoLpmaterialComponent, 
        RegistroLpmaterialComponent, 
        RegistroLpmaterialDetalleComponent, 
        ListadoLpmaterialDetalleComponent],
  imports: [
    CommonModule,
    CotchillerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class CotchillerModule { }
