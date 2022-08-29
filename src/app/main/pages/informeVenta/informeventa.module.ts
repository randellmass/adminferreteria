import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InformeventaRoutingModule } from './informeventa-routing.module';
import { SemanaIndexComponent } from './pages/semana-index/semana-index.component';
import { PresupuestoAdminIndexComponent } from './pages/presupuesto-admin-index/presupuesto-admin-index.component';
import { PresupuestoAdminReporteIndexComponent } from './pages/presupuesto-admin-reporte-index/presupuesto-admin-reporte-index.component';
import { PresupuestoAdminDetalleIndexComponent } from './pages/presupuesto-admin-detalle-index/presupuesto-admin-detalle-index.component';
import { PresupuestoAdminUpdateComponent } from './pages/presupuesto-admin-update/presupuesto-admin-update.component';
import { PresupuestoAdminResumenIndexComponent } from './pages/presupuesto-admin-resumen-index/presupuesto-admin-resumen-index.component';
import { PresupuestoAdminConfigComponent } from './pages/presupuesto-admin-config/presupuesto-admin-config.component';


@NgModule({
  declarations: [PresupuestoAdminIndexComponent, PresupuestoAdminReporteIndexComponent, PresupuestoAdminDetalleIndexComponent, SemanaIndexComponent, PresupuestoAdminUpdateComponent, PresupuestoAdminResumenIndexComponent, PresupuestoAdminConfigComponent],
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
