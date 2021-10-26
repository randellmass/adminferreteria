import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoCotizacionDetalleComponent } from './pages/listado-cotizacion-detalle/listado-cotizacion-detalle.component';
import { ListadoCotizacionOrdenComponent } from './pages/listado-cotizacion-orden/listado-cotizacion-orden.component';
import { ListadoCotizacionComponent } from './pages/listado-cotizacion/listado-cotizacion.component';
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
            path:'detalle/:cot_id/:orden_id', component:ListadoCotizacionDetalleComponent
         },
         {
            path:'orden/:id', component:ListadoCotizacionOrdenComponent
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
