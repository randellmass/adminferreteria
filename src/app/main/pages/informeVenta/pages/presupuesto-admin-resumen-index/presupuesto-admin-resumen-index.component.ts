import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


import { AlmacenService } from '../../../almacen/services/almacen.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-presupuesto-admin-resumen-index',
  templateUrl: './presupuesto-admin-resumen-index.component.html',
  styleUrls: ['./presupuesto-admin-resumen-index.component.css']
})
export class PresupuestoAdminResumenIndexComponent implements OnInit {

  FormConsultas: FormGroup = this.fb.group({
    almacen_id: [''],
    semana_id: ['']
  });

  informes: any = [];
  bodegas: any = [];
  semanas: any = [];
  loading: boolean = false;
  errors: any = [];

  cotizaciones: any = [];
  cotizaciones_concepto: any = [];
  cotxconceptos:any = [];
  sumaCotizaciones: number = 0;

  redesotros: any = [];
  redesotros_concepto: any = [];
  redesotrosxconcepto:any= [];
  sumaRedesOtro: number = 0;
  cotanalisis: any = [];
  postventas: any = [];
  backorders: any = [];
  toneladas: any = [];
  cotdirector:any = [];
  postvdirector:any = [];
  actividadesdirector:any =[];


  constructor(private informeVentaService: InformeVentaService,
    private almacenService: AlmacenService,
    private usuariosService: UsuariosService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.index_prepuestos();
  }


  async index_prepuestos() {
    this.loading = true;

    const almacenes = await this.almacenService.index_almacenes();

    if (almacenes['res']) {
      this.bodegas = almacenes['data'];

      //console.log(this.bodegas);
    } else {
      this.errors = almacenes['data'];

    }

    const cot_conceptos = await this.informeVentaService.index_info_v_cot_conceptos();
    if (cot_conceptos['res']) {
      this.cotizaciones_concepto = cot_conceptos['data'];
    }


    const redesotro_conceptos = await this.informeVentaService.index_info_v_redesotro_conceptos();
    if (redesotro_conceptos['res'])
    {
        this.redesotros_concepto = redesotro_conceptos['data'];
    }

    const listsemanas = await this.informeVentaService.index_info_v_semanas();

    if (listsemanas['res']) {
      this.semanas = listsemanas['data'];
      //console.log(this.semanas);
      this.semanas = this.semanas.filter((item: any) => item['estado_id'] == 1);

    } else {
      this.errors = listsemanas['data'];
    }

    this.loading = false;
  }



  async consulta_informe() {

    const { almacen_id, semana_id } = this.FormConsultas.value;

    const formData = new FormData();

    if ((semana_id != "") && (almacen_id == "")) {
      formData.append('informe_id', '2');
      formData.append('infor_v_semana_id', semana_id);
    }

    if ((semana_id != "") && (almacen_id != "")) {
      formData.append('informe_id', '1');
      formData.append('almacen_id', almacen_id);
      formData.append('infor_v_semana_id', semana_id);
    }

    const consulta = await this.informeVentaService.consultas_informe_ventas(formData);

    if (consulta['res']) {
      this.informes = consulta['data'];
      this.cargarinforme();
      this.errors = [];
    } else {
      this.errors = consulta['data'];
    }

  }


  async cargarinforme() {

    this.loading = true;

    this.cotizaciones = [];
    this.cotxconceptos = [];
    this.sumaCotizaciones = 0;
    this.redesotros = [];
    this.redesotrosxconcepto = [];
    this.sumaRedesOtro = 0;
    this.cotanalisis = [];
    this.postventas = [];
    this.backorders = [];
    this.toneladas = [];
    this.cotdirector = [];
    this.postvdirector = [];
    this.actividadesdirector = [];

    this.informes.forEach(presupuesto => {

      //se suben los informes finalizado o revisados
      if ((presupuesto['infor_v_estado_id']==2) || (presupuesto['infor_v_estado_id']==3))
      {
        this.cotizaciones = this.cotizaciones.concat(presupuesto['cotizaciones']);
        this.redesotros = this.redesotros.concat(presupuesto['redesotros']);
        this.cotanalisis = this.cotanalisis.concat(presupuesto['cotanalisis']);
        this.postventas = this.postventas.concat(presupuesto['postventas']);
        this.backorders = this.backorders.concat(presupuesto['backorders']);
        this.toneladas = this.toneladas.concat(presupuesto['toneladas']);
        this.cotdirector = this.cotdirector.concat(presupuesto['cotdirector']);
        this.postvdirector = this.postvdirector.concat(presupuesto['postvdirector']);
        this.actividadesdirector = this.actividadesdirector.concat(presupuesto['actividadesdirector']);
      }//if ((presupuesto['infor_v_estado_id']==2) || (presupuesto['infor_v_estado_id']==3))
    });

    //saco los conceptos de cotizaciones


    this.cotizaciones_concepto.forEach((concepto, index) => {
        this.cotxconceptos[index] = {
          "infor_v_cot_concepto_id": concepto['id'],
          "infor_v_cot_concepto_nombre": concepto['nombre'],
          "cantidad": 0
        };
    });
    

    this.cotizaciones.forEach( item =>{

      this.cotxconceptos.forEach( (det,i) =>{
          if(item['infor_v_cot_concepto_id'] == det['infor_v_cot_concepto_id'])
          {
            this.cotxconceptos[i] = {...det,"cantidad": det['cantidad']+ item['cantidad']}  
          } 
      });

    });

    this.cotxconceptos.forEach(cot => {
      this.sumaCotizaciones += cot['cantidad'];
    });


    this.redesotros_concepto.forEach((concepto, index) => {
      this.redesotrosxconcepto[index] = {
        "infor_v_otro_concepto_id": concepto['id'],
        "infor_v_otro_concepto_nombre": concepto['nombre'],
        "cantidad": 0
      };
    });


    this.redesotros.forEach( item =>{

      this.redesotrosxconcepto.forEach( (det,i) =>{
          if(item['infor_v_otro_concepto_id'] == det['infor_v_otro_concepto_id'])
          {
            this.redesotrosxconcepto[i] = {...det,"cantidad": det['cantidad']+ item['cantidad']}  
          } 
      });

    });


    this.redesotrosxconcepto.forEach(redotro => {
      this.sumaRedesOtro += redotro['cantidad'];
    });

    //calculo de porcentaje cotizaciones
    this.cotxconceptos = this.cotxconceptos.map(cot => {
      const porcentaje = (cot['cantidad'] / this.sumaCotizaciones) * 100;
      return { ...cot, "porcentaje": porcentaje }
    });

    this.redesotrosxconcepto = this.redesotrosxconcepto.map(redotro => {
      const porcentaje = (redotro['cantidad'] / this.sumaRedesOtro) * 100;
      return { ...redotro, "porcentaje": porcentaje }
    });



    this.loading = false;

  }


}
