import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlmacenService } from '../../../almacen/services/almacen.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-pedido-index',
  templateUrl: './despacho-admin-pedido-index.component.html',
  styleUrls: ['./despacho-admin-pedido-index.component.css']
})
export class DespachoAdminPedidoIndexComponent implements OnInit {

  formPedido:FormGroup = this.fb.group({
    fecha_recibido: ['',[Validators.required]],
    documento: ['',[Validators.required]],
    cliente: ['',[Validators.required]],
    cliente_cel: ['',[Validators.required]],
    cliente_direccion: ['',[Validators.required]],
    cliente_comentario: [''],
    almacen_venta_id: ['',[Validators.required]],
    vendedor_id: ['',[Validators.required]],
    almacen_origen_id: ['',[Validators.required]],
    almacen_destino_id: ['',[Validators.required]],
  });
  
  pedidos:any[];
  usuarios:any[];
  pedido_id:any;
  almacenes:any[];
  operacion:string="guardar";
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private almacenservice: AlmacenService,
              private usuariosService: UsuariosService,
              private router:Router) { }

  ngOnInit(): void {
    this.index_despachos();
  }

  campoNoValido(campo:string){
    return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
  }

  async index_despachos()
  {
    this.loading = true;

    const listado = await this.despachosService.index_pedidos();
    
    if (listado['res'])
    {
      this.pedidos = listado['data'];
      //console.log(this.pedidos);
    } else {  
      this.errors = listado['data'];
      
    }

    const listado_almacenes = await this.almacenservice.index_almacenes();
    
    if (listado_almacenes['res'])
    {
        this.almacenes = listado_almacenes['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado_almacenes['data'];
      
    }

    const listado_usuarios = await this.usuariosService.listado_Usuarios();
    
    if (listado_usuarios['res'])
    {
        this.usuarios = listado_usuarios['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado_usuarios['data'];
      
    }

    this.loading = false;
  }

  pedido_editar(pedido_id:any)
  {
      this.operacion = "editar";
      this.pedido_id = pedido_id;
  }

  async agregar_pedido()
  {
        if(this.formPedido.invalid){
          this.formPedido.markAllAsTouched();
          return;
        }
        this.loading = true;

        const pedido_reg = await this.despachosService.store_pedidos(this.formPedido.value);
        if (pedido_reg['res'])
        {
            
            this.pedidos.unshift(pedido_reg['data']);  
            this.errors=[];
            this.formPedido.reset();
            this.loading = false;
        }else{
            this.errors = pedido_reg['data'];
            this.loading = false;
        }

  
  }

}
