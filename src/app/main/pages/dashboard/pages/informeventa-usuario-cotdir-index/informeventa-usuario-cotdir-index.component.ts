import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlmacenService } from '../../../almacen/services/almacen.service';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-cotdir-index',
  templateUrl: './informeventa-usuario-cotdir-index.component.html',
  styleUrls: ['./informeventa-usuario-cotdir-index.component.css']
})
export class InformeventaUsuarioCotdirIndexComponent implements OnInit {

  @Input() presupuesto:any;

  formCotizacion:FormGroup = this.fb.group({
    infor_v_cot_dir_concepto_id: ['',[Validators.required]],
    user_venta_id: ['',[Validators.required]],
    cantidad: ['',[Validators.required]],
    observacion: [''],
  });
  
  cotizaciones:any[];
  conceptos:any[];
  usuarios:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService,
              private almacenService: AlmacenService) { }

  ngOnInit(): void {
    this.cargarinforme_cotizaciones(this.presupuesto['id']);
  }

  campoNoValido(campo:string){
    return this.formCotizacion.controls[campo].touched && this.formCotizacion.controls[campo].errors;
  }

  async cargarinforme_cotizaciones(presupuesto_id:any){

    this.loading=true;

      const result_conceptos = await this.informeVentaService.index_info_v_cot_dir_conceptos();
      if (result_conceptos['res'])
      {
          this.conceptos = result_conceptos['data'];
      }

      const result_usuarios = await this.almacenService.index_usuarios_almacenes(this.presupuesto['almacen_id']);
      if (result_usuarios['res'])
      {
          this.usuarios = result_usuarios['data'];
      }

      const result_informe = await this.informeVentaService.index_info_v_cotizaciones_director(presupuesto_id);
      if (result_informe['res'])
      {
          this.cotizaciones = result_informe['data'];
      }

    this.loading=false;

  }

  async update_concepto_cot(index:number,cantidad:any,observacion:any,cotizacion:any)
  {

      const form_editar ={
        "cantidad":cantidad,
        "observacion": observacion,
        "infor_v_estado_id":1,
      }
      this.loading=true;

      const editar = await this.informeVentaService.update_presupuesto_usuario_cot_dir(this.presupuesto['id'],cotizacion['id'],form_editar);

      if (editar['res']) 
      {
          this.cotizaciones[index] = editar['data'];
          this.loading=false;
      } else {
          this.errors= editar['data'];
          this.loading=false;
      }

  }

  async agregar_cotizacion()
  {
      if(this.formCotizacion.invalid){
        this.formCotizacion.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_presupuesto_usuario_cot_dir(this.presupuesto['id'],this.formCotizacion.value);

      if (informe_reg['res'])
      {
        this.cotizaciones.push(informe_reg['data']);  
        this.errors=[];
        this.formCotizacion.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_cotizacion

}
