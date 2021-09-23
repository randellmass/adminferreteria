import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';

@Component({
  selector: 'app-listado-lpmaterial-detalle',
  templateUrl: './listado-lpmaterial-detalle.component.html',
  styleUrls: ['./listado-lpmaterial-detalle.component.css']
})
export class ListadoLpmaterialDetalleComponent implements OnInit {

    producto:any;
    loading:boolean = false;
    compntes:any[]=[];
    operacion:string="guardar";
    
    constructor(private cotLPMaterialesService:CotlpmaterialesService,
                private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( params =>{
        this.show_producto( params['id']);
        
      })
    }

    async show_producto(equipo_id:number){

      this.loading=true;
        const equipo1 = await this.cotLPMaterialesService.show(equipo_id);
     
        this.producto = equipo1['data'];
        this.compntes = equipo1['data']['detalles'];
      this.loading=false;
      
    }

    async eliminar_compnte(compnte:any){

      const eliminar = await this.cotLPMaterialesService.destroy_detalle_lpmateriales(this.producto['id'],compnte['id']);
      if(eliminar['res'])
      {
        const i = this.compntes.indexOf(compnte);

        if(i !==-1){
          this.compntes.splice( i, 1 );
        }
        
      }

    }

}
