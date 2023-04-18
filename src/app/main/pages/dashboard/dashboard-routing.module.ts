import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VercomercialPedidoComponent } from './pages/vercomercial-pedido/vercomercial-pedido.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'pedido', component:VercomercialPedidoComponent
      },
      {
        path:'', redirectTo:'pedido', pathMatch:'full'
      },
      {
        path:'**', redirectTo:'pedido', pathMatch:'full'
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
