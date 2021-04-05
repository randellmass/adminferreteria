import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes-dashboard',
  templateUrl: './solicitudes-dashboard.component.html',
  styleUrls: ['./solicitudes-dashboard.component.css']
})
export class SolicitudesDashboardComponent implements OnInit {

  
  constructor() { 
     //this.getlistado_servicios_cliente();
  }

  ngOnInit(): void {
  }

  /*async getlistado_servicios_cliente(){
    this.servicios = await this.solictudesService.listado_servicio_cliente();

    console.log(this.servicios);
   
 }*/

}
