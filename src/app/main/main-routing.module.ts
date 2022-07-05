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
          path: 'fabricantes',
          canLoad: [UsuariosGuard],
          loadChildren: () => import('./pages/fabricantes/fabricantes.module').then(m =>m.FabricantesModule)
        },
        { 
          path: 'equipos',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/equipos/equipos.module').then(m =>m.EquiposModule)
        },
        { 
          path: 'cotchiller',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/cotchiller/cotchiller.module').then(m =>m.CotchillerModule)
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
          path: 'grupos',
          canLoad: [UsuariosGuard],
          loadChildren: () => import('./pages/grupos/grupos.module').then(m =>m.GruposModule)
        },
        { 
          path: 'familias',
          canLoad: [UsuariosGuard],
          loadChildren: () => import('./pages/categorias/categorias.module').then(m =>m.CategoriasModule)
        },
        { 
          path: 'caracteristicas',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/caracteristicas/caracteristicas.module').then(m =>m.CaracteristicasModule)
        },
        { 
          path: 'unidades',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/unidades/unidades.module').then(m =>m.UnidadesModule)
        },
        { 
          path: 'categorias',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/familias/familias.module').then(m =>m.FamiliasModule)
        },
        { 
          path: 'evento',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/fiesta/fiesta.module').then(m =>m.FiestaModule)
        },
        { 
          path: 'informeventas',
          canLoad: [UsuariosGuard], 
          loadChildren: () => import('./pages/informeVenta/informeventa.module').then(m =>m.InformeventaModule)
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
