import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposService } from '../../../grupos/services/grupos.service';

@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {

  form_categoria:FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(3)]],
    equipo_grupo_id : ['',[Validators.required]],
    estado_id : ['',[Validators.required]]
  });

  errors:any =[];
  grupos:any =[];
  categoria:any;
  
    constructor(private fb:FormBuilder,
                private categoriasService:CategoriasService,
                private router:Router,
                private gruposService:GruposService,
                private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {

      this.activatedRoute.params.subscribe( params =>{
        this.buscar_individual_categoria( params['id']);
        
      })

      this.cargar_select_form();
    }

    campoNoValido(campo:string){
      return this.form_categoria.controls[campo].touched && this.form_categoria.controls[campo].errors;
    }

    async buscar_individual_categoria(categoria_id:number){

      const categoria1 = await this.categoriasService.individual_categoria(categoria_id);
      this.categoria = categoria1['data'];
      
      this.valores_formulario();
    }
  
    valores_formulario(){
      this.form_categoria.reset({
        ...this.categoria
      });
    }

    async cargar_select_form(){
        this.grupos = await this.gruposService.listado_grupos();
    }

    async editar(){
        if(this.form_categoria.invalid){
          this.form_categoria.markAllAsTouched();
          return;
        }

        const registro = await this.categoriasService.editar_categoria(this.form_categoria.value,this.categoria.id);

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
