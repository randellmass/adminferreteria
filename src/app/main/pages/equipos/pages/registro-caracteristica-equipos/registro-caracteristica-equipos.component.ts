import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CaracteristicasService } from '../../../caracteristicas/service/caracteristicas.service';
import { UnidadesService } from '../../../unidades/service/unidades.service';
import { EquiposCaracteristicasService } from '../../services/equipos-caracteristicas.service';

@Component({
  selector: 'app-registro-caracteristica-equipos',
  templateUrl: './registro-caracteristica-equipos.component.html',
  styleUrls: ['./registro-caracteristica-equipos.component.css']
})
export class RegistroCaracteristicaEquiposComponent implements OnInit {

    @Input() equipo_id:string;
    @Output() caracteristicas_form = new EventEmitter<[]>();

 
    form_caracteristica:FormGroup = this.fb.group({
      caracteristica_id: ['',Validators.required],
      unidad_id: ['',[Validators.required]],
      valor: ['',[Validators.required,Validators.minLength(1)]]
    });

    roles:any =[];
    loading:boolean = true;
    errors:any = []; 
    caracteristicas:any=[];
    unidades:any=[];
    equipo_caractisticas:any=[];

    constructor(private fb:FormBuilder,
                private caracteristicasService:CaracteristicasService,
                private equipoCaracteristicasService:EquiposCaracteristicasService,
                private unidadesService:UnidadesService) { }

    ngOnInit(): void {
        this.cargar_select_form();
    }

    campoNoValido(campo:string){
      return this.form_caracteristica.controls[campo].touched && this.form_caracteristica.controls[campo].errors;
    }

    async cargar_select_form(){
        this.loading = true;
        const datacaracteristicas = await this.caracteristicasService.listado_caracteristicas();
        this.caracteristicas = datacaracteristicas['data'];
        
        const unidades = await this.unidadesService.listado_unidades();
        this.unidades = unidades['data'];

        /* console.log(this.caracteristicas);
        console.log(this.unidades); */
        this.loading = false;
    }

    async agregar_caracteristica(){

      if(this.form_caracteristica.invalid){
        this.form_caracteristica.markAllAsTouched();
        return;
      }

      const registro = await this.equipoCaracteristicasService.subir_caracteristica(this.equipo_id,this.form_caracteristica.value);
      if(registro['res']){
        //console.log(registro['data']);
        this.equipo_caractisticas = registro['data'];
        this.caracteristicas_form.emit(this.equipo_caractisticas);
        this.errors = [];
        this.form_caracteristica.reset();
      }else{
        //console.log(registro['data']);
        this.errors = registro['data'];
      }

    }

}
