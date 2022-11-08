import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-file',
  templateUrl: './despacho-admin-file.component.html',
  styleUrls: ['./despacho-admin-file.component.css']
})
export class DespachoAdminFileComponent implements OnInit {


 
  formPedido:FormGroup = this.fb.group({
    despacho_pedido_id: ['',[Validators.required]],
    despacho_turno_id: ['',[Validators.required]],
    documentos_entrega: ['',[Validators.required]],
  });
  
  pedido:any;
  operacion:string="guardar";
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedroute.params.subscribe( params =>{

      console.log(params);

      // this.despacho_id = params['id']
       this.index_pedidos(params['id']);
      // this.index_form();
    });

  }

  campoNoValido(campo:string){
    return this.formPedido.controls[campo].touched && this.formPedido.controls[campo].errors;
  }

  async index_pedidos(pedido_id:any)
  {
    this.loading = true;

      const listado = await this.despachosService.show_pedidos( pedido_id);
      
      if (listado['res'])
      {
        this.pedido = listado['data'];
        console.log(this.pedido);
      } else {  
        this.errors = listado['data'];
        
      }

    this.loading = false;
  }

  async index_form()
  {
    this.loading = true;

    // const listado_pedidos= await this.despachosService.index_pedidos();
    
    // if (listado_pedidos['res'])
    // {
    //     this.pedidos = listado_pedidos['data'];
    //     //console.log(this.turnos);
    // } else {  
    //     this.errors = listado_pedidos['data'];
      
    // }

    // const listado_turnos = await this.despachosService.index_turnos();
    
    // if (listado_turnos['res'])
    // {
    //     this.turnos = listado_turnos['data'];
    //     //console.log(this.turnos);
    // } else {  
    //     this.errors = listado_turnos['data'];
      
    // }

    this.loading = false;
  }


}
