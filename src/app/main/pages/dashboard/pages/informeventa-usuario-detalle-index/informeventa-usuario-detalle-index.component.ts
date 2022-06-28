import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-detalle-index',
  templateUrl: './informeventa-usuario-detalle-index.component.html',
  styleUrls: ['./informeventa-usuario-detalle-index.component.css']
})
export class InformeventaUsuarioDetalleIndexComponent implements OnInit {

  presupuesto_id:any;
  loading:boolean = false;
  errors:any =[];

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe( param =>{
        this.presupuesto_id = param['id'];
    }); 
  }

 

}
