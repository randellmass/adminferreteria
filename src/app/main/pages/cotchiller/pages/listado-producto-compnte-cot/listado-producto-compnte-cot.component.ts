import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataTable} from "simple-datatables";

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
    totalCosto:number =0;
    
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
        if(equipo1['res'])
        {

          this.producto = equipo1['data'];
          this.compntes = equipo1['data']['compntes'];

          let sumaCosto=0;
          this.compntes.forEach( item =>{
              sumaCosto+= item['cantidad'] * item['equipo']['costo'];
          });

          this.totalCosto = sumaCosto;
        }
         
      this.loading=false;
      
    }

    async eliminar_compnte(compnte:any){
        
        this.loading=true;
        
        const eliminar = await this.cotproductoService.destroy_producto_compnte(this.producto['id'],compnte['id']);
        if(eliminar['res'])
        {
          const i = this.compntes.indexOf(compnte);

          if(i !==-1){
            this.compntes.splice( i, 1 );
          }
          
        }
        this.loading=false;
     
    }

    async eliminar_todos_compntes(producto_id:any)
    {
        this.loading=true;
        const eliminar = await this.cotproductoService.destroy_todos_compntes(producto_id);
      
        if(eliminar['res'])
        {
          this.compntes =[];
        }

        this.loading=false;
    }

    buscar_en_listado(termino:string)
    {
        if (termino!="")
        {
            const consulta = this.compntes.find( item =>{
                return item['equipo']['codigo'] ==termino
            });  

            if(consulta){
               const i = this.compntes.indexOf(consulta);
               if(i !==-1){
                this.compntes.splice( i, 1 );
                this.compntes.unshift(consulta);
                }
              
            }
        }
    }

    
    /*ngAfterViewChecked() {
      
      if(this.loading==false)
      {
        this.crear_tabla();
        //console.log("after view");
      }
    }

    crear_tabla()
    {
        const dataTable = new DataTable("#order-listing", {
          searchable: true,
          fixedHeight: true, 
          serverSide: true,
          processing: true,
          labels: {
            placeholder: "Buscar...",
            perPage: "{select} Cantidad por pagina",
            noRows: "No entries to found",
            info: "Showing {start} to {end} of {rows} entries",
          },
        });
    }*/
    
}
