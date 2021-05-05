import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquiposCaracteristicasService } from '../../services/equipos-caracteristicas.service';

import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-caracteristica-equipos',
  templateUrl: './caracteristica-equipos.component.html',
  styleUrls: ['./caracteristica-equipos.component.css']
})
export class CaracteristicaEquiposComponent implements OnInit {

    equipo:any;
    loading:boolean = true;
    caracteristicas:any=[];
    operacion:string="guardar";
    caract_item:string;

    constructor(private equiposService:EquiposService,
                private activatedRoute:ActivatedRoute,
                private equipoCaracteristicaService:EquiposCaracteristicasService) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( params =>{
        this.buscar_individual_equipo( params['id']);
        
      })
    }

    async buscar_individual_equipo(equipo_id:number){

      this.loading=true;
        const equipo1 = await this.equiposService.individual_equipos(equipo_id);
         
        //console.log(equipo1['data']);
  
        this.equipo = equipo1['data'];
        this.caracteristicas = equipo1['data']['caracteristicas'];
      this.loading=false;
      
    }

    editar_caracteristica(caract:any){
      this.operacion = "editar";
      //console.log(caract);
      this.caract_item = caract;
    }

    async eliminar_caracteristica(caract:any){

      const eliminar = await this.equipoCaracteristicaService.eliminar_caracteristica(caract['id']);
      if(eliminar['res'])
      {
        const i = this.caracteristicas.indexOf(caract);

        if(i !==-1){
          this.caracteristicas.splice( i, 1 );
        }
        
        //console.log(eliminar['data']);
      }

    }

}
