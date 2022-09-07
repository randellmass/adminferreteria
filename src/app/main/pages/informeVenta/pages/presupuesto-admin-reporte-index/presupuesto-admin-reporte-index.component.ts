import { Component, Input, OnInit } from '@angular/core';
import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-presupuesto-admin-reporte-index',
  templateUrl: './presupuesto-admin-reporte-index.component.html',
  styleUrls: ['./presupuesto-admin-reporte-index.component.css']
})
export class PresupuestoAdminReporteIndexComponent implements OnInit {

  @Input() presupuesto_id:any;
  @Input() usuario_rol_id:any;

  presupuesto:any;
  result_informe:any = {};
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
  cotdirector:any = [];
  actividadesdirector:any = [];


  constructor(private informeVentaService:InformeVentaService) { }

  ngOnInit(): void {
        this.cargarinforme(this.presupuesto_id);
  }

  async cargarinforme(presupuesto_id:any){

    this.loading=true;
   
      if (this.usuario_rol_id==1)
      {
          this.result_informe = await this.informeVentaService.show_prespuesto_admin(presupuesto_id);  
      } else {
          this.result_informe = await this.informeVentaService.show_prespuesto_usuario(presupuesto_id);
      }
      
      
      if (this.result_informe['res'])
      {
          this.presupuesto = this.result_informe['data'];
          this.cotizaciones = this.presupuesto['cotizaciones'];
          this.redesotros = this.presupuesto['redesotros'];
          this.cotanalisis = this.presupuesto['cotanalisis'];
          this.postventas = this.presupuesto['postventas'];
          this.backorders = this.presupuesto['backorders'];
          this.toneladas = this.presupuesto['toneladas'];
          this.cotdirector = this.presupuesto['cotdirector'];
          this.actividadesdirector = this.presupuesto['actividadesdirector'];

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
         this.errors = this.result_informe['data'];
      }


    this.loading=false;
    
  }

}
