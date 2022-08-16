import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeventaRoutingModule } from './informeventa-routing.module';
import { PresupuestoAdminIndexComponent } from './pages/presupuesto-admin-index/presupuesto-admin-index.component';
import { PresupuestoAdminReporteIndexComponent } from './pages/presupuesto-admin-reporte-index/presupuesto-admin-reporte-index.component';
import { PresupuestoAdminDetalleIndexComponent } from './pages/presupuesto-admin-detalle-index/presupuesto-admin-detalle-index.component';
import { SemanaIndexComponent } from './pages/semana-index/semana-index.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PresupuestoAdminUpdateComponent } from './pages/presupuesto-admin-update/presupuesto-admin-update.component';
import { PresupuestoAdminResumenIndexComponent } from './pages/presupuesto-admin-resumen-index/presupuesto-admin-resumen-index.component';


@NgModule({
  declarations: [PresupuestoAdminIndexComponent, PresupuestoAdminReporteIndexComponent, PresupuestoAdminDetalleIndexComponent, SemanaIndexComponent, PresupuestoAdminUpdateComponent, PresupuestoAdminResumenIndexComponent],
  imports: [
    CommonModule,
    InformeventaRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    PresupuestoAdminReporteIndexComponent
  ]
})
export class InformeventaModule { }
