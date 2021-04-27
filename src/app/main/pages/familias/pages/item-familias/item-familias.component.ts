import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FamiliasService } from '../../services/familias.service';
import { EquiposService } from '../../../equipos/services/equipos.service';

@Component({
  selector: 'app-item-familias',
  templateUrl: './item-familias.component.html',
  styleUrls: ['./item-familias.component.css']
})
export class ItemFamiliasComponent implements OnInit {

    form_buscar_equipo:FormGroup = this.fb.group({
        buscarEquipo : ['',[Validators.required]]
    });

    form_add_equipo:FormGroup;

      errors:any =[];
      categorias_select:any =[];
      familia:any;
      equipos:any=[];
      equipos_buscar:any=[];
      equipos_add:any=[];
      loading:boolean = true;

      constructor(private fb:FormBuilder,
                  private familiaService:FamiliasService,
                  private equiposService:EquiposService,
                  private activatedRoute:ActivatedRoute) { }

      ngOnInit(): void {
        this.activatedRoute.params.subscribe( params =>{
          
          this.buscar_individual_familia(params['id']);
          
        })
      }
      
      crear_form_add_equipo(){
        this.form_add_equipo = this.fb.group({
          items: ['',Validators.required]
        });
      }

      campoNoValido(campo:string){
        return this.form_add_equipo.controls[campo].touched && this.form_add_equipo.controls[campo].errors;
      }

      async buscar_individual_familia(familia_id:number){

        const familia1 = await this.familiaService.individual_familia(familia_id);
        
        this.familia = familia1['data'];
        this.equipos = familia1['data']['equipos'];
        //console.log(this.familia);
        //console.log(this.equipos);
        
      }
  

      async buscar_equipo(){
        this.loading =true;
        this.errors=[];
        
        //console.log(this.form_buscar_equipo.value);
        const eq = await this.equiposService.buscar_equipo(this.form_buscar_equipo.value);
        this.equipos_buscar = eq['data'];

        this.equipos_add = this.equipos_buscar ;

        //console.log(this.equipos_buscar);
        //console.log(this.equipos_add);
        
        
        this.loading= false;
        this.crear_form_add_equipo();
      }

      async agregar_equipo()
      {
          this.errors=[];

          if(this.form_add_equipo.invalid){
            this.form_add_equipo.markAllAsTouched();
            return;
          }

          const form_values = { ...this.form_add_equipo.value,familia_id:this.familia['id']}
      
          const registro = await this.familiaService.registra_familia_items(form_values);
          
          if(!registro['res']){
            //console.log(registro['mensaje'])
            this.errors = registro['mensaje'];
            return;
          }
          
          if(registro['res']){
            //console.log(registro['data']);

            this.equipos_buscar = [];
            this.equipos_add = [];
            this.errors =[]
            //asigno nuavementos los equipos de la familia para actualizar tabla
            this.equipos = registro['data'];

            this.form_add_equipo.reset();
            this.form_buscar_equipo.reset();
          }
      }

      async eliminar_familia_items(familia_id:number,item:any)
      {
          const eliminar = await this.familiaService.eliminar_familias_items(familia_id,item['id']);
          
          if(!eliminar['res']){
            //console.log(registro['mensaje'])
            this.errors = eliminar['mensaje'];
            return;
          }

          if(eliminar['res']){
            const i = this.equipos.indexOf(item);

            if(i !==-1){
              this.equipos.splice( i, 1 );
            }

            //console.log(eliminar['data']);
          }
      }

      subirItem(index:number,equipo:any){
        
        const itemAnterior = index - 1;
        
        const itemTemp = this.equipos[itemAnterior];
    
        this.equipos[itemAnterior] = equipo;   
        this.equipos[index] = itemTemp;   

        //console.log(this.equipos);
      }

      bajarItem(index:number,equipo:any){
        
        const itemSiguiente = index + 1;
        
        const itemTemp = this.equipos[itemSiguiente];
    
        this.equipos[itemSiguiente] = equipo;   
        this.equipos[index] = itemTemp;   

        //console.log(this.equipos);
      }


}
