import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
                                                                  
import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-actividaddir-index',
  templateUrl: './informeventa-usuario-actividaddir-index.component.html',
  styleUrls: ['./informeventa-usuario-actividaddir-index.component.css']
})
export class InformeventaUsuarioActividaddirIndexComponent implements OnInit {

  @Input() presupuesto:any;

  formActividad:FormGroup = this.fb.group({
    actividad: ['',[Validators.required]],
    objetivo: ['',[Validators.required]],
    dirijido: ['',[Validators.required]],
    valor: [''],
    fecha_inicio: [''],
  });
  
  actividades:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService) { }

  ngOnInit(): void {
    this.cargarinforme_actividades(this.presupuesto['id']);
  }

  campoNoValido(campo:string){
    return this.formActividad.controls[campo].touched && this.formActividad.controls[campo].errors;
  }

  async cargarinforme_actividades(presupuesto_id:any){

    this.loading=true;

      const result_informe = await this.informeVentaService.index_info_v_actividades_director(presupuesto_id);
      if (result_informe['res'])
      {
          this.actividades = result_informe['data'];
      }

    this.loading=false;

  }

  async update_actividad_director(index:number,actividad:any,objetivo:any,dirijido:any,valor:number,fecha_inicio:any,actividaddir:any)
  {

      const form_editar ={
        "actividad": actividad,
        "objetivo": objetivo,
        "dirijido": dirijido,
        "valor": valor,
        "fecha_inicio": fecha_inicio,
        "infor_v_estado_id":1,
      }
      this.loading=true;

      const editar = await this.informeVentaService.update_presupuesto_usuario_actividad_dir(this.presupuesto['id'],actividaddir['id'],form_editar);

      if (editar['res']) 
      {
          this.actividades[index] = editar['data'];
          this.loading=false;
      } else {
          this.errors= editar['data'];
          this.loading=false;
      }

  }

  async delete_activdad_director(actividad:any)
  {

      this.loading=true;

      const quitar = await this.informeVentaService.delete_presupuesto_usuario_actividad(this.presupuesto['id'],actividad['id']);
      
      if (quitar['res']) 
      {
          this.actividades = this.actividades.filter( item => item['id'] !== actividad['id']);
          
          this.loading=false;
      } else {
          this.errors= quitar['data'];
          this.loading=false;
      }

  }

  async agregar_actividad()
  {
      if(this.formActividad.invalid){
        this.formActividad.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_presupuesto_usuario_actividad(this.presupuesto['id'],this.formActividad.value);

      if (informe_reg['res'])
      {
        this.actividades.push(informe_reg['data']);  
        this.errors=[];
        this.formActividad.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_cotizacion

}
