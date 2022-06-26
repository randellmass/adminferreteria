import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-backorder-index',
  templateUrl: './informeventa-usuario-backorder-index.component.html',
  styleUrls: ['./informeventa-usuario-backorder-index.component.css']
})
export class InformeventaUsuarioBackorderIndexComponent implements OnInit {

      @Input() presupuesto_id:any;

      formBackorder:FormGroup = this.fb.group({
        infor_v_back_concepto_id: ['',[Validators.required]],
        descripcion: ['',[Validators.required]],
        referencia: ['',[Validators.required]],
        comentarios: ['',[Validators.required]],
      });
      
      backorders:any[];
      conceptos:any[];
      loading:boolean = false;
      errors:any =[];

      constructor(private fb:FormBuilder,
                  private informeVentaService:InformeVentaService) { }

      ngOnInit(): void {
        this.cargarinforme_cotizaciones(this.presupuesto_id);
      }

      campoNoValido(campo:string){
        return this.formBackorder.controls[campo].touched && this.formBackorder.controls[campo].errors;
      }

      async cargarinforme_cotizaciones(presupuesto_id:any){

        this.loading=true;

          const result_conceptos = await this.informeVentaService.index_info_v_backorder_conceptos();
          if (result_conceptos['res'])
          {
              this.conceptos = result_conceptos['data'];
          }

          const result_informe = await this.informeVentaService.index_info_v_backorder(presupuesto_id);
          if (result_informe['res'])
          {
              this.backorders = result_informe['data'];
          }

        this.loading=false;

      }

      async delete_concepto_backorder(backorder_item:any)
      {

          this.loading=true;

          const quitar = await this.informeVentaService.delete_presupuesto_usuario_backorder(this.presupuesto_id,backorder_item['id']);
          
          if (quitar['res']) 
          {
              this.backorders = this.backorders.filter( item => item['id'] !== backorder_item['id']);
              
              this.loading=false;
              this.formBackorder.reset();
          } else {
              this.errors= quitar['data'];
              this.loading=false;
          }

      }

      async agregar_backorder()
      {
          if(this.formBackorder.invalid){
            this.formBackorder.markAllAsTouched();
            return;
          }
        
          const informe_reg = await this.informeVentaService.store_presupuesto_usuario_backorder(this.presupuesto_id,this.formBackorder.value);
          if (informe_reg['res'])
          {
            this.backorders.push(informe_reg['data']);  
            this.errors=[];
            this.formBackorder.reset();
          }else{
              this.errors = informe_reg['data'];
          }

      }//agregar_

}
