import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlmacenService } from '../../../almacen/services/almacen.service';
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-postvdir-index',
  templateUrl: './informeventa-usuario-postvdir-index.component.html',
  styleUrls: ['./informeventa-usuario-postvdir-index.component.css']
})
export class InformeventaUsuarioPostvdirIndexComponent implements OnInit {

  @Input() presupuesto:any;

  formPostVenta:FormGroup = this.fb.group({
    infor_v_postv_dir_concepto_id: ['',[Validators.required]],
    user_venta_id: ['',[Validators.required]],
    observacion: [''],
  });
  
  postventas:any[];
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
    return this.formPostVenta.controls[campo].touched && this.formPostVenta.controls[campo].errors;
  }

  async cargarinforme_cotizaciones(presupuesto_id:any){

    this.loading=true;

      const result_conceptos = await this.informeVentaService.index_info_v_postventa_dir_conceptos();
      if (result_conceptos['res'])
      {
          this.conceptos = result_conceptos['data'];
      }

      const result_usuarios = await this.almacenService.index_usuarios_almacenes(this.presupuesto['almacen_id']);
      if (result_usuarios['res'])
      {
          this.usuarios = result_usuarios['data'];
      }

      const result_informe = await this.informeVentaService.index_info_v_postventa_director(presupuesto_id);
      if (result_informe['res'])
      {
          this.postventas = result_informe['data'];
      }

    this.loading=false;

  }

  async update_concepto_postvdir(index:number,observacion:any,cotizacion:any)
  {

      const form_editar ={
        "observacion": observacion,
        "infor_v_estado_id":1,
      }
      this.loading=true;

      const editar = await this.informeVentaService.update_presupuesto_usuario_postv_dir(this.presupuesto['id'],cotizacion['id'],form_editar);

      if (editar['res']) 
      {
          this.postventas[index] = editar['data'];
          this.loading=false;
      } else {
          this.errors= editar['data'];
          this.loading=false;
      }

  }

  async delete_postv_director(postvdir:any)
  {

      this.loading=true;

      const quitar = await this.informeVentaService.delete_presupuesto_postv_director(this.presupuesto['id'],postvdir['id']);
      
      if (quitar['res']) 
      {
          this.postventas = this.postventas.filter( item => item['id'] !== postvdir['id']);
          
          this.loading=false;
      } else {
          this.errors= quitar['data'];
          this.loading=false;
      }

  }


  async agregar_postvdir()
  {
      if(this.formPostVenta.invalid){
        this.formPostVenta.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_presupuesto_usuario_postventa_dir(this.presupuesto['id'],this.formPostVenta.value);

      if (informe_reg['res'])
      {
        this.cargarinforme_cotizaciones(this.presupuesto['id']);
        this.errors=[];
        this.formPostVenta.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_cotizacion


}
