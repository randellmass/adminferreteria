import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-tonelada-index',
  templateUrl: './informeventa-usuario-tonelada-index.component.html',
  styleUrls: ['./informeventa-usuario-tonelada-index.component.css']
})
export class InformeventaUsuarioToneladaIndexComponent implements OnInit {

    @Input() presupuesto_id:any;

      formTonelada:FormGroup = this.fb.group({
        factura: ['',[Validators.required]],
        cliente_documento: ['',[Validators.required]],
        cliente_nombre: ['',[Validators.required]],
        cantidad: ['',[Validators.required]],
        toneladas: ['',[Validators.required]],
        comentarios: ['',],
      });
      
      toneladas:any[];
      loading:boolean = false;
      errors:any =[];

      constructor(private fb:FormBuilder,
                  private informeVentaService:InformeVentaService) { }

      ngOnInit(): void {
        this.cargarinforme_cotizaciones(this.presupuesto_id);
      }

      campoNoValido(campo:string){
        return this.formTonelada.controls[campo].touched && this.formTonelada.controls[campo].errors;
      }

      async cargarinforme_cotizaciones(presupuesto_id:any){

        this.loading=true;

          const result_informe = await this.informeVentaService.index_info_v_tonelada(presupuesto_id);
          if (result_informe['res'])
          {
              this.toneladas = result_informe['data'];
          }

        this.loading=false;

      }

      async delete_concepto_tonelada(tonelada_item:any)
      {

          this.loading=true;

          const quitar = await this.informeVentaService.delete_presupuesto_usuario_tonelada(this.presupuesto_id,tonelada_item['id']);
          
          if (quitar['res']) 
          {
              this.toneladas = this.toneladas.filter( item => item['id'] !== tonelada_item['id']);
              
              this.loading=false;
              this.formTonelada.reset();
          } else {
              this.errors= quitar['data'];
              this.loading=false;
          }

      }

      async agregar_tonelada()
      {
          if(this.formTonelada.invalid){
            this.formTonelada.markAllAsTouched();
            return;
          }
        
          const informe_reg = await this.informeVentaService.store_presupuesto_usuario_tonelada(this.presupuesto_id,this.formTonelada.value);
          if (informe_reg['res'])
          {
            this.toneladas.push(informe_reg['data']);  
            this.errors=[];
            this.formTonelada.reset();
          }else{
              this.errors = informe_reg['data'];
          }

      }//agregar_
}
