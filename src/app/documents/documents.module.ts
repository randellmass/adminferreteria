import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../main/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaindocumentsComponent } from './maindocuments.component';

@NgModule({
  declarations: [ProductsComponent, HomeComponent, MaindocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class DocumentsModule { }
