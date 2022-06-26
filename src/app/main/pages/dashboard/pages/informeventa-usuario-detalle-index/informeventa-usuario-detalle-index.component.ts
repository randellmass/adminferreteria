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

  cotizaciones:any = [];
  sumaCotizaciones:number=0;
  sumaRedesOtro:number=0;
  redesotros:any = [];
  cotanalisis:any = [];
  postventas:any = [];
  backorders:any = [];
  toneladas:any = [];


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
          this.cotizaciones = this.presupuesto['cotizaciones'];
          this.redesotros = this.presupuesto['redesotros'];
          this.cotanalisis = this.presupuesto['cotanalisis'];
          this.postventas = this.presupuesto['postventas'];
          this.backorders = this.presupuesto['backorders'];
          this.toneladas = this.presupuesto['toneladas'];

          this.cotizaciones.forEach(cot =>  {
              this.sumaCotizaciones+=cot['cantidad'];
          });

          this.redesotros.forEach(cot =>  {
              this.sumaRedesOtro+=cot['cantidad'];
          });

          //calculo de porcentaje cotizaciones
          this.cotizaciones =  this.cotizaciones.map( cot => {
              const porcentaje = (cot['cantidad']/this.sumaCotizaciones)*100;
              return {...cot, "porcentaje": porcentaje }
          });

          this.redesotros =  this.redesotros.map( redotro => {
            const porcentaje = (redotro['cantidad']/this.sumaRedesOtro)*100;
            return {...redotro, "porcentaje": porcentaje }
        });

     
      }else{
         this.errors = result_informe['data'];
      }


    this.loading=false;
    
  }

}
