import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-redeotro-index',
  templateUrl: './informeventa-usuario-redeotro-index.component.html',
  styleUrls: ['./informeventa-usuario-redeotro-index.component.css']
})
export class InformeventaUsuarioRedeotroIndexComponent implements OnInit {

  @Input() presupuesto_id:any;

  formRedesOtro:FormGroup = this.fb.group({
    infor_v_otro_concepto_id: ['',[Validators.required]],
    cantidad: ['',[Validators.required]],
  });
  
  redesOtro:any[];
  conceptos:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService) { }

  ngOnInit(): void {
    this.cargarinforme_cotizaciones(this.presupuesto_id);
  }

  campoNoValido(campo:string){
    return this.formRedesOtro.controls[campo].touched && this.formRedesOtro.controls[campo].errors;
  }

  async cargarinforme_cotizaciones(presupuesto_id:any){

    this.loading=true;

      const result_conceptos = await this.informeVentaService.index_info_v_redesotro_conceptos();
      if (result_conceptos['res'])
      {
          this.conceptos = result_conceptos['data'];
      }

      const result_informe = await this.informeVentaService.index_info_v_redesotro(presupuesto_id);
      if (result_informe['res'])
      {
          this.redesOtro = result_informe['data'];
      }

    this.loading=false;

  }

  async update_concepto_redesotro(index:number,cantidad:any,redesotro:any)
  {

      const form_editar ={
        "cantidad":cantidad,
        "infor_v_estado_id":1,
      }
      this.loading=true;

      const editar = await this.informeVentaService.update_presupuesto_usuario_redesotro(this.presupuesto_id,redesotro['id'],form_editar);

      if (editar['res']) 
      {
          this.redesOtro[index] = editar['data'];
          this.loading=false;
          this.formRedesOtro.reset();
      } else {
          this.errors= editar['data'];
          this.loading=false;
      }

  }

  async agregar_redesotro()
  {
      if(this.formRedesOtro.invalid){
        this.formRedesOtro.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_presupuesto_usuario_redesotro(this.presupuesto_id,this.formRedesOtro.value);
      if (informe_reg['res'])
      {
        this.redesOtro.push(informe_reg['data']);  
        this.errors=[];
        this.formRedesOtro.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_cotizacion

}
