import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InformeVentaService } from '../../../informeVenta/services/informe-venta.service';

@Component({
  selector: 'app-informeventa-usuario-store',
  templateUrl: './informeventa-usuario-store.component.html',
  styleUrls: ['./informeventa-usuario-store.component.css']
})
export class InformeventaUsuarioStoreComponent implements OnInit {


  formPresupuesto:FormGroup = this.fb.group({
    infor_v_semana_id: ['',[Validators.required]],
    presupuesto_valor: ['',[Validators.required]],
    venta_real: ['',Validators.required],
  });

  semanas:any =[];
  presupuesto:any;
  loading:boolean = false;
  errors:any =[];

  constructor( private informeVentaService: InformeVentaService,
               private fb:FormBuilder,
               private router:Router) { }

  ngOnInit(): void {
    this.index_infor_v_semanas();
  }


  campoNoValido(campo:string){
    return this.formPresupuesto.controls[campo].touched && this.formPresupuesto.controls[campo].errors;
  }


  async index_infor_v_semanas()
  {
    this.loading = true;

    const listado = await this.informeVentaService.index_info_v_semanas();
    
    if (listado['res'])
    {
      this.semanas = listado['data'];
      //console.log(this.semanas);
    } else {  
      this.errors = listado['data'];
      
    }
    this.loading = false;
  }


  async agregar_presupuesto(){
        if(this.formPresupuesto.invalid){
          this.formPresupuesto.markAllAsTouched();
          return;
        }
      
        const informe_reg = await this.informeVentaService.store_presupuesto_usuario(this.formPresupuesto.value);
        if (informe_reg['res'])
        {
            this.router.navigateByUrl('main/dashboard/informe');
            this.errors=[];
         
        }else{
            this.errors = informe_reg['data'];
        }

  
    }

}
