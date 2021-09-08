import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-listado-producto-compnte-cot',
  templateUrl: './listado-producto-compnte-cot.component.html',
  styleUrls: ['./listado-producto-compnte-cot.component.css']
})
export class ListadoProductoCompnteCotComponent implements OnInit {

    producto:any;
    loading:boolean = true;
    compntes:any[]=[];
    operacion:string="guardar";
    
    constructor(private cotproductoService:CotproductoService,
                private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( params =>{
        this.show_producto( params['id']);
        
      })
    }

    async show_producto(equipo_id:number){

      this.loading=true;
        const equipo1 = await this.cotproductoService.show(equipo_id);
         
        console.log(equipo1['data']);
  
        this.producto = equipo1['data'];
        this.compntes = equipo1['data']['compntes'];
       // this.caracteristicas = equipo1['data']['caracteristicas'];
      this.loading=false;
      
    }

    async eliminar_compnte(compnte:any){

      const eliminar = await this.cotproductoService.destroy_producto_compnte(this.producto['id'],compnte['id']);
      if(eliminar['res'])
      {
        const i = this.compntes.indexOf(compnte);

        if(i !==-1){
          this.compntes.splice( i, 1 );
        }
        
        //console.log(eliminar['data']);
      }

    }

}
