import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-update',
  templateUrl: './informeventa-usuario-update.component.html',
  styleUrls: ['./informeventa-usuario-update.component.css']
})
export class InformeventaUsuarioUpdateComponent implements OnInit {


  formPresupuesto:FormGroup = this.fb.group({
    infor_v_semana_id: ['',[Validators.required]],
    presupuesto_valor: ['',[Validators.required]],
    venta_real: ['',Validators.required],
    infor_v_estado_id: ['',[Validators.required]]
  });

  semanas:any =[];
  estados:any =[];
  presupuesto:any;
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private informeVentaService:InformeVentaService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( param =>{
      this.cargarSelectForm(param['id']);
   }); 

  }

  campoNoValido(campo:string){
      return this.formPresupuesto.controls[campo].touched && this.formPresupuesto.controls[campo].errors;
    }

    cargarDatosForm(){
      this.formPresupuesto.reset({
          ...this.presupuesto
      });
    }

    async cargarSelectForm(presupuesto_id:any){

      this.loading=true;
 
        const result_semanas = await this.informeVentaService.index_info_v_semanas();
        if (result_semanas['res'])
        {
            this.semanas = result_semanas['data'];
        }

        const result_estados = await this.informeVentaService.index_info_v_estados();
        if (result_estados['res'])
        {
            this.estados = result_estados['data'];
        }

        const result_informe = await this.informeVentaService.show_prespuesto_usuario(presupuesto_id);
        if (result_informe['res'])
        {
            this.presupuesto = result_informe['data'];
        }


      this.loading=false;
      
      this.cargarDatosForm();
    }

    async editar_presupuesto(){
        if(this.formPresupuesto.invalid){
          this.formPresupuesto.markAllAsTouched();
          return;
        }
      
        const editar_presupuesto = await this.informeVentaService.update_presupuesto_usuario(this.presupuesto['id'],this.formPresupuesto.value);
        if (editar_presupuesto['res'])
        {
            this.presupuesto = editar_presupuesto['data'];
            this.errors =[];
            this.formPresupuesto.reset();
            this.router.navigateByUrl('main/dashboard/informe');
        }else{
          this.errors =editar_presupuesto['data'];
        }
    }
}
