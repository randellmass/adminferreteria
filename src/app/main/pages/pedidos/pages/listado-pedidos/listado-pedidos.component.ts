import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent implements OnInit {

    formBuscarPedido:FormGroup = this.fb.group({
      buscarPedido : [''],
      buscarTipo : ['',[Validators.required]]
    });

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

    campoNoValido(campo:string){
      return this.formBuscarPedido.controls[campo].touched && this.formBuscarPedido.controls[campo].errors;
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

        const result_tipos = await this.pedidosService.index_pedido_tipos();
        if (result_tipos['res'])
        {
          this.errors="";  
          this.tipos = result_tipos['data'];  
     
        } else {
          this.errors = result_tipos['data']; 
        }

        this.loading= false; 
    }

    crear_pedido(){
        this.router.navigate(['main/pedidos/registro']);

    }

    editar_pedido(pedido:any){
      this.router.navigate(['main/pedidos/editar/',pedido['id']]);

    }

    ordenes_pedido(pedido:any){
        this.router.navigate(['main/pedidos/ordenes/',pedido['id']]);
    }

    ver_pedido(pedido:any){
      this.router.navigate(['main/pedidos/ver/',pedido['id']]);
    }

    async buscar_pedido()
    {
      if(this.formBuscarPedido.invalid)
      {
          this.formBuscarPedido.markAllAsTouched();
          return;
      }
      
      this.loading= true;
      const pedido_result = await this.pedidosService.search_pedido_admin(this.formBuscarPedido.value);
      
      if (pedido_result['res'])
      {
        this.pedidos = pedido_result['data'];
        console.log(this.pedidos);
        this.errors = [];
      } else {
        this.pedidos= null;
         this.errors =pedido_result['data'];
      }
      this.loading= false;
    }
    

}
