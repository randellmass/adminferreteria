import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { SolicitudesDashboardComponent } from './pages/dashboard/pages/solicitudes/solicitudes-dashboard/solicitudes-dashboard.component';

const routes: Routes = [
    {
      path:'', component:MainComponent,
      children:[
        {
           path:'dashboard', component:SolicitudesDashboardComponent
        },
        { 
          path: 'fabricantes',
          loadChildren: () => import('./pages/fabricantes/fabricantes.module').then(m =>m.FabricantesModule)
        },
        { 
          path: 'equipos',
          loadChildren: () => import('./pages/equipos/equipos.module').then(m =>m.EquiposModule)
        },
        { 
          path: 'usuarios',
          loadChildren: () => import('./pages/usuarios/usuarios.module').then(m =>m.UsuariosModule)
        },
        { 
          path: 'grupos',
          loadChildren: () => import('./pages/grupos/grupos.module').then(m =>m.GruposModule)
        },
        { 
          path: 'categorias',
          loadChildren: () => import('./pages/categorias/categorias.module').then(m =>m.CategoriasModule)
        },
        { 
          path: 'familias',
          loadChildren: () => import('./pages/familias/familias.module').then(m =>m.FamiliasModule)
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
