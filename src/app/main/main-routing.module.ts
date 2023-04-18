import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

import { AdminGuard } from '../guards/admin.guard';
import { UsuariosGuard } from '../guards/usuarios.guard';

const routes: Routes = [
    {
      path:'', component:MainComponent,
      children:[
        {
           path:'dashboard',
           loadChildren:() => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
        },
        { 
          path: 'tercero',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/terceros/terceros.module').then(m =>m.TercerosModule)
        },
        { 
          path: 'pedidos',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/pedidos/pedidos.module').then(m =>m.PedidosModule)
        },
        { 
          path: 'usuarios',
          canLoad: [AdminGuard],
          loadChildren: () => import('./pages/usuarios/usuarios.module').then(m =>m.UsuariosModule)
        },
        { 
          path: 'bodegas',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/almacen/almacen.module').then(m =>m.AlmacenModule)
        },
        {
          path:'**',  redirectTo:'dashboard'
        }
      ]
      
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
