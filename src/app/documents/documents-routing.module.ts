import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindocumentsComponent } from './maindocuments.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  {
    path:'', component:MaindocumentsComponent,
    children:[
      {
         path:'home', component:HomeComponent
      },
      {
        path:'**', redirectTo:'home', pathMatch:'full'
      }
    ]
  },
  {
    path:'**', redirectTo:'', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
