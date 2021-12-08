import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenesService } from '../../services/ordenes.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-listado-orden',
  templateUrl: './listado-orden.component.html',
  styleUrls: ['./listado-orden.component.css']
})
export class ListadoOrdenComponent implements OnInit {

    errors:any=[];
    loading:boolean = false;
    pedido:any;
    ordenes:any[]=[];
    pedido_id:any;
    orden_id:any;
    operacion:string="guardar";
    
    constructor(private pedidosService:PedidosService,
                private activatedRoute:ActivatedRoute,
                private ordenesService:OrdenesService) { }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe( param =>{
            this.cargar_pedido(param['id']);
        });

    }


    async cargar_pedido(pedido_id:any){
      
      this.loading= true;

        const result_pedido = await this.pedidosService.show(pedido_id);
        if (result_pedido['res'])
        {
          this.errors="";  
          this.pedido = result_pedido['data'];  
          this.ordenes = this.pedido['ordenes'];

        } else {
          this.errors = result_pedido['data']; 
        }

        this.loading= false; 
    }

    async eliminar_orden(orden:any){

      const eliminar = await this.ordenesService.destroy(this.pedido['id'],orden['equipo_id'])
      if(eliminar['res'])
      {
        const i = this.ordenes.indexOf(orden);

        if(i !==-1){
          this.ordenes.splice( i, 1 );
        }
        
      }
   
    }

    editar_orden(orden:any){
      this.operacion = "editar"
      this.orden_id = orden;
    }
   

}
