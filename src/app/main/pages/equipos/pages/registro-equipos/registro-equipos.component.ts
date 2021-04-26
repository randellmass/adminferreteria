import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EquiposService } from '../../services/equipos.service';
import { FabricantesService } from '../../../fabricantes/services/fabricantes.service';
import { ImagesSubirService } from '../../../../shared/service/images-subir.service';

@Component({
  selector: 'app-registro-equipos',
  templateUrl: './registro-equipos.component.html',
  styleUrls: ['./registro-equipos.component.css']
})
export class RegistroEquiposComponent implements OnInit {

    form_equipos:FormGroup;
    fabricantes:any=[];
    equipos_tipos:any=[];
    errors:any=[];

    imgTemp:any= "";
    imagen:File = null;
  
  constructor(private fb:FormBuilder,
              private equiposService:EquiposService,
              private router:Router,
              private fabricantesService:FabricantesService,
              public imagesSubirService:ImagesSubirService) { }

  ngOnInit(): void {

    this.form_equipos = this.fb.group({
        codificacion:['',[Validators.required,Validators.minLength(3)]],
        modelo:['',[Validators.required,Validators.minLength(3)]],
        nombre:['',[Validators.required,Validators.minLength(3)]],
        serie:['',[Validators.required,Validators.minLength(3)]],
        equipo_fabricante_id:['',[Validators.required]],
        marca_comercial_id:['',[Validators.required]],
        equipo_tipo_id:['',[Validators.required]],
        nombre2:['',[Validators.required,Validators.minLength(3)]]
    });

    this.cargar_select_form();

  }

  campoNoValido(campo:string){
    return this.form_equipos.controls[campo].touched && this.form_equipos.controls[campo].errors;
  }

  async cargar_select_form(){

    this.fabricantes = await this.fabricantesService.listado_fabricantes();
    this.equipos_tipos = await this.equiposService.listado_equipos_tipos();
  }

  async guardar(){
    
    if(this.form_equipos.invalid)
    {
      this.form_equipos.markAllAsTouched();
      return;
    }

    
    const registro = await this.equiposService.registra_equipo(this.form_equipos.value);
    
    if(!registro['res']){
      //console.log(registro['mensaje'])
      this.errors = registro['mensaje'];
      return;
    }
    
    if(registro['res']){

        //subimos la foto
        await this.imagesSubirService.subir_imagen(this.imagen,'equipo',registro['data']['id']);
        this.imagesSubirService.imgTemp ="";

      this.form_equipos.reset();
      this.router.navigateByUrl('main/equipos');
    }
    
  }

  file_imagen(file:File)
  {
   
    this.imagen = file;
   
    if(!file){
      return;
    }

    this.imagesSubirService.imagen64(file);

  }

}
