import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InformeVentaService } from '../../services/informe-venta.service';
import { AlmacenService } from '../../../almacen/services/almacen.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';

@Component({
  selector: 'app-presupuesto-admin-index',
  templateUrl: './presupuesto-admin-index.component.html',
  styleUrls: ['./presupuesto-admin-index.component.css']
})
export class PresupuestoAdminIndexComponent implements OnInit {

  
  FormConsultas:FormGroup = this.fb.group({
     almacen_id: [''],
     user_id:[''],
     semana_id:['']
  });
  
  informes:any =[];
  bodegas:any =[];
  semanas:any =[];
  usuarios:any =[];
  loading:boolean = false;
  errors:any =[];

  constructor( private informeVentaService: InformeVentaService,
               private almacenService:AlmacenService,
               private usuariosService: UsuariosService,
               private router:Router,
               private fb:FormBuilder) { }

  ngOnInit(): void {
    this.index_prepuestos();
  }


  async index_prepuestos()
  {
      this.loading = true;

      const listado = await this.informeVentaService.index_info_v_presupuesto_admin();
      
      if (listado['res'])
      {
        this.informes = listado['data'];
        //console.log(this.informes);
      } else {  
        this.errors = listado['data'];
        
      }

      const almacenes = await this.almacenService.index_almacenes();
      
      if (almacenes['res'])
      {
        this.bodegas = almacenes['data'];

        //console.log(this.bodegas);
      } else {  
        this.errors = almacenes['data'];
        
      }


      const listsemanas = await this.informeVentaService.index_info_v_semanas();
      
      if (listsemanas['res'])
      {
        this.semanas = listsemanas['data'];
        //console.log(this.semanas);
        this.semanas = this.semanas.filter( (item:any) => item['estado_id']==1);
    
      } else {  
        this.errors = listado['data'];
      }


      const listado_usuarios = await this.usuariosService.listado_Usuarios();
    
      if (listado_usuarios['res'])
      {
          this.usuarios = listado_usuarios['data'];
          //console.log(this.usuarios);
      } else {  
          this.errors = listado_usuarios['data'];
        
      }

      this.loading = false;
  }

  update_presupuesto(presupuesto_id:any){
      this.router.navigateByUrl(`main/informeventas/update/${presupuesto_id}`);
  }

  presupuesto_detalle(presupuesto_id:any){
    this.router.navigateByUrl(`main/informeventas/detalle/${presupuesto_id}`);
  }

  async consulta_informe(){
    
    const { almacen_id, user_id, semana_id } = this.FormConsultas.value;
    
    const formData = new FormData();

    if((semana_id!="") && (almacen_id=="") && (user_id==""))
    {
        formData.append('informe_id','2');
        formData.append('infor_v_semana_id',semana_id);
    }

    if((semana_id=="") && (almacen_id=="") && (user_id!=""))
    {
        formData.append('informe_id','3');
        formData.append('user_id',user_id);
    }

    if((semana_id!="") && (almacen_id!="") && (user_id==""))
    {
        formData.append('informe_id','1');
        formData.append('almacen_id',almacen_id);
        formData.append('infor_v_semana_id',semana_id);
    }

    if((semana_id!="") && (almacen_id=="") && (user_id!=""))
    {
        formData.append('informe_id','4');
        formData.append('user_id',user_id);
        formData.append('infor_v_semana_id',semana_id);
    }

    const consulta = await this.informeVentaService.consultas_informe_ventas(formData);

    if(consulta['res'])
    {
        this.informes = consulta['data'];   
        this.errors = [];
    }else{
        this.errors = consulta['data'];
    }

  }

}
