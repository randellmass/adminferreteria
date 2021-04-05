import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { GruposService } from '../../services/grupos.service';

@Component({
  selector: 'app-registro-grupos',
  templateUrl: './registro-grupos.component.html',
  styleUrls: ['./registro-grupos.component.css']
})
export class RegistroGruposComponent implements OnInit {

  form_grupo:FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(3)]]
  });

  errors:any = [];

  constructor(private fb:FormBuilder,
              private gruposService:GruposService,
              private router:Router) { }

  ngOnInit(): void {
  }

  campoNoValido(campo:string){
    return this.form_grupo.controls[campo].touched && this.form_grupo.controls[campo].errors;
  }

  async guardar(){
      if(this.form_grupo.invalid){
        this.form_grupo.markAllAsTouched();
        return;
      }

      const registro = await this.gruposService.registra_grupo(this.form_grupo.value);

      if(!registro['res']){
        //console.log(registro['mensaje'])
        this.errors = registro['mensaje'];
        return;
      }
      
      if(registro['res']){
        this.form_grupo.reset();
        this.router.navigateByUrl('main/grupos');
      }
  }

}
