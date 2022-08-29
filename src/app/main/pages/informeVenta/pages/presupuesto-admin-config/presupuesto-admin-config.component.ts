import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-presupuesto-admin-config',
  templateUrl: './presupuesto-admin-config.component.html',
  styleUrls: ['./presupuesto-admin-config.component.css']
})
export class PresupuestoAdminConfigComponent implements OnInit {

  FormConsultas:FormGroup = this.fb.group({
    conceptosForm: [''],
  });

 tipoConceptos = [
  {
    id: "1",
    nombre:"Analisis - Asesor"
  },
  {
    id: "2",
    nombre:"Blackorder - Asesor"
  },
  {
    id: "3",
    nombre:"Cotizaciones - Asesor"
  },
  {
    id: "4",
    nombre:"PostVenta - Asesor"
  },
  {
    id: "5",
    nombre:"Redes y Otros - Asesor"
  },
  {
    id: "6",
    nombre:"Cotizaciones - Director"
  },
  {
    id: "7",
    nombre:"PostVenta - Director"
  }
 ]

 
 informes:any =[];
 loading:boolean = false;
 errors:any =[];

 constructor( private informeVentaService: InformeVentaService,
              private router:Router,
              private fb:FormBuilder) { }

 ngOnInit(): void {
   this.index_prepuestos();

   this.FormConsultas.get('conceptosForm').valueChanges.subscribe( option =>{
    console.log(option);
   })
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

 
     this.loading = false;
 }

 update_presupuesto(presupuesto_id:any){
     this.router.navigateByUrl(`main/informeventas/update/${presupuesto_id}`);
 }

 presupuesto_detalle(presupuesto_id:any){
   this.router.navigateByUrl(`main/informeventas/detalle/${presupuesto_id}`);
 }

//  async consulta_informe(){
   
//    const { almacen_id, user_id, semana_id } = this.FormConsultas.value;
   
//    const formData = new FormData();

//    if((semana_id!="") && (almacen_id=="") && (user_id==""))
//    {
//        formData.append('informe_id','2');
//        formData.append('infor_v_semana_id',semana_id);
//    }

//    if((semana_id=="") && (almacen_id=="") && (user_id!=""))
//    {
//        formData.append('informe_id','3');
//        formData.append('user_id',user_id);
//    }

//    if((semana_id!="") && (almacen_id!="") && (user_id==""))
//    {
//        formData.append('informe_id','1');
//        formData.append('almacen_id',almacen_id);
//        formData.append('infor_v_semana_id',semana_id);
//    }

//    if((semana_id!="") && (almacen_id=="") && (user_id!=""))
//    {
//        formData.append('informe_id','4');
//        formData.append('user_id',user_id);
//        formData.append('infor_v_semana_id',semana_id);
//    }

//    const consulta = await this.informeVentaService.consultas_informe_ventas(formData);

//    if(consulta['res'])
//    {
//        this.informes = consulta['data'];   
//        this.errors = [];
//    }else{
//        this.errors = consulta['data'];
//    }

//  }

}
