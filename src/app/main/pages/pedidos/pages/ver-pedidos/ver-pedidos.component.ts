import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdenesService } from '../../services/ordenes.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {

    errors:any=[];
    loading:boolean = false;
    pedido:any;
    ordenes:any[]=[];
    pedido_id:any;
    operacion:string="guardar";
    
    constructor(private pedidosService:PedidosService,
                private activatedRoute:ActivatedRoute) { }

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


}
