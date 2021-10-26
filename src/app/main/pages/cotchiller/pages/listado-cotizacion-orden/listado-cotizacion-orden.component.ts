import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CotchillerService } from '../../services/cotchiller.service';

@Component({
  selector: 'app-listado-cotizacion-orden',
  templateUrl: './listado-cotizacion-orden.component.html',
  styleUrls: ['./listado-cotizacion-orden.component.css']
})
export class ListadoCotizacionOrdenComponent implements OnInit {

    cotizacion:any;
    loading:boolean = false;
    ordenes:any[]=[];
    operacion:string="guardar";
    
    constructor(private cotchillerService:CotchillerService,
                private activatedRoute:ActivatedRoute,
                private router:Router) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( params =>{
        this.show_cotizacion( params['id']);
      })
    }
    
    async show_cotizacion(cot_id:any){
      
      this.loading=true;
      const equipo1 = await this.cotchillerService.show(cot_id);
    
      if (equipo1['res']) {
        this.cotizacion = equipo1['data'];
        //console.log(this.cotizacion);
        this.ordenes = equipo1['data']['ordenes'];
      }

      this.loading=false;
      
    }

    async eliminar_producto(producto:any){

        this.loading=true;
          const eliminar = await this.cotchillerService.destroy_orden_cotizacion(this.cotizacion['id'],producto['id']);
          if(eliminar['res'])
          {
            const i = this.ordenes.indexOf(producto);

            if(i !==-1){
              this.ordenes.splice( i, 1 );
            }

            const result_cot = await this.cotchillerService.show(this.cotizacion['id']);

            if(result_cot['res'])
            {
                this.cotizacion = result_cot['data'];
            }
            
          }
        this.loading=false;

    }

    link_detalle(cot_id:any,orden_id:any)
    {
        this.router.navigate([`main/cotchiller/detalle/${cot_id}/${orden_id}`]);
    }

}
