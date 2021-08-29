import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EquiposService } from '../../../equipos/services/equipos.service';
import { TercerosService } from '../../../terceros/services/terceros.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-registro-pedidos',
  templateUrl: './registro-pedidos.component.html',
  styleUrls: ['./registro-pedidos.component.css']
})
export class RegistroPedidosComponent implements OnInit {

    @Input() pedidos_array:any[];
    @Output() pedido_nuevo = new EventEmitter<any>();

    formPedido:FormGroup = this.fb.group({
        documento: ['',[Validators.required]],
        tercero_id: ['',[Validators.required]],
        fecha_recibido: ['',[Validators.required]],
        fecha_entrega: [''],
        observacion: [''],
        op_ensamble:[''],
        op_laminado:[''],
        op_serpertin:[''],
        op_electrica:[''],
        op_refri:[''],
        vendedor: ['',[Validators.required]],
    });

    form_buscar_equipo:FormGroup = this.fb.group({
      buscarEquipo : ['',[Validators.required]]
    });

    form_buscar_tercero:FormGroup = this.fb.group({
      buscarTercero: ['',[Validators.required]]
    });

    loading:boolean = true;
    errors:any =[];
    pedido:any;
    terceros:any[] =[];
    equipos:any[] =[];
    vendedores:any[] =[];
    
    constructor(private fb:FormBuilder,
                private pedidosService:PedidosService,
                private equiposService:EquiposService,
                private usuariosService:UsuariosService,
                private tercerosService:TercerosService) { }

    ngOnInit(): void {
       this.cargarSelectForm();
    }

    campoNoValido(campo:string){
      return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
    }

    async cargarSelectForm(){

      this.loading=true;
        //const tercero_list = await this.tercerosService.index();
        //this.terceros = tercero_list['data'];

        const vendedores_list = await this.usuariosService.listado_Usuarios();
        this.vendedores = vendedores_list;

  
      this.loading=false;
      
    }

    async agregar_pedido(){
        if(this.formPedido.invalid){
          this.formPedido.markAllAsTouched();
          return;
        }
      
        const pedido_reg = await this.pedidosService.store(this.formPedido.value);
        if (pedido_reg['res'])
        {
            this.pedido = pedido_reg['data'];
            this.pedidos_array.unshift(this.pedido);
            
            this.pedido_nuevo.emit(this.pedidos_array);
            this.errors =[];
            this.formPedido.reset();
        }else{
            this.errors = pedido_reg['data'];
        }


    }

    async buscar_tercero(){
      this.loading= true;
      const eq = await this.tercerosService.search_tercero(this.form_buscar_tercero.value);
      this.terceros = eq['data'];
      this.loading= false;
    }

}
