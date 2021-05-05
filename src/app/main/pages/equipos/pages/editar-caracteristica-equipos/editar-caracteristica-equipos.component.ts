import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CaracteristicasService } from '../../../caracteristicas/service/caracteristicas.service';
import { UnidadesService } from '../../../unidades/service/unidades.service';
import { EquiposCaracteristicasService } from '../../services/equipos-caracteristicas.service';

@Component({
  selector: 'app-editar-caracteristica-equipos',
  templateUrl: './editar-caracteristica-equipos.component.html',
  styleUrls: ['./editar-caracteristica-equipos.component.css']
})
export class EditarCaracteristicaEquiposComponent implements OnInit {
    
    @Input() equipo_id:string;
    @Input() caract_item:string;
    @Output() caracteristicas_form = new EventEmitter<[]>();
    @Output() operacion_form = new EventEmitter<string>();


    form_caracteristica:FormGroup= this.fb.group({
      caracteristica_id: ['',Validators.required],
      unidad_id: ['',[Validators.required]],
      valor: ['',[Validators.required,Validators.minLength(1)]]
    });

    roles:any =[];
    loading:boolean = true;
    errors:any =[];
    caracteristicas:any=[];
    unidades:any=[];
    equipo_caracteristicas:any=[];

    constructor(private fb:FormBuilder,
                private caracteristicasService:CaracteristicasService,
                private equipoCaracteristicasService:EquiposCaracteristicasService,
                private unidadesService:UnidadesService) { }

    ngOnInit(): void {
        this.cargar_select_form();
        //this.buscar_caracteristica_individual();
    }

    cargar_form(){
        this.form_caracteristica.reset({
          caracteristica_id:this.caract_item['caracteristica_id'],
          unidad_id:this.caract_item['unidad_id'],
          valor:this.caract_item['valor']
        });

        this.form_caracteristica.get('caracteristica_id').disable();
    }

    campoNoValido(campo:string){
      return this.form_caracteristica.controls[campo].touched && this.form_caracteristica.controls[campo].errors;
    }

    async buscar_caracteristica_individual(){
        const caract_individual = await this.equipoCaracteristicasService.caracteristica_individual(this.equipo_id,this.caract_item['id']);
        console.log(caract_individual['data']);
    }

    async cargar_select_form(){
        this.loading = true;
        const datacaracteristicas = await this.caracteristicasService.listado_caracteristicas();
        this.caracteristicas = datacaracteristicas['data'];
        
        const unidades = await this.unidadesService.listado_unidades();
        this.unidades = unidades['data'];
        this.cargar_form();

        /* console.log(this.caracteristicas);
        console.log(this.unidades); */
        this.loading = false;
    }

    async editar_caracteristica(){

      if(this.form_caracteristica.invalid){
        this.form_caracteristica.markAllAsTouched();
        return;
      }
      
      const registro = await this.equipoCaracteristicasService.update_caracteristica(this.equipo_id,this.form_caracteristica.value,this.caract_item['caracteristica_id']);
      if(registro['res']){
        //console.log(registro['data']);
        this.equipo_caracteristicas = registro['data'];
        this.caracteristicas_form.emit(this.equipo_caracteristicas);
        this.operacion_form.emit('guardar');
        this.form_caracteristica.reset();
      }

    }

    cancelar_editar(){
        this.operacion_form.emit('guardar');
    }

}
