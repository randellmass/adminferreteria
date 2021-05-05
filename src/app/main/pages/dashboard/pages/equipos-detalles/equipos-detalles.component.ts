import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardEquiposService } from '../../services/dashboard-equipos.service';

@Component({
  selector: 'app-equipos-detalles',
  templateUrl: './equipos-detalles.component.html',
  styleUrls: ['./equipos-detalles.component.css']
})
export class EquiposDetallesComponent implements OnInit {

  equipo:any;

  constructor(private activatedRouter:ActivatedRoute,
              private dashboardEquipoService:DashboardEquiposService) { }

  ngOnInit(): void {
      this.activatedRouter.params.subscribe( param =>{
            this.equipo_detalle(param.id);
      })
  }

  async equipo_detalle(equipo_id:any){
      const dataEquipo = await this.dashboardEquipoService.equipo_detalle(equipo_id);

      if (dataEquipo['res']) {
          console.log(dataEquipo['data']);
          this.equipo = dataEquipo['data'];
      } else {
          console.log(dataEquipo['data']);
      }


  }

}
