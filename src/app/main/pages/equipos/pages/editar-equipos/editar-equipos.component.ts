import { Component, OnInit,NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EquiposService } from '../../services/equipos.service';
import { FabricantesService } from '../../../fabricantes/services/fabricantes.service';
import { ImagesSubirService } from '../../../../shared/service/images-subir.service';

@Component({
  selector: 'app-editar-equipos',
  templateUrl: './editar-equipos.component.html',
  styleUrls: ['./editar-equipos.component.css']
})
export class EditarEquiposComponent implements OnInit {

  form_equipos:FormGroup= this.fb.group({
      codificacion:['',[Validators.required,Validators.minLength(3)]],
      modelo:['',[Validators.required,Validators.minLength(3)]],
      nombre:['',[Validators.required,Validators.minLength(3)]],
      serie:['',[Validators.required,Validators.minLength(3)]],
      equipo_fabricante_id:['',[Validators.required]],
      marca_comercial_id:['',[Validators.required]],
      equipo_tipo_id:['',[Validators.required]],
      nombre2:['',[Validators.required,Validators.minLength(3)]],
      equipo_estado_id:['',[Validators.required]]
  });

  fabricantes:any=[];
  equipos_tipos:any=[];
  equipos_estados:any=[];
  errors:any=[];
  equipo:any;

  imgTemp:any= "";
  imagen_servidor:any = null;
  imagenCargar:File = null;

  loading:boolean = false;

  constructor(private fb:FormBuilder,
              private equiposService:EquiposService,
              private router:Router,
              private fabricantesService:FabricantesService,
              private activatedRoute:ActivatedRoute,
              public imagesSubirService:ImagesSubirService) { }

  ngOnInit(): void {

 

    this.activatedRoute.params.subscribe( params =>{
        this.buscar_individual_equipo( params['id']);
      
    })

    
  }
  campoNoValido(campo:string){
    return this.form_equipos.controls[campo].touched && this.form_equipos.controls[campo].errors;
  }
  
  async cargar_select_form(){

    this.fabricantes = await this.fabricantesService.listado_fabricantes();
    this.equipos_tipos = await this.equiposService.listado_equipos_tipos();
    this.equipos_estados = await this.equiposService.listado_equipos_estados();
  }

  async buscar_individual_equipo(equipo_id:number){

      this.loading = true;
      this.cargar_select_form();

      const data = await this.equiposService.individual_equipos(equipo_id);
      this.equipo = data['data'];

      //console.log(this.equipo);

      if(this.equipo['imagen']){
        this.imagen_servidor = this.equipo['imagen'];
      }

      this.valores_formulario();

      this.loading = false;

  }

  valores_formulario(){
    this.form_equipos.reset({
      ...this.equipo
    });

    //this.form_equipos.get('codificacion').disable();
  }


  async editar(){
    
      if(this.form_equipos.invalid)
      {
        this.form_equipos.markAllAsTouched();
        return;
      }
      
      const editar = await this.equiposService.editar_equipos(this.form_equipos.value,this.equipo.id);
      
      if(!editar['res'])
      {
        this.errors = editar['mensaje'];
        return;
      }
      
      if(editar['res'])
      {

        if(this.imagenCargar){
          await this.imagesSubirService.subir_imagen(this.imagenCargar,'equipo',this.equipo.id);
          this.imagenCargar=null;
          this.imagesSubirService.imgTemp ="";
          this.imagen_servidor =null;
      }

        this.form_equipos.reset();
        this.router.navigateByUrl('main/equipos');
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
