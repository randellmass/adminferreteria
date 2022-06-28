import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-semana-index',
  templateUrl: './semana-index.component.html',
  styleUrls: ['./semana-index.component.css']
})
export class SemanaIndexComponent implements OnInit {

  formSemana:FormGroup = this.fb.group({
    infor_v_semana_tipo_id: ['',[Validators.required]],
    fecha_inicial: ['',[Validators.required]],
    fecha_final: ['',[Validators.required]],
  });

  semanas:any =[];
  semanaTipos:any =[];
  loading:boolean = false;
  errors:any =[];

  constructor( private informeVentaService: InformeVentaService,
               private router:Router,
               private fb:FormBuilder) { }

  ngOnInit(): void {
    this.index_prepuestos();
  }

  campoNoValido(campo:string){
    return this.formSemana.controls[campo].touched && this.formSemana.controls[campo].errors;
  }


  async index_prepuestos()
  {
      this.loading = true;

      const listado = await this.informeVentaService.index_info_v_semanas();
      
      if (listado['res'])
      {
        this.semanas = listado['data'];
      } else {  
        this.errors = listado['data'];
      }

      const semanaT = await this.informeVentaService.index_info_v_semana_tipos();
      
      if (semanaT['res'])
      {
        this.semanaTipos = semanaT['data'];
        
      } else {  
        this.errors = listado['data'];
        
      }

      this.loading = false;
  }

  update_presupuesto(presupuesto_id:any){
      this.router.navigateByUrl(`main/dashboard/informe/update/${presupuesto_id}`);
  }



  async agregar_semana()
  {
      if(this.formSemana.invalid){
        this.formSemana.markAllAsTouched();
        return;
      }
    
      const informe_reg = await this.informeVentaService.store_info_v_semana(this.formSemana.value);
      if (informe_reg['res'])
      {
        this.semanas.push(informe_reg['data']);  
        this.errors=[];
        this.formSemana.reset();
      }else{
          this.errors = informe_reg['data'];
      }

  }//agregar_semana

}
