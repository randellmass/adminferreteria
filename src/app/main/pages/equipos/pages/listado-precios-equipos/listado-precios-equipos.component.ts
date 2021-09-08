import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquiposPreciosService } from '../../services/equipos-precios.service';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-listado-precios-equipos',
  templateUrl: './listado-precios-equipos.component.html',
  styleUrls: ['./listado-precios-equipos.component.css']
})
export class ListadoPreciosEquiposComponent implements OnInit {

    equipo:any;
    loading:boolean = true;
    costos:any=[];
    operacion:string="guardar";
    
    constructor(private equiposService:EquiposService,
                private preciosService:EquiposPreciosService,
                private activatedRoute:ActivatedRoute) { }

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
        this.costos = equipo1['data']['costos'];
       // this.caracteristicas = equipo1['data']['caracteristicas'];
      this.loading=false;
      
    }

    async eliminar_costo(costo:any){

      const eliminar = await this.preciosService.destroy(this.equipo['id'],costo['id']);
      if(eliminar['res'])
      {
        const i = this.costos.indexOf(costo);

        if(i !==-1){
          this.costos.splice( i, 1 );
        }
        
        //console.log(eliminar['data']);
      }

    }

}
