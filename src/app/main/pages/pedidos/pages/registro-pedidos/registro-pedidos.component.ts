import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TercerosService } from '../../../terceros/services/terceros.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-registro-pedidos',
  templateUrl: './registro-pedidos.component.html',
  styleUrls: ['./registro-pedidos.component.css']
})
export class RegistroPedidosComponent implements OnInit {
  

  
    formPedido:FormGroup = this.fb.group({
        documento: [''],
        tercero_id: ['',[Validators.required]],
        fecha_recibido: ['',[Validators.required]],
        observacion_interna: [''],
        observacion_publica: [''],
        direccion: [''],
        ciudad_id: ['',[Validators.required]],
        guia: [''],
    });


    form_buscar_tercero:FormGroup = this.fb.group({
      buscarTercero: ['',[Validators.required]]
    });

    loading:boolean = true;
    errors:any =[];
    terceros:any[] =[];
    ciudades:any[] =[];
    
    constructor(private fb:FormBuilder,
                private router:Router,
                private pedidosService:PedidosService,
                private tercerosService:TercerosService) { }

    ngOnInit(): void {
       this.cargarSelectForm();
    }

    campoNoValido(campo:string){
      return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
    }

    async cargarSelectForm(){

      this.loading=true;


        const list_ciudades = await this.pedidosService.index_ciudades();
        if (list_ciudades['res'])
        {
            this.ciudades = list_ciudades['data'];
            //console.log(this.ciudades)
        }

  
      this.loading=false;
      
    }

    async agregar_pedido(){
        if(this.formPedido.invalid){
          this.formPedido.markAllAsTouched();
          return;
        }
        this.loading = true;
        const pedido_reg = await this.pedidosService.store(this.formPedido.value);
        if (pedido_reg['res'])
        {
          this.loading = false;
          this.router.navigateByUrl('main/pedidos');
        }else{
            this.errors = pedido_reg['data'];
            this.loading = false;
        }


    }

    async buscar_tercero()
    {
        this.loading= true;
        const eq = await this.tercerosService.search_tercero(this.form_buscar_tercero.value);
        if(eq['res']){
          this.terceros = eq['data'];
          this.loading= false;
        }else{
            this.errors = eq['data'];
            this.loading = false;
        }
    }

}
