import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';


@Component({
  selector: 'app-informeventa-usuario-index',
  templateUrl: './informeventa-usuario-index.component.html',
  styleUrls: ['./informeventa-usuario-index.component.css']
})
export class InformeventaUsuarioIndexComponent implements OnInit {

  FormConsultas: FormGroup = this.fb.group({
    infor_v_semana_id: ['']
  });
  
  informes:any =[];
  semanas: any = [];
  loading:boolean = false;
  errors:any =[];

  constructor( private informeVentaService: InformeVentaService,
               private fb: FormBuilder,
               private router:Router) { }

  ngOnInit(): void {
    this.index_prepuestos();
  }


  async index_prepuestos()
  {
    this.loading = true;

    const listado = await this.informeVentaService.index_informe_usuario();
    
    if (listado['res'])
    {
      this.informes = listado['data'];
      //console.log(this.informes);
    } else {  
      this.errors = listado['data'];
      
    }

    const listsemanas = await this.informeVentaService.index_info_v_semanas();

    if (listsemanas['res']) {
      this.semanas = listsemanas['data'];
      //console.log(this.semanas);
 
    } else {
      this.errors = listsemanas['data'];
    }

    this.loading = false;
  }

  update_presupuesto(presupuesto_id:any){
      this.router.navigateByUrl(`main/dashboard/informe/update/${presupuesto_id}`);
  }

  presupuesto_detalle(presupuesto_id:any){
    this.router.navigateByUrl(`main/dashboard/informe/detalle/${presupuesto_id}`);
  }

  async consulta_informe() {

    this.loading = true;
    const consulta = await this.informeVentaService.consultas_informe_ventas_asesor(this.FormConsultas.value);

    if (consulta['res']) {
      this.informes = consulta['data'];
      this.errors = [];
      this.loading = false;
    } else {
      this.errors = consulta['data'];
      this.loading = false;
    }

  }

}
