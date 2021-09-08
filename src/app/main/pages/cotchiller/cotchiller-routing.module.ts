import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoEquiposComponent } from '../equipos/pages/listado-equipos/listado-equipos.component';
import { ListadoCotizacionComponent } from './pages/listado-cotizacion/listado-cotizacion.component';
import { ListadoLpmaterialDetalleComponent } from './pages/listado-lpmaterial-detalle/listado-lpmaterial-detalle.component';
import { ListadoLpmaterialComponent } from './pages/listado-lpmaterial/listado-lpmaterial.component';
import { ListadoProductoCompnteCotComponent } from './pages/listado-producto-compnte-cot/listado-producto-compnte-cot.component';
import { ListadoProductoCotComponent } from './pages/listado-producto-cot/listado-producto-cot.component';

const routes: Routes = [
    {
       path:'',
       children:[
         {  
            path:'listado', component:ListadoCotizacionComponent
         },
         {  
            path:'equipos', component:ListadoProductoCotComponent
         },
         {  
            path:'componente/:id', component:ListadoProductoCompnteCotComponent
         },
         {  
            path:'lpmateriales', component:ListadoLpmaterialComponent
         },
         {  
            path:'lpmaterial-detalle/:id', component:ListadoLpmaterialDetalleComponent
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
export class CotchillerRoutingModule { }
