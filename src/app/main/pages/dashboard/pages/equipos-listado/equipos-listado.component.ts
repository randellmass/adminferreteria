import { Component, OnInit } from '@angular/core';

import { DashboardEquiposService } from '../../services/dashboard-equipos.service';

@Component({
  selector: 'app-equipos-listado',
  templateUrl: './equipos-listado.component.html',
  styleUrls: ['./equipos-listado.component.css']
})
export class EquiposListadoComponent implements OnInit {

  equipos:any =[];
  loading:boolean = false;
  errors:any =[];

  constructor(private dashboardEquiposService:DashboardEquiposService) { }

  ngOnInit(): void {
      this.listo_dashboard_inicio();
  }

  async listo_dashboard_inicio(){

    this.loading = true;
    const listado = await this.dashboardEquiposService.listado_equipos();
    if (listado['res']) {
      this.equipos = listado['data'];
      //console.log(this.equipos);
    } else {  
      this.errors = listado['data'];
      
    }
    this.loading = false;

  }

  async buscar_equipos(texto:string)
  {
      if (texto.length==0)
      {
        return;  
      }  

      const buscar_result = await this.dashboardEquiposService.buscar_equipos(texto);

      if (buscar_result['res'])
      {
         //console.log(buscar_result);
          this.equipos = buscar_result['data'];  
      } else {
          this.errors = buscar_result['data'];
      }

  }

}
