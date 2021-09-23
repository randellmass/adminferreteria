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
    operacion:string="guardar";
    
    constructor(private cotchillerService:CotchillerService,
                private activatedRoute:ActivatedRoute) { }

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
        console.log(this.cotizacion);
        this.materiales = equipo1['data']['lmateriales'];
      }

      this.loading=false;
      
    }

    async eliminar_compnte(compnte:any){

        this.loading=true;
          const eliminar = await this.cotchillerService.destroy_detalle_cotizacion(this.cotizacion['id'],compnte['id']);
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
            
          }
        this.loading=false;

    }
}
