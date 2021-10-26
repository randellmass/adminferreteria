import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotchillerService } from '../../services/cotchiller.service';

@Component({
  selector: 'app-listado-cotizacion-detalle',
  templateUrl: './listado-cotizacion-detalle.component.html',
  styleUrls: ['./listado-cotizacion-detalle.component.css']
})
export class ListadoCotizacionDetalleComponent implements OnInit {
    
    cotizacion:any;
    loading:boolean = false;
    materiales:any[]=[];
    orden:any;
    orden_id:any;
    cot_id:any;
    operacion:string="guardar";
    
    constructor(private cotchillerService:CotchillerService,
                private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( params =>{
          this.orden_id = params['orden_id'];
          this.cot_id = params['cot_id'];
          this.show_cotizacion_materiales( params['cot_id']);
      })
    }
    
    async show_cotizacion_materiales(cot_id:any){
      
      this.loading=true;
        const result_coti = await this.cotchillerService.show(cot_id);
      
        if (result_coti['res']) {
          this.cotizacion = result_coti['data'];
          //console.log(this.cotizacion);
        }

        const result_orden = await this.cotchillerService.show_orden_materiales(this.cot_id,this.orden_id);
      
        if (result_orden['res']) {
          this.orden = result_orden['data'];
          //console.log(this.orden);
          this.materiales = result_orden['data']['lmateriales'];
        }

      this.loading=false;
      
    }


    async eliminar_compnte(compnte:any){

        this.loading=true;
            const eliminar = await this.cotchillerService.destroy_detalle_cotizacion(this.orden['id'],compnte['id']);
            if(eliminar['res'])
            {
              const i = this.materiales.indexOf(compnte);

              if(i !==-1){
                this.materiales.splice( i, 1 );
              }

              const result_cot = await this.cotchillerService.show(this.cotizacion['id']);

              if(result_cot['res'])
              {
                  this.cotizacion = result_cot['data'];
              }

              const result_orden = await this.cotchillerService.show_orden_materiales(this.cot_id,this.orden_id);
      
              if (result_orden['res'])
              {
                  this.orden = result_orden['data'];
              }
              
            }
        this.loading=false;

    }
}
