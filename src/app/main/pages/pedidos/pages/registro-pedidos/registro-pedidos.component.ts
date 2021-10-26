import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  
    ValidarConcepto(concepto:any,documento:string)
    {
      return (formGroup:AbstractControl):ValidationErrors | null =>{

          const conceptoV = formGroup.get(concepto).value;
          const documentoV = formGroup.get(documento).value;

          if(conceptoV == 1)
          {
            this.oculto_tipo = false;  
            if(documentoV=="")
              {
                formGroup.get(documento).setErrors({cruzar:true});
                return { cruzar:true }
              }else{
                formGroup.get(documento).setErrors(null);
              }
          }else{
            this.oculto_tipo =true;
          }
    
          return null;
      }
    }
  
    formPedido:FormGroup = this.fb.group({
        pedidotipo_id: ['',[Validators.required]],
        documento: [''],
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
        almacen_id: ['',[Validators.required]],
        valor_costo: [''],
    },
    {
      validators:[ this.ValidarConcepto('pedidotipo_id','documento')]
    });

    form_buscar_equipo:FormGroup = this.fb.group({
      buscarEquipo : ['',[Validators.required]]
    });

    form_buscar_tercero:FormGroup = this.fb.group({
      buscarTercero: ['',[Validators.required]]
    });

    loading:boolean = true;
    errors:any =[];
    terceros:any[] =[];
    tipos:any[] =[];
    almacenes:any[] =[];
    vendedores:any[] =[];
    oculto_tipo:boolean=true;
    
    constructor(private fb:FormBuilder,
                private router:Router,
                private pedidosService:PedidosService,
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
        const list_tipos = await this.pedidosService.index_pedido_tipos();
        if (list_tipos['res'])
        {
            this.tipos = list_tipos['data'];
        }

        const list_almacenes = await this.pedidosService.index_almacenes();
        if (list_almacenes['res'])
        {
            this.almacenes = list_almacenes['data'];
        }

        const vendedores_list = await this.usuariosService.listado_Usuarios();
        this.vendedores = vendedores_list;
        //console.log(this.vendedores);

  
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
          this.router.navigateByUrl('main/pedidos');
        }else{
            this.errors = pedido_reg['data'];
        }


    }

    async buscar_tercero()
    {
        this.loading= true;
        const eq = await this.tercerosService.search_tercero(this.form_buscar_tercero.value);
        this.terceros = eq['data'];
        this.loading= false;
    }

}
