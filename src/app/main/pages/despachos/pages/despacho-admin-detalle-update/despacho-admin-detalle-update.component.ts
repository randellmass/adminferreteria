import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlmacenService } from '../../../almacen/services/almacen.service';
import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-detalle-update',
  templateUrl: './despacho-admin-detalle-update.component.html',
  styleUrls: ['./despacho-admin-detalle-update.component.css']
})
export class DespachoAdminDetalleUpdateComponent implements OnInit {

  @Input() despachos_arr:any[];
  @Input() despacho_detalle_id:any[];
  @Input() despacho_id:any;
  @Input() pedido_id:any;
  @Output() despacho_form = new EventEmitter<any>();
  @Output() operacion_editar = new EventEmitter<any>();

  formPedido:FormGroup = this.fb.group({
    fecha_recibido: ['',[Validators.required]],
    documento: ['',[Validators.required]],
    cliente: ['',[Validators.required]],
    cliente_cel: ['',[Validators.required]],
    almacen_venta_id: ['',[Validators.required]],
    almacen_origen_id: ['',[Validators.required]],
    almacen_destino_id: ['',[Validators.required]],
    despacho_estado_id: ['',[Validators.required]],
  });

  almacenes:any[];
  estados:any[];
  operacion:string;
  loading:boolean = false;
  errors:any =[];


  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private almacenservice: AlmacenService) { }

    ngOnInit(): void {
      this.index_despachos();
      this.cargar_pedido();
    }
  
    campoNoValido(campo:string){
      return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
    }
  
    async index_despachos()
    {
      this.loading = true;
      const listado_almacenes = await this.almacenservice.index_almacenes();
      
      if (listado_almacenes['res'])
      {
          this.almacenes = listado_almacenes['data'];
          //console.log(this.almacenes);
      } else {  
          this.errors = listado_almacenes['data'];
        
      }

      const listado_estados = await this.despachosService.index_despacho_estados();
      
      if (listado_estados['res'])
      {
          this.estados = listado_estados['data'];
          //console.log(this.almacenes);
      } else {  
          this.errors = listado_estados['data'];
        
      }
     
  
      this.loading = false;
    }

    cargar_pedido(){
      this.formPedido.reset({
          ...this.pedido_id
      });
    }


   cancelar_editar(){
      this.operacion_editar.emit('guardar');
    }

    async editar_pedido(){
      if(this.formPedido.invalid){
        this.formPedido.markAllAsTouched();
        return;
      }

      this.loading = true;

      const orden_reg = await this.despachosService.update_pedidos(this.pedido_id['id'],this.formPedido.value);
      if (orden_reg['res'])
      {
         const i = this.despachos_arr.indexOf( this.despacho_detalle_id );

          if ( i !== -1 ) {

                const show_despacho_detalle = await this.despachosService.show_despachos_pedido(this.despacho_id, this.despacho_detalle_id['id']);
          
                if (show_despacho_detalle['res'])
                {
                  this.despachos_arr[i] = show_despacho_detalle['data'];
                    //console.log(this.almacenes);
                } else {  
                    this.errors = show_despacho_detalle['data'];
                  
                }

          }  
            this.despacho_form.emit(this.despachos_arr);
            this.operacion_editar.emit('guardar');
            
            this.errors = [];
            this.formPedido.reset();
            this.loading = false;
      }else{
          this.errors = orden_reg['data'];
          this.loading = false;
      }


    }

}
