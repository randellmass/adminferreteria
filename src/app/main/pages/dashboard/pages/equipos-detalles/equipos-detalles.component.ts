import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardEquiposService } from '../../services/dashboard-equipos.service';

const URL = `http://confortseek.comfortfresh.com/products/detail`;

@Component({
  selector: 'app-equipos-detalles',
  templateUrl: './equipos-detalles.component.html',
  styleUrls: ['./equipos-detalles.component.css']
})
export class EquiposDetallesComponent implements OnInit {

  equipo:any;
  myAngularxQrCode:any;

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
          //console.log(dataEquipo['data']);
          this.equipo = dataEquipo['data'];
          this.myAngularxQrCode = `${ URL}/${ this.equipo['id']}`;

      } else {
          //TODO::error sino hay registro
      }


  }

}
