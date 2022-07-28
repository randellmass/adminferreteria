import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-presupuesto-admin-index',
  templateUrl: './presupuesto-admin-index.component.html',
  styleUrls: ['./presupuesto-admin-index.component.css']
})
export class PresupuestoAdminIndexComponent implements OnInit {

  informes:any =[];
  loading:boolean = false;
  errors:any =[];

  constructor( private informeVentaService: InformeVentaService,
               private router:Router) { }

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
      this.loading = false;
  }

  update_presupuesto(presupuesto_id:any){
      this.router.navigateByUrl(`main/informeventas/update/${presupuesto_id}`);
  }

  presupuesto_detalle(presupuesto_id:any){
    this.router.navigateByUrl(`main/informeventas/detalle/${presupuesto_id}`);
  }

}
