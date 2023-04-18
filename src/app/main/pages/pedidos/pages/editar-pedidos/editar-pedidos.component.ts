import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-editar-pedidos',
  templateUrl: './editar-pedidos.component.html',
  styleUrls: ['./editar-pedidos.component.css']
})
export class EditarPedidosComponent implements OnInit {

  
    formPedido:FormGroup = this.fb.group({
        documento: ['',[Validators.required]],
        tercero_id: [{value: '', disabled: true},[Validators.required]],
        observacion_interna: [''],
        observacion_publica: [''],
        fecha_recibido: ['',[Validators.required]],
        fecha_entrega: [''],
        vendedor: ['',[Validators.required]],
        almacen_id: ['',[Validators.required]],
        valor_costo: [''],
        guia: ['',[Validators.required]],
        pedidoestado_id: ['',[Validators.required]],
    });

    loading:boolean = true;
    errors:any =[];
    pedido:any;
    terceros:any[] =[];
    almacenes:any[] =[];
    vendedores:any[] =[];
    pedidoEstados:any[] =[];

    
    constructor(private fb:FormBuilder,
                private pedidosService:PedidosService,
                private usuariosService:UsuariosService,
                private activatedRoute:ActivatedRoute,
                private router:Router) { }

    ngOnInit(): void {

       this.activatedRoute.params.subscribe( param =>{
          this.cargarSelectForm(param['id']);
       }); 

    }

    campoNoValido(campo:string){
      return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
    }

    cargarDatosForm(){
      this.formPedido.reset({
          ...this.pedido
      });
    }

    async cargarSelectForm(pedido_id:any){

      this.loading=true;
 
        const result_pedido = await this.pedidosService.show(pedido_id);
        if (result_pedido['res'])
        {
            this.pedido = result_pedido['data'];
        }

        const result_almacenes = await this.pedidosService.index_almacenes();
        if (result_almacenes['res'])
        {
            this.almacenes = result_almacenes['data'];
        }

        const vendedores_list = await this.usuariosService.listado_Usuarios();
        if(vendedores_list['res']){
          this.vendedores = vendedores_list['data'];
        }

        const estados_list = await this.pedidosService.index_pedido_estados();
        if(estados_list['res']){
          this.pedidoEstados = estados_list['data'];
        }

      this.loading=false;
      
      this.cargarDatosForm();
    }

    async editar_pedido(){
        if(this.formPedido.invalid){
          this.formPedido.markAllAsTouched();
          return;
        }
      
        const pedido_reg = await this.pedidosService.update(this.pedido['id'],this.formPedido.value);
        if (pedido_reg['res'])
        {
            this.pedido = pedido_reg['data'];
            this.errors =[];
            this.formPedido.reset();
            this.router.navigateByUrl('main/pedidos');
        }else{
            this.errors = pedido_reg['data'];
        }


    }

    cancelar_editar(){
      this.router.navigateByUrl('main/pedidos');
    }

}
