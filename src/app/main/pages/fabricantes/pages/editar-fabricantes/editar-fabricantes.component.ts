import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricantesService } from '../../services/fabricantes.service';
import { ImagesSubirService } from '../../../../shared/service/images-subir.service';

@Component({
  selector: 'app-editar-fabricantes',
  templateUrl: './editar-fabricantes.component.html',
  styleUrls: ['./editar-fabricantes.component.css']
})
export class EditarFabricantesComponent implements OnInit {

  fabricante:any = {}
  
  form_fabricante:FormGroup = this.fb.group({
        nombre : [,[Validators.required,Validators.minLength(3)]]
  });


  imgTemp:any= "";
  imagen_servidor:any = null;
  imagenCargar:File = null;

  loading:boolean = false;

  constructor(private fb:FormBuilder,
              private fabricantesService:FabricantesService,
              public imagesSubirService:ImagesSubirService,
              private router:Router,
              private activatedRoute:ActivatedRoute
            )
  { 

    
    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_fabricante( params['id']);
      
    })
    
   }

  campoNoValido(campo:string){
    return this.form_fabricante.controls[campo].touched && this.form_fabricante.controls[campo].errors;
  }

  ngOnInit(): void {

    
  }



  async buscar_individual_fabricante(fabricante_id:number){

    this.loading = true;
    this.fabricante = await this.fabricantesService.individual_fabricantes(fabricante_id);
    if(this.fabricante['imagen']){
      this.imagen_servidor = this.fabricante['imagen'];
    }

    this.valores_formulario();
    this.loading = false;
  }

  valores_formulario(){
    this.form_fabricante.reset({
      ...this.fabricante
    });
  }

  async editar(){
      if(this.form_fabricante.invalid){
        this.form_fabricante.markAllAsTouched();
        return;
    }

    const registro = await this.fabricantesService.editar_fabricantes(this.form_fabricante.value,this.fabricante.id);
    if(this.imagenCargar){
       await this.imagesSubirService.subir_imagen(this.imagenCargar,'fabricante',this.fabricante.id);
       this.imagenCargar=null;
       this.imagesSubirService.imgTemp ="";
       this.imagen_servidor =null;
    }

    if(registro){
        this.form_fabricante.reset();
        this.router.navigateByUrl('main/fabricantes');
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
