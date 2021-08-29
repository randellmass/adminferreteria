import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { TercerosService } from '../../../terceros/services/terceros.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit {

    @Input() pedidos_array:any[];
    @Input() pedido_id:any;
    @Output() pedido_nuevo = new EventEmitter<any>();
    @Output() operacion_form = new EventEmitter<string>();

    formPedido:FormGroup = this.fb.group({
        documento: ['',[Validators.required]],
        tercero_id: ['',[Validators.required]],
        observacion: [''],
        fecha_recibido: ['',[Validators.required]],
        fecha_entrega: [''],
        op_ensamble:[''],
        op_laminado:[''],
        op_serpertin:[''],
        op_electrica:[''],
        op_refri:[''],
        vendedor: ['',[Validators.required]],
        pedidoestado_id: ['',[Validators.required]],
    });

    loading:boolean = true;
    errors:any =[];
    pedido:any;
    terceros:any[] =[];
    equipos:any[] =[];
    vendedores:any[] =[];
    pedidoEstados:any[] =[];
    
    constructor(private fb:FormBuilder,
                private pedidosService:PedidosService,
                private equiposService:EquiposService,
                private usuariosService:UsuariosService,
                private tercerosService:TercerosService) { }

    ngOnInit(): void {
       this.cargarSelectForm();
       this.cargarDatosForm();
    }

    campoNoValido(campo:string){
      return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
    }

    cargarDatosForm(){
      this.formPedido.reset({
          ...this.pedido_id
      });
    }

    async cargarSelectForm(){

      this.loading=true;
        const tercero_list = await this.tercerosService.index();
        this.terceros = tercero_list['data'];

        /*const buscarEquipo = {
            'buscarEquipo':this.pedido_id['equipo_codificacion']
        }

        const equipos_list = await this.equiposService.buscar_equipo(buscarEquipo);
        this.equipos = equipos_list['data'];*/

        const vendedores_list = await this.usuariosService.listado_Usuarios();
        this.vendedores = vendedores_list;

        const estados_list = await this.pedidosService.index_pedido_estados();
        this.pedidoEstados = estados_list['data'];

      this.loading=false;
      
    }

    async editar_pedido(){
        if(this.formPedido.invalid){
          this.formPedido.markAllAsTouched();
          return;
        }
      
        const pedido_reg = await this.pedidosService.update(this.pedido_id['id'],this.formPedido.value);
        if (pedido_reg['res'])
        {
            this.pedido = pedido_reg['data'];
     
            const i = this.pedidos_array.indexOf( this.pedido_id );
 
            if ( i !== -1 ) {
              this.pedidos_array[i] = this.pedido;
            }
            
            this.pedido_nuevo.emit(this.pedidos_array);
            this.operacion_form.emit("guardar");
            this.errors =[];
            this.formPedido.reset();
        }else{
            this.errors = pedido_reg['data'];
        }


    }

    cancelar_editar(){
      this.operacion_form.emit("guardar");
    }

}
