import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoriasService } from '../../services/categorias.service';
import { GruposService } from '../../../grupos/services/grupos.service';

@Component({
  selector: 'app-registro-categorias',
  templateUrl: './registro-categorias.component.html',
  styleUrls: ['./registro-categorias.component.css']
})
export class RegistroCategoriasComponent implements OnInit {

  form_categoria:FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(3)]],
    equipo_grupo_id : ['',[Validators.required]]
  });

  errors:any =[];
  grupos:any =[];

  constructor(private fb:FormBuilder,
              private categoriasService:CategoriasService,
              private router:Router,
              private gruposService:GruposService) { }

  ngOnInit(): void {
      this.cargar_select_form();
  }

  campoNoValido(campo:string){
    return this.form_categoria.controls[campo].touched && this.form_categoria.controls[campo].errors;
  }

  async cargar_select_form(){
      this.grupos = await this.gruposService.listado_grupos();
  }

  async guardar(){
      if(this.form_categoria.invalid){
        this.form_categoria.markAllAsTouched();
        return;
      }

      const registro = await this.categoriasService.registra_categoria(this.form_categoria.value);

      if(!registro['res']){
        //console.log(registro['mensaje'])
        this.errors = registro['mensaje'];
        return;
      }
      
      if(registro['res']){
        this.form_categoria.reset();
        this.router.navigateByUrl('main/categorias');
      }
  }

}
