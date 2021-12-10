import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiestaEditarComponent } from './pages/fiesta-editar/fiesta-editar.component';

import { FiestaListadoComponent } from './pages/fiesta-listado/fiesta-listado.component';
import { FiestaQrComponent } from './pages/fiesta-qr/fiesta-qr.component';
import { FiestaRegistroComponent } from './pages/fiesta-registro/fiesta-registro.component';
import { FiestaVerComponent } from './pages/fiesta-ver/fiesta-ver.component';

const routes: Routes = [
  {
     path: '',
     children: [
        {
           path:'listado', component: FiestaListadoComponent
        },
        {
           path:'ver/:id', component: FiestaVerComponent
        },
        {
           path:'crear', component: FiestaRegistroComponent
        },
        {
            path:'editar/:id', component: FiestaEditarComponent
        },
        {
           path:'qr/:id', component: FiestaQrComponent
        },
        {
          path:'**', redirectTo:'listado'
        }
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiestaRoutingModule { }
