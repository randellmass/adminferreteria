import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformeventaRoutingModule } from './informeventa-routing.module';
import { PresupuestoAdminIndexComponent } from './pages/presupuesto-admin-index/presupuesto-admin-index.component';


@NgModule({
  declarations: [PresupuestoAdminIndexComponent],
  imports: [
    CommonModule,
    InformeventaRoutingModule
  ]
})
export class InformeventaModule { }
