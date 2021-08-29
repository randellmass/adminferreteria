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
    buscarPedido : ['',[Validators.required]]
  });


  loading:boolean = true;
  errors:any =[];
  pedido:any = null;
  
  constructor(private fb:FormBuilder,
              private pedidosService:PedidosService) { }

  ngOnInit(): void {
  }

  async buscar_pedido()
  {
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
