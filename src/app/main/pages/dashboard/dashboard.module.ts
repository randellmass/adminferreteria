import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';

import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';
import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { InformeventaUsuarioIndexComponent } from './pages/informeventa-usuario-index/informeventa-usuario-index.component';
import { InformeventaUsuarioStoreComponent } from './pages/informeventa-usuario-store/informeventa-usuario-store.component';
import { InformeventaUsuarioUpdateComponent } from './pages/informeventa-usuario-update/informeventa-usuario-update.component';
import { InformeventaUsuarioDetalleIndexComponent } from './pages/informeventa-usuario-detalle-index/informeventa-usuario-detalle-index.component';
import { InformeventaUsuarioCotIndexComponent } from './pages/informeventa-usuario-cot-index/informeventa-usuario-cot-index.component';
import { InformeventaUsuarioRedeotroIndexComponent } from './pages/informeventa-usuario-redeotro-index/informeventa-usuario-redeotro-index.component';
import { InformeventaUsuarioAnalisisIndexComponent } from './pages/informeventa-usuario-analisis-index/informeventa-usuario-analisis-index.component';
import { InformeventaUsuarioPostventaIndexComponent } from './pages/informeventa-usuario-postventa-index/informeventa-usuario-postventa-index.component';
import { InformeventaUsuarioBackorderIndexComponent } from './pages/informeventa-usuario-backorder-index/informeventa-usuario-backorder-index.component';
import { InformeventaUsuarioToneladaIndexComponent } from './pages/informeventa-usuario-tonelada-index/informeventa-usuario-tonelada-index.component';
import { InformeventaModule } from '../informeVenta/informeventa.module';
import { InformeventaUsuarioCotdirIndexComponent } from './pages/informeventa-usuario-cotdir-index/informeventa-usuario-cotdir-index.component';
import { InformeventaUsuarioPostvdirIndexComponent } from './pages/informeventa-usuario-postvdir-index/informeventa-usuario-postvdir-index.component';
import { InformeventaUsuarioActividaddirIndexComponent } from './pages/informeventa-usuario-actividaddir-index/informeventa-usuario-actividaddir-index.component';


@NgModule({
  declarations: [
    EquiposListadoComponent, 
    EquiposDetallesComponent, VercomercialPedidoComponent, InformeventaUsuarioIndexComponent, InformeventaUsuarioStoreComponent, InformeventaUsuarioUpdateComponent, InformeventaUsuarioDetalleIndexComponent, InformeventaUsuarioCotIndexComponent, InformeventaUsuarioRedeotroIndexComponent, InformeventaUsuarioAnalisisIndexComponent, InformeventaUsuarioPostventaIndexComponent, InformeventaUsuarioBackorderIndexComponent, InformeventaUsuarioToneladaIndexComponent, InformeventaUsuarioCotdirIndexComponent, InformeventaUsuarioPostvdirIndexComponent, InformeventaUsuarioActividaddirIndexComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    QRCodeModule,
    InformeventaModule,
  ]
})
export class DashboardModule { }
