import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes:Routes = [
    { 
      path: 'main',
    //  canActivate: [AuthGuard],
      canLoad:[ AuthGuard],
      loadChildren: () => import('../app/main/main.module').then(m =>m.MainModule)
    },
    { 
      path: 'auth',
      loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule)
    },
    { 
      path: 'pedidos',
      loadChildren: () => import('../app/documents/documents.module').then(m => m.DocumentsModule)
    },
    { 
      path: '**', pathMatch:'full', redirectTo:'main'
    }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { useHash:true})
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
