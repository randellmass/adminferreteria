import { Component, OnInit } from '@angular/core';

import { DashboardEquiposService } from '../../services/dashboard-equipos.service';

@Component({
  selector: 'app-equipos-listado',
  templateUrl: './equipos-listado.component.html',
  styleUrls: ['./equipos-listado.component.css']
})
export class EquiposListadoComponent implements OnInit {

  equipos:any =[];
  archivos:any =[];
  loading:boolean = false;
  errors:any =[];
  link_active_importados:boolean =false;
  link_active_nacionales:boolean =false;
  link_active_refrigeracion:boolean =false;
  link_active_repuestos:boolean =false;

  file_types:any =[
    {
      "id":1,
      "nombre":"Brochure"
    },
    {
      "id":2,
      "nombre":"Manual"
    },
    {
      "id":3,
      "nombre":"Ficha técnica"
    },
    {
      "id":4,
      "nombre":"Plano técnico"
    },
    {
      "id":5,
      "nombre":"Plano Eléctrico"
    },
    {
      "id":6,
      "nombre":"Vista explosiva"
    },
    {
      "id":7,
      "nombre":"Diagrama"
    },
    {
      "id":8,
      "nombre":"Imagen"
    },
    {
      "id":9,
      "nombre":"Certificado"
    }
  ]

  constructor(private dashboardEquiposService:DashboardEquiposService) { }

  ngOnInit(): void {
      this.listo_dashboard_inicio();
  }

  async listo_dashboard_inicio(){

    this.loading = true;
    const listado = await this.dashboardEquiposService.listado_equipos();
    if (listado['res']) {
      //this.equipos = listado['data'];
      this.archivos = listado['data'];
      //console.log(this.equipos);
    } else {  
      this.errors = listado['data'];
      
    }
    this.loading = false;

  }

  async buscar_equipos(texto:string,tipoArchivo:string)
  {
      
      if (texto.length==0)
      {
        return;  
      }  
      this.loading = true;
      const buscar_result = await this.dashboardEquiposService.buscar_equipos(texto,tipoArchivo);
      this.loading = false;
      if (buscar_result['res'])
      {
          //this.equipos = buscar_result['data'];  
          this.archivos = buscar_result['data'];  
      } else {
          this.errors = buscar_result['data'];
      }

  }

  item_menu(equipos:any){
     switch (equipos) {
        case "importados":
              this.link_estados();
              this.link_active_importados = true;
          break;
        case "nacionales":
              this.link_estados();
              this.link_active_nacionales = true;
          break;
        case "refrigeracion":
              this.link_estados();
            this.link_active_refrigeracion = true;
          break;
        case "repuestos":
              this.link_estados();
            this.link_active_repuestos = true;
          break;
     }
  }

  link_estados(){
    this.link_active_importados =false;
    this.link_active_nacionales =false;
    this.link_active_refrigeracion =false;
    this.link_active_repuestos =false;
  }

}
