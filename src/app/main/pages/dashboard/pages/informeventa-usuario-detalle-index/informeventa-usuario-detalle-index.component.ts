import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-detalle-index',
  templateUrl: './informeventa-usuario-detalle-index.component.html',
  styleUrls: ['./informeventa-usuario-detalle-index.component.css']
})
export class InformeventaUsuarioDetalleIndexComponent implements OnInit {

  presupuesto:any;
  loading:boolean = false;
  errors:any =[];

  constructor(private informeVentaService:InformeVentaService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe( param =>{
        this.cargarinforme(param['id']);
    }); 
  }

  async cargarinforme(presupuesto_id:any){

    this.loading=true;

      const result_informe = await this.informeVentaService.show_prespuesto_usuario(presupuesto_id);
      if (result_informe['res'])
      {
          this.presupuesto = result_informe['data'];

      }


    this.loading=false;

  }

}
