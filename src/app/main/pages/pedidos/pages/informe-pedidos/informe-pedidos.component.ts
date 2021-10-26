import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  DataTable } from "simple-datatables";
import { Router } from '@angular/router';

import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-informe-pedidos',
  templateUrl: './informe-pedidos.component.html',
  styleUrls: ['./informe-pedidos.component.css']
})
export class InformePedidosComponent implements OnInit {


    errors:any=[];
    loading:boolean = false;
    pedidos:any[] =[];
    tipos:any[] =[];
    pedido_id:any;
    operacion:string="guardar";
    
    constructor(private fb:FormBuilder,
                private pedidosService:PedidosService,
                private router:Router) { }

    ngOnInit(): void {
        this.listado_pedidos();
    }


    async listado_pedidos(){
      this.loading= true;

        const result_ter = await this.pedidosService.index();
        if (result_ter['res'])
        {
          this.errors="";  
          this.pedidos = result_ter['data'];  
     
        } else {
          this.errors = result_ter['data']; 
        }

        this.loading= false; 
    }



    ngAfterViewChecked() {
    
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
          labels: {
            placeholder: "Buscar...",
            perPage: "{select} Cantidad por pagina",
            noRows: "No entries to found",
            info: "Showing {start} to {end} of {rows} entries",
          },
        });
    }

}
