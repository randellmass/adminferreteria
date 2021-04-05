import { Component, OnInit,NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EquiposService } from '../../services/equipos.service';
import { FabricantesService } from '../../../fabricantes/services/fabricantes.service';

@Component({
  selector: 'app-editar-equipos',
  templateUrl: './editar-equipos.component.html',
  styleUrls: ['./editar-equipos.component.css']
})
export class EditarEquiposComponent implements OnInit {

  form_equipos:FormGroup;
  fabricantes:any=[];
  equipos_tipos:any=[];
  errors:any=[];
  equipo:any;

  constructor(private fb:FormBuilder,
              private equiposService:EquiposService,
              private router:Router,
              private fabricantesService:FabricantesService,
              private activatedRoute:ActivatedRoute) { }

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

    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_equipo( params['id']);
      
    })

    this.cargar_select_form();
  }
  
  async cargar_select_form(){

    this.fabricantes = await this.fabricantesService.listado_fabricantes();
    this.equipos_tipos = await this.equiposService.listado_equipos_tipos();
  }

  async buscar_individual_equipo(equipo_id:number){

    this.equipo = await this.equiposService.individual_equipos(equipo_id);
    this.valores_formulario();
  }

  valores_formulario(){
    this.form_equipos.reset({
      ...this.equipo
    });

    this.form_equipos.get('codificacion').disable();
  }


  async editar(){
    
    if(this.form_equipos.invalid)
    {
      this.form_equipos.markAllAsTouched();
      return;
    }
    
    const editar = await this.equiposService.editar_equipos(this.form_equipos.value,this.equipo.id);
    
    if(!editar['res']){
      console.log(editar['mensaje'])
      this.errors = editar['mensaje'];
      return;
    }
    
    if(editar['res']){
      this.form_equipos.reset();
      this.router.navigateByUrl('main/equipos');
    }
    
  }

}
