import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-detalle-index',
  templateUrl: './despacho-admin-detalle-index.component.html',
  styleUrls: ['./despacho-admin-detalle-index.component.css']
})
export class DespachoAdminDetalleIndexComponent implements OnInit {

  formPedido:FormGroup = this.fb.group({
    despacho_pedido_id: ['',[Validators.required]],
    despacho_turno_id: ['',[Validators.required]],
    documentos_entrega: ['',[Validators.required]],
  });
  
  pedidos:any[];
  despachos_detalle:any[];
  pedido_id:any;
  despacho_detalle_id:any;
  despacho_id:any;
  turnos:any[];
  operacion:string="guardar";
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedroute.params.subscribe( params =>{
      this.despacho_id = params['id']
      this.index_despacho_pedidos(this.despacho_id);
      this.index_form();
    });

  }

  campoNoValido(campo:string){
    return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
  }

  async index_despacho_pedidos(despacho_id:any)
  {
    this.loading = true;

      const listado = await this.despachosService.index_despachos_pedido( despacho_id);
      
      if (listado['res'])
      {
        this.despachos_detalle = listado['data'];
        //console.log(this.depachos_detalle);
      } else {  
        this.errors = listado['data'];
        
      }
    this.loading = false;
  }

  async index_form()
  {
    this.loading = true;

    const listado_pedidos= await this.despachosService.index_pedidos();
    
    if (listado_pedidos['res'])
    {
        this.pedidos = listado_pedidos['data'];
        //console.log(this.turnos);
    } else {  
        this.errors = listado_pedidos['data'];
      
    }

    const listado_turnos = await this.despachosService.index_turnos();
    
    if (listado_turnos['res'])
    {
        this.turnos = listado_turnos['data'];
        //console.log(this.turnos);
    } else {  
        this.errors = listado_turnos['data'];
      
    }

    this.loading = false;
  }

  async pedido_editar(despacho_detalle:any)
  {
      this.operacion = "editar";
      this.loading = true;

      const show_pedido = await this.despachosService.show_pedidos(despacho_detalle['p_pedido_id']);
    
      if (show_pedido['res'])
      {
          this.pedido_id = show_pedido['data'];
          this.despacho_detalle_id = despacho_detalle;
          //console.log(this.turnos);
      } else {  
          this.errors = show_pedido['data'];
        
      }
      this.loading = false;

  }

  async pedido_eliminar(despacho_id:any,despacho_detalle_id:any)
  {
    
    const eliminar = await this.despachosService.destroy_despachos_pedido(despacho_id,despacho_detalle_id['id'])
    this.loading = true;
    this.errors=[];

    if(eliminar['res'])
    {
      const i = this.despachos_detalle.indexOf(despacho_detalle_id);

      if(i !==-1){
        this.despachos_detalle.splice( i, 1 );
      }
      this.loading = false;
      
    }else{
      this.errors = eliminar['data'];
      this.loading = false;
    }
   
  }

  async agregar_pedido()
  {
        if(this.formPedido.invalid){
          this.formPedido.markAllAsTouched();
          return;
        }
        this.loading = true;

        const pedido_reg = await this.despachosService.store_despachos_pedido(this.despacho_id,this.formPedido.value);
        if (pedido_reg['res'])
        {
            
            this.despachos_detalle.unshift(pedido_reg['data']);  
            this.errors=[];
            this.formPedido.reset();
            this.loading = false;
        }else{
            this.errors = pedido_reg['data'];
            this.loading = false;
        }

  
  }

}
