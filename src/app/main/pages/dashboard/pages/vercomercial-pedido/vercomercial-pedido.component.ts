import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PedidosService } from '../../../pedidos/services/pedidos.service';

@Component({
  selector: 'app-vercomercial-pedido',
  templateUrl: './vercomercial-pedido.component.html',
  styleUrls: ['./vercomercial-pedido.component.css']
})
export class VercomercialPedidoComponent implements OnInit {

  formBuscarPedido:FormGroup = this.fb.group({
    buscarPedido : ['',[Validators.required]],
    buscarTipo : ['',[Validators.required]]
  });


  loading:boolean = true;
  errors:any =[];
  tipos:any[] =[];
  pedido:any = null;
  
  constructor(private fb:FormBuilder,
              private pedidosService:PedidosService) { }

  ngOnInit(): void {
      this.listado_tipos();
  }

  campoNoValido(campo:string){
    return this.formBuscarPedido.controls[campo].touched && this.formBuscarPedido.controls[campo].errors;
  }


  async listado_tipos(){
    this.loading= true;


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

  async buscar_pedido()
  {
      if(this.formBuscarPedido.invalid)
      {
          this.formBuscarPedido.markAllAsTouched();
          return;
      }
        
      this.loading= true;
      const pedido_result = await this.pedidosService.search_pedido_comercial(this.formBuscarPedido.value);
      if (pedido_result['res']) {
        this.pedido = pedido_result['data'];
        this.errors = [];
      } else {
        this.pedido = null;
        this.errors =pedido_result['data'];
      }
      this.loading= false;
    }
}
