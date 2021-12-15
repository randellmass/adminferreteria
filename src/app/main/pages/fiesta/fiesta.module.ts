import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiestaRoutingModule } from './fiesta-routing.module';
import { FiestaListadoComponent } from './pages/fiesta-listado/fiesta-listado.component';
import { FiestaRegistroComponent } from './pages/fiesta-registro/fiesta-registro.component';
import { FiestaEditarComponent } from './pages/fiesta-editar/fiesta-editar.component';
import { FiestaVerComponent } from './pages/fiesta-ver/fiesta-ver.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { FiestaQrComponent } from './pages/fiesta-qr/fiesta-qr.component';
import { FiestaIngresoComponent } from './pages/fiesta-ingreso/fiesta-ingreso.component';


@NgModule({
  declarations: [FiestaListadoComponent, FiestaRegistroComponent, FiestaEditarComponent, FiestaVerComponent, FiestaQrComponent, FiestaIngresoComponent],
  imports: [
    CommonModule,
    FiestaRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    QRCodeModule
  ]
})
export class FiestaModule { }
