import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-index',
  templateUrl: './despacho-admin-index.component.html',
  styleUrls: ['./despacho-admin-index.component.css']
})
export class DespachoAdminIndexComponent implements OnInit {

  formDespacho:FormGroup = this.fb.group({
    vehiculo_id: ['',[Validators.required]],
    ciudad_id: ['',[Validators.required]],
    conductor_id: ['',[Validators.required]],
    auxiliar: ['',[Validators.required]],
    kilometraje_inicial: ['',[Validators.required]],
  });
  
  despachos:any[];
  ciudades:any[];
  usuarios:any[];
  vehiculos:any[];
  conceptos:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private usuariosService: UsuariosService,
              private router:Router) { }

  ngOnInit(): void {
    this.index_despachos();
  }

  campoNoValido(campo:string){
    return this.formDespacho.controls[campo].touched && this.formDespacho.controls[campo].errors;
  }

  async index_despachos()
  {
    this.loading = true;

    const listado = await this.despachosService.index_despachos();
    
    if (listado['res'])
    {
      this.despachos = listado['data'];
      //console.log(this.despachos);
    } else {  
      this.errors = listado['data'];
      
    }

    const vehiculos_result = await this.despachosService.index_vehiculos();
    
    if (vehiculos_result['res'])
    {
      this.vehiculos = vehiculos_result['data'];
      //console.log(this.vehiculos);
    } else {  
      this.errors = vehiculos_result['data'];
      
    }

    const ciudades_result = await this.despachosService.index_ciudades();
    
    if (ciudades_result['res'])
    {
      this.ciudades = ciudades_result['data'];
      //console.log(this.ciudades);
    } else {  
      this.errors = ciudades_result['data'];
      
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

  despacho_detalle(despacho_id:any){
    this.router.navigateByUrl(`main/despachos/detalle/${despacho_id}`);
  }


  async agregar_despacho()
  {
        if(this.formDespacho.invalid){
          this.formDespacho.markAllAsTouched();
          return;
        }
        this.loading = true;

        const despacho_reg = await this.despachosService.store_despachos(this.formDespacho.value);
        if (despacho_reg['res'])
        {
            
            this.despachos.unshift(despacho_reg['data']);  
            this.errors=[];
            this.formDespacho.reset();
            this.loading = false;
        }else{
            this.errors = despacho_reg['data'];
            this.loading = false;
        }

  
  }

}
