import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FamiliasService } from '../../services/familias.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';

@Component({
  selector: 'app-registro-familias',
  templateUrl: './registro-familias.component.html',
  styleUrls: ['./registro-familias.component.css']
})
export class RegistroFamiliasComponent implements OnInit {

  form_familia:FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(3)]],
    descripcion1 : ['',[]],
    categorias : ['',[Validators.required]]
  });

    errors:any =[];
    categorias_select:any =[];

    constructor(private fb:FormBuilder,
                private router:Router,
                private familiaService:FamiliasService,
                private categoriasService:CategoriasService) { }

    ngOnInit(): void {
        this.cargar_select_form();
    }

    
    campoNoValido(campo:string){
      return this.form_familia.controls[campo].touched && this.form_familia.controls[campo].errors;
    }

    async cargar_select_form(){
        const result_categorias = await this.categoriasService.listado_categorias();
        this.categorias_select = result_categorias['data'];
    }

    async guardar(){
      
       
        if(this.form_familia.invalid){
          this.form_familia.markAllAsTouched();
          return;
        }

        const registro = await this.familiaService.registra_familia(this.form_familia.value);

        if(!registro['res']){
          //console.log(registro['mensaje'])
          this.errors = registro['mensaje'];
          return;
        }
        
        if(registro['res']){
          this.form_familia.reset();
          this.router.navigateByUrl('main/familias');
        }
    }

}
