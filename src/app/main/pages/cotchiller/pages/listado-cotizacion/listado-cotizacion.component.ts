import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CotchillerService } from '../../services/cotchiller.service';
import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';

@Component({
  selector: 'app-listado-cotizacion',
  templateUrl: './listado-cotizacion.component.html',
  styleUrls: ['./listado-cotizacion.component.css']
})
export class ListadoCotizacionComponent implements OnInit {

      cotizaciones:any[]=[];
      loading:boolean = false;
      operacion:string="guardar";
      cotizacion_id:any;


      constructor(private router:Router,
                  private cotClientesService:CotchillerService) { }

      ngOnInit(): void {
          this.buscarcotizaciones();
      }

      async buscarcotizaciones(){

        this.loading=true;
          const result = await this.cotClientesService.index();
          this.cotizaciones = result['data'];

        this.loading=false;

      }

      async editar_cotizacion(cot:any)
      {
          this.operacion = "editar";
          this.cotizacion_id = cot;
      }

      async editar_estado(cot:any)
      {
          this.operacion = "estado";
          this.cotizacion_id = cot;
      }

      link_detalle(cot:any)
      {
          this.router.navigate(['main/cotchiller/detalle',cot['id']]);
      }

}
