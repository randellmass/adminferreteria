import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/main/pages/servicios/interfaces/servicios';
import { ServiciosService } from '../../../../servicios/services/servicios.service';

@Component({
  selector: 'app-solicitudes-dashboard',
  templateUrl: './solicitudes-dashboard.component.html',
  styleUrls: ['./solicitudes-dashboard.component.css']
})
export class SolicitudesDashboardComponent implements OnInit {

  servicios:Servicio[] = [];

  constructor(private solictudesService:ServiciosService) { 
     this.getlistado_servicios_cliente();
  }

  ngOnInit(): void {
  }

  async getlistado_servicios_cliente(){
    this.servicios = await this.solictudesService.listado_servicio_cliente();

    console.log(this.servicios);
   
 }

}
