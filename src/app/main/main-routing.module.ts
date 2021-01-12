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
          path:'', redirectTo:'dashboard'
        }
      ]
      
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
