import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquiposDetallesComponent } from './pages/equipos-detalles/equipos-detalles.component';
import { EquiposListadoComponent } from './pages/equipos-listado/equipos-listado.component';
import { InformeventaUsuarioDetalleIndexComponent } from './pages/informeventa-usuario-detalle-index/informeventa-usuario-detalle-index.component';
import { InformeventaUsuarioIndexComponent } from './pages/informeventa-usuario-index/informeventa-usuario-index.component';
import { InformeventaUsuarioStoreComponent } from './pages/informeventa-usuario-store/informeventa-usuario-store.component';
import { InformeventaUsuarioUpdateComponent } from './pages/informeventa-usuario-update/informeventa-usuario-update.component';
import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'listado', component:EquiposListadoComponent
      },
      {
        path:'detalle/:id', component:EquiposDetallesComponent
      },
      {
        path:'pedido', component:VercomercialPedidoComponent
      },
      {
        path:'informe', component:InformeventaUsuarioIndexComponent
      },
      {
        path:'informe/detalle/:id', component:InformeventaUsuarioDetalleIndexComponent
      },
      {
        path:'informe/store', component:InformeventaUsuarioStoreComponent
      },
      {
        path:'informe/update/:id', component:InformeventaUsuarioUpdateComponent
      },
      {
        path:'', redirectTo:'listado', pathMatch:'full'
      },
      {
        path:'**', redirectTo:'listado', pathMatch:'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
