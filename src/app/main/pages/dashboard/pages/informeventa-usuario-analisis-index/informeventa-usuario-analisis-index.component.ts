import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-analisis-index',
  templateUrl: './informeventa-usuario-analisis-index.component.html',
  styleUrls: ['./informeventa-usuario-analisis-index.component.css']
})
export class InformeventaUsuarioAnalisisIndexComponent implements OnInit {

  @Input() presupuesto_id:any;

  formAnalisis:FormGroup = this.fb.group({
    infor_v_analisi_id: ['',[Validators.required]],
    cliente_documento: ['',[Validators.required]],
    cliente_nombre: ['',[Validators.required]],
    documento: ['',[Validators.required]],
    telefono: ['',[Validators.required]],
    valor: ['',[Validators.required]],
    comentarios: ['',[Validators.required]],
  });
  
  analisis:any[];
  conceptos:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService) { }

  ngOnInit(): void {
    this.cargarinforme_cotizaciones(this.presupuesto_id);
  }

  campoNoValido(campo:string){
    return this.formAnalisis.controls[campo].touched && this.formAnalisis.controls[campo].errors;
  }

  async cargarinforme_cotizaciones(presupuesto_id:any){

    this.loading=true;

      const result_conceptos = await this.informeVentaService.index_info_v_analisis_conceptos();
      if (result_conceptos['res'])
      {
          this.conceptos = result_conceptos['data'];
      }

      const result_informe = await this.informeVentaService.index_info_v_analisis(presupuesto_id);
      if (result_informe['res'])
      {
          this.analisis = result_informe['data'];
      }

    this.loading=false;

  }

  async delete_concepto_analisis(analisis_item:any)
  {

      this.loading=true;

      const quitar = await this.informeVentaService.delete_presupuesto_usuario_analisis(this.presupuesto_id,analisis_item['infor_v_analisis_concepto_id']);
      
      if (quitar['res']) 
      {
          this.analisis = this.analisis.filter( item => item['id'] !== analisis_item['id']);
          
          this.loading=false;
          this.formAnalisis.reset();
      } else {
          this.errors= quitar['data'];
          this.loading=false;
      }

  }

  async agregar_analisis()
  {
      if(this.formAnalisis.invalid){
        this.formAnalisis.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_presupuesto_usuario_analisis(this.presupuesto_id,this.formAnalisis.value);
      if (informe_reg['res'])
      {
        this.analisis.push(informe_reg['data']);  
        this.errors=[];
        this.formAnalisis.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_cotizacion

}
