import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GruposService } from '../../services/grupos.service';

@Component({
  selector: 'app-editar-grupos',
  templateUrl: './editar-grupos.component.html',
  styleUrls: ['./editar-grupos.component.css']
})
export class EditarGruposComponent implements OnInit {

  grupo:any;

  form_grupo:FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(3)]],
    estado_id : ['',[Validators.required,]]
  });

  errors:any = [];

  constructor(private fb:FormBuilder,
              private gruposService:GruposService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_grupo( params['id']);
      
    })
  }

  campoNoValido(campo:string){
    return this.form_grupo.controls[campo].touched && this.form_grupo.controls[campo].errors;
  }

  
  async buscar_individual_grupo(grupo_id:number){

    const grupo1 = await this.gruposService.individual_grupo(grupo_id);
    this.grupo = grupo1['data'];
    
    this.valores_formulario();
  }

  valores_formulario(){
    this.form_grupo.reset({
      ...this.grupo
    });
  }

  async editar(){
      if(this.form_grupo.invalid){
        this.form_grupo.markAllAsTouched();
        return;
      }

      const editar = await this.gruposService.editar_grupo(this.form_grupo.value,this.grupo.id);

      if(!editar['res']){
        //console.log(editar['mensaje'])
        this.errors = editar['mensaje'];
        return;
      }
      
      if(editar['res']){
        this.form_grupo.reset();
        this.router.navigateByUrl('main/grupos');
      }
  }

}
