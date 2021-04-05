import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
                  private router:Router,
                  private familiaService:FamiliasService,
                  private equiposService:EquiposService,
                  private activatedRoute:ActivatedRoute) { }

      ngOnInit(): void {
        this.activatedRoute.params.subscribe( params =>{
          this.buscar_individual_familia( params['id']);
          
        })
      }

      
      crear_form_add_equipo(){
        this.form_add_equipo = this.fb.group({
          equipo_id : ['',[Validators.required]]
        });
      }

      campoNoValido(campo:string){
        return this.form_add_equipo.controls[campo].touched && this.form_add_equipo.controls[campo].errors;
      }

      async buscar_individual_familia(familia_id:number){

        const familia1 = await this.familiaService.individual_familia(familia_id);
        
        this.familia = familia1['data'];
        this.equipos = familia1['data']['equipos'];
        console.log(this.familia);
        //console.log(categoria_familia1);
        
      }
  

      async buscar_equipo(){
        this.loading =true;
        console.log(this.form_buscar_equipo.value);
        const eq = await this.equiposService.buscar_equipo(this.form_buscar_equipo.value);
        this.equipos_buscar = eq['data'];

        this.equipos_add = this.equipos_buscar ;

        console.log(this.equipos_buscar);
        console.log(this.equipos_add);
        
        //this.form_add_equipo.
        
        
        this.loading= false;
        this.crear_form_add_equipo();
      }

      agregar_equipo()
      {
          console.log(this.form_add_equipo.value);
      }


}
