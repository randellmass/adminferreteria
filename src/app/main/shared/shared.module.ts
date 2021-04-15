import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ImagenPipe } from './pipes/imagen.pipe';


@NgModule({
  declarations: [
    HeaderComponent, 
    SidebarComponent, 
    ImagenPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    ImagenPipe
  ]
})
export class SharedModule { }
