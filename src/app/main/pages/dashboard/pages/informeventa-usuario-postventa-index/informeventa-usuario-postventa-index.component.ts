import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-postventa-index',
  templateUrl: './informeventa-usuario-postventa-index.component.html',
  styleUrls: ['./informeventa-usuario-postventa-index.component.css']
})
export class InformeventaUsuarioPostventaIndexComponent implements OnInit {

  @Input() presupuesto_id:any;

  formPostVenta:FormGroup = this.fb.group({
    infor_v_postv_concepto_id: ['',[Validators.required]],
    cliente_documento: ['',[Validators.required]],
    cliente_nombre: ['',[Validators.required]],
    documento: ['',],
    telefono: ['',],
    fecha_reporte: ['',],
    comentarios: ['',[Validators.required]],
  });
  
  postventas:any[];
  conceptos:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService) { }

  ngOnInit(): void {
    this.cargarinforme_cotizaciones(this.presupuesto_id);
  }

  campoNoValido(campo:string){
    return this.formPostVenta.controls[campo].touched && this.formPostVenta.controls[campo].errors;
  }

  async cargarinforme_cotizaciones(presupuesto_id:any){

    this.loading=true;

      const result_conceptos = await this.informeVentaService.index_info_v_postventa_conceptos();
      if (result_conceptos['res'])
      {
          this.conceptos = result_conceptos['data'];
      }

      const result_informe = await this.informeVentaService.index_info_v_postventa(presupuesto_id);
      if (result_informe['res'])
      {
          this.postventas = result_informe['data'];
      }

    this.loading=false;

  }

  async delete_concepto_postventa(postventa_item:any)
  {

      this.loading=true;

      const quitar = await this.informeVentaService.delete_presupuesto_usuario_postventa(this.presupuesto_id,postventa_item['id']);
      
      if (quitar['res']) 
      {
          this.postventas = this.postventas.filter( item => item['id'] !== postventa_item['id']);
          
          this.loading=false;
          this.formPostVenta.reset();
      } else {
          this.errors= quitar['data'];
          this.loading=false;
      }

  }

  async agregar_postventa()
  {
      if(this.formPostVenta.invalid){
        this.formPostVenta.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_presupuesto_usuario_postventa(this.presupuesto_id,this.formPostVenta.value);
      if (informe_reg['res'])
      {
        this.postventas.push(informe_reg['data']);  
        this.errors=[];
        this.formPostVenta.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_posteventa


}
