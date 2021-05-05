import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { SubirArchivoComponent } from './subir-archivo/subir-archivo.component';
import { EditarArchivoComponent } from './editar-archivo/editar-archivo.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    SidebarComponent, 
    ImagenPipe, 
    SubirArchivoComponent,
    EditarArchivoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    ImagenPipe,
    SubirArchivoComponent,
    EditarArchivoComponent,
  ]
})
export class SharedModule { }
