import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';

import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-almacen-usuarios-index',
  templateUrl: './almacen-usuarios-index.component.html',
  styleUrls: ['./almacen-usuarios-index.component.css']
})
export class AlmacenUsuariosIndexComponent implements OnInit {

  formUserRol:FormGroup = this.fb.group({
    infor_v_rol_id: ['',[Validators.required]],
    user_id: ['',[Validators.required]],
  });

  usuarios_almacen:any =[];
  almacen:any;
  usuarios:any =[];
  roles:any =[];
  loading:boolean = false;
  errors:any =[];

  constructor( private fb:FormBuilder,
               private almacenService: AlmacenService,
               private usuariosService: UsuariosService,
               private informeVentaService:InformeVentaService,
               private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( param =>{
      this.show_almacen(param['id']);
     
    });
  }

  campoNoValido(campo:string){
    return this.formUserRol.controls[campo].touched && this.formUserRol.controls[campo].errors;
  }

  async show_almacen(almacen_id:number)
  {
    this.loading = true;

    const almacen_show = await this.almacenService.show_almacen(almacen_id);
    
    if (almacen_show['res'])
    {
        this.almacen = almacen_show['data'];
        this.index_usuarios_almacen(this.almacen['almacen_id']);
        //console.log(this.almacenes);
    } else {  
        this.errors = almacen_show['data'];
      
    }
    this.loading = false;
  }

  async index_usuarios_almacen(almacen_id:number)
  {
    this.loading = true;

    const listado = await this.almacenService.index_usuarios_almacenes(almacen_id);
    
    if (listado['res'])
    {
        this.usuarios_almacen = listado['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado['data'];
      
    }

    const listado_rol = await this.informeVentaService.index_usuario_roles();
    
    if (listado_rol['res'])
    {
        this.roles = listado_rol['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado_rol['data'];
      
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

  async agregar_usuario()
  {
      if(this.formUserRol.invalid){
        this.formUserRol.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.almacenService.store_usuario_almacen(this.almacen['almacen_id'],this.formUserRol.value);
      if (informe_reg['res'])
      {
        this.usuarios_almacen.push(informe_reg['data']);  
        this.errors=[];
        this.formUserRol.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_cotizacion

  async delete_usuario_almacen(almacenUser:number)
  {

      this.loading=true;

      const quitar = await this.almacenService.delete_usuario_almacen(this.almacen['almacen_id'],almacenUser['user_id']);
      
      if (quitar['res']) 
      {
          this.usuarios_almacen = this.usuarios_almacen.filter( item => item['user_id'] !== almacenUser['user_id']);
          
          this.loading=false;
          this.formUserRol.reset();
      } else {
          this.errors= quitar['data'];
          this.loading=false;
      }

  }

 
}
