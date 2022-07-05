import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';


@Component({
  selector: 'app-informeventa-usuario-index',
  templateUrl: './informeventa-usuario-index.component.html',
  styleUrls: ['./informeventa-usuario-index.component.css']
})
export class InformeventaUsuarioIndexComponent implements OnInit {

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

    const listado = await this.informeVentaService.index_informe_usuario();
    
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
      this.router.navigateByUrl(`main/dashboard/informe/update/${presupuesto_id}`);
  }

  presupuesto_detalle(presupuesto_id:any){
    this.router.navigateByUrl(`main/dashboard/informe/detalle/${presupuesto_id}`);
  }

}
