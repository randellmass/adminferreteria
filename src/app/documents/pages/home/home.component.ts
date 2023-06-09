import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PedidosService } from 'src/app/main/pages/pedidos/services/pedidos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formBuscarPedido:FormGroup = this.fb.group({
    buscarPedido : ['',[Validators.required,Validators.pattern(/^([0-9])*$/)]],
  });


  loading:boolean = false;
  errors:any =[];
  pedidos:any[] = [];

  constructor(private fb:FormBuilder,
              private pedidosService:PedidosService) { }

  ngOnInit(): void {

  }

  campoNoValido(campo:string){
    return this.formBuscarPedido.controls[campo].touched && this.formBuscarPedido.controls[campo].errors;
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
        this.pedidos = pedido_result['data'];
        this.errors = [];
        this.loading= false;
      } else {
        this.pedidos = [];
        this.errors =pedido_result['data'];
        this.loading= false;
      }
     
    }

}
