import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FamiliasService } from '../../services/familias.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { ImagesSubirService } from '../../../../shared/service/images-subir.service';

@Component({
  selector: 'app-editar-familias',
  templateUrl: './editar-familias.component.html',
  styleUrls: ['./editar-familias.component.css']
})
export class EditarFamiliasComponent implements OnInit {

    form_familia:FormGroup = this.fb.group({
      nombre : ['',[Validators.required,Validators.minLength(3)]],
      descripcion1 : ['',[]],
      categorias : ['',[Validators.required]],
      estado_id : ['',[Validators.required]]
    });

    errors:any =[];
    categorias_select:any =[];
    familia:any;

    imgTemp:any= "";
    imagen_servidor:any = null;
    imagenCargar:File = null;
  
    loading:boolean = false;

    constructor(private fb:FormBuilder,
                private router:Router,
                private familiaService:FamiliasService,
                private categoriasService:CategoriasService,
                private activatedRoute:ActivatedRoute,
                public imagesSubirService:ImagesSubirService) { }

    ngOnInit(): void {

      this.activatedRoute.params.subscribe( params =>{
        this.buscar_individual_familia( params['id']);
        
      })

      this.cargar_select_form();
    }

    campoNoValido(campo:string){
      return this.form_familia.controls[campo].touched && this.form_familia.controls[campo].errors;
    }

    async cargar_select_form(){
        const result_categorias = await this.categoriasService.listado_categorias();
        this.categorias_select = result_categorias['data'];
    }

    async buscar_individual_familia(familia_id:number){

      this.loading = true;
      const familia1 = await this.familiaService.individual_familia(familia_id);
      const categoria_familia1 = familia1['data']['categorias'].map( (cat_id:any) => cat_id.toString());
      
      this.familia = familia1['data'];

      if(this.familia['imagen']){
        this.imagen_servidor = this.familia['imagen'];
      }
  
      this.valores_formulario(categoria_familia1);
      this.loading = false;
    }

    valores_formulario(categorias:any){
      this.form_familia.reset({
        ...this.familia,
        categorias:categorias
      });
    }

    async editar(){
      
       
        if(this.form_familia.invalid){
          this.form_familia.markAllAsTouched();
          return;
        }

        const registro = await this.familiaService.editar_categoria(this.form_familia.value,this.familia.id);

        if(!registro['res']){
          //console.log(registro['mensaje'])
          this.errors = registro['mensaje'];
          return;
        }
        
        if(registro['res']){
          //console.log(registro['data']);

          if(this.imagenCargar){
             await this.imagesSubirService.subir_imagen(this.imagenCargar,'familia',this.familia.id);
             this.imagenCargar=null;
             this.imagesSubirService.imgTemp ="";
             this.imagen_servidor =null;
          }

          this.form_familia.reset();
          this.router.navigateByUrl('main/categorias');
        }
    }

    file_imagen(file:File){
   
      this.imagenCargar = file;
     
      if(!file){
        return;
      }
  
      this.imagesSubirService.imagen64(file);
  
    }

}
