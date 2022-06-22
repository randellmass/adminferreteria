import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-cot-index',
  templateUrl: './informeventa-usuario-cot-index.component.html',
  styleUrls: ['./informeventa-usuario-cot-index.component.css']
})
export class InformeventaUsuarioCotIndexComponent implements OnInit {

  @Input() presupuesto_id:any;

  formCotizacion:FormGroup = this.fb.group({
    infor_v_cot_concepto_id: ['',[Validators.required]],
    cantidad: ['',[Validators.required]],
  });
  
  cotizaciones:any[];
  conceptos:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.cargarinforme_cotizaciones(this.presupuesto_id);
  }

  campoNoValido(campo:string){
    return this.formCotizacion.controls[campo].touched && this.formCotizacion.controls[campo].errors;
  }

  async cargarinforme_cotizaciones(presupuesto_id:any){

    this.loading=true;

      const result_conceptos = await this.informeVentaService.index_info_v_cot_conceptos();
      if (result_conceptos['res'])
      {
          this.conceptos = result_conceptos['data'];
      }

      const result_informe = await this.informeVentaService.index_info_v_cotizaciones(presupuesto_id);
      if (result_informe['res'])
      {
          this.cotizaciones = result_informe['data'];
      }

    this.loading=false;

  }

  async update_concepto_cot(index:number,cantidad:any,cotizacion:any)
  {

      const form_editar ={
        "cantidad":cantidad,
        "infor_v_estado_id":1,
      }
      this.loading=true;

      const editar = await this.informeVentaService.update_presupuesto_usuario_cot(this.presupuesto_id,cotizacion['id'],form_editar);

      if (editar['res']) 
      {
          this.cotizaciones[index] = editar['data'];
          this.loading=false;
          this.formCotizacion.reset();
      } else {
          this.errors= editar['data'];
          this.loading=false;
      }
  }

  async agregar_presupuesto(){
    if(this.formCotizacion.invalid){
      this.formCotizacion.markAllAsTouched();
      return;
    }
  
    const informe_reg = await this.informeVentaService.store_presupuesto_usuario_cot(this.presupuesto_id,this.formCotizacion.value);
    if (informe_reg['res'])
    {
      this.cotizaciones.push(informe_reg['data']);  
      this.errors=[];
      this.formCotizacion.reset();
    }else{
        this.errors = informe_reg['data'];
    }


}

}
