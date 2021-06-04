import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CaracteristicasService } from '../../service/caracteristicas.service';

@Component({
  selector: 'app-listado-caracteristicas',
  templateUrl: './listado-caracteristicas.component.html',
  styleUrls: ['./listado-caracteristicas.component.css']
})
export class ListadoCaracteristicasComponent implements OnInit {
  
    caracteristicas:any[] = [];
    errors:any=[];
    loading:boolean = false;

    form_caracteristica:FormGroup = this.fb.group({
      nombre : ['',[Validators.required,Validators.minLength(3)]],
    });

    constructor(private fb:FormBuilder,
                private caracteristicasService:CaracteristicasService) { }

    ngOnInit(): void {
      this.listado_caracteristicas();
    }

    campoNoValido(campo:string){
      return this.form_caracteristica.controls[campo].touched && this.form_caracteristica.controls[campo].errors;
    }

    async listado_caracteristicas(){
      this.loading= true;

        const result_caract = await this.caracteristicasService.listado_caracteristicas();
        if (result_caract['res'])
        {
          this.errors="";  
          this.caracteristicas = result_caract['data'];  
        } else {
          this.errors = result_caract['data']; 
        }

        this.loading= false; 
    }

    async guardar(){
      if(this.form_caracteristica.invalid){
        this.form_caracteristica.markAllAsTouched();
        return;
      }

       const registrar = await this.caracteristicasService.registra_caracteristicas(this.form_caracteristica.value);

       if (registrar['res']) {
           this.caracteristicas.push(registrar['data']);
           this.form_caracteristica.reset();
       } else {
          this.errors= registrar['data'];
       }

    }

    async item_v(index,item:any,item_name:any,item_sele:any){
      
      const form_editar ={
         "nombre":item_name,
         "estado_id":item_sele,
      }

      const editar = await this.caracteristicasService.editar_caracteristica(form_editar,item['id']);

       if (editar['res']) {
          this.caracteristicas[index] = editar['data'];
       } else {
          this.errors= editar['data'];
       }

    }

}
