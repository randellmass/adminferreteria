import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-presupuesto-admin-config',
  templateUrl: './presupuesto-admin-config.component.html',
  styleUrls: ['./presupuesto-admin-config.component.css']
})
export class PresupuestoAdminConfigComponent implements OnInit {

  FormConsultas:FormGroup = this.fb.group({
    conceptosForm: [''],
  });


  FormConceptos:FormGroup = this.fb.group({
    nombre: ['',Validators.required],
  });

  tipoConceptos = [
  {
    id: "1",
    nombre:"Análisis - Asesor"
  },
  {
    id: "2",
    nombre:"Blackorder - Asesor"
  },
  {
    id: "3",
    nombre:"Cotizaciones - Asesor"
  },
  {
    id: "4",
    nombre:"PostVenta - Asesor"
  },
  {
    id: "5",
    nombre:"Redes y Otros - Asesor"
  },
  {
    id: "6",
    nombre:"Cotizaciones - Director"
  },
  {
    id: "7",
    nombre:"PostVenta - Director"
  }
 ]

 concepto_id:number = 0;
 conceptos:any =[];
 loading:boolean = false;
 errors:any =[];
 listado:any ={};

 constructor( private informeVentaService: InformeVentaService,
              private router:Router,
              private fb:FormBuilder) { }

 ngOnInit(): void {
   
   this.FormConsultas.get('conceptosForm').valueChanges.subscribe( option =>{
      this.index_conceptos(option);
      this.concepto_id = option;
   });
 }

  campoNoValido(campo:string){
    return this.FormConceptos.controls[campo].touched && this.FormConceptos.controls[campo].errors;
  }


 async index_conceptos(concepto_id:number)
 {
    this.loading = true;
    this.conceptos = [];

    if (concepto_id==1)
    {
        this.listado = await this.informeVentaService.index_info_v_analisis_conceptos();
    }else
    {
       if (concepto_id==2)
       {
          this.listado = await this.informeVentaService.index_info_v_backorder_conceptos();
       } else 
       {

          if (concepto_id==3) 
          {
              this.listado = await this.informeVentaService.index_info_v_cot_conceptos();
          } else {

            if (concepto_id==4)
            {
                this.listado = await this.informeVentaService.index_info_v_postventa_conceptos();
            } else {

                if (concepto_id==5)
                {
                    this.listado = await this.informeVentaService.index_info_v_redesotro_conceptos();
                } else {

                    if (concepto_id==6)
                    {
                        this.listado = await this.informeVentaService.index_info_v_cot_dir_conceptos();
                    } else {
                      
                        if (concepto_id==7)
                        {
                            this.listado = await this.informeVentaService.index_info_v_postventa_dir_conceptos();
                        }

                    }//if (concepto_id==6)
                  
                }//if (concepto_id==5)
                
            }//if (concepto_id==4)
            
          }//if (concepto_id==3)

       }//if (concepto_id==2)
    
    }//if (concepto_id==1)
     
     if (this.listado['res'])
     {
       this.conceptos = this.listado['data'];
     } else {  
       this.errors = this.listado['data'];
       
     }

     this.loading = false;
 }




  async agregar_concepto()
  {
      if(this.FormConceptos.invalid){
        this.FormConceptos.markAllAsTouched();
        return;
      }
    
      // const informe_reg = await this.informeVentaService.store_presupuesto_usuario_cot(this.presupuesto_id,this.FormConceptos.value);
      // if (informe_reg['res'])
      // {
      //   this.cotizaciones.push(informe_reg['data']);  
      //   this.errors=[];
      //   this.FormConceptos.reset();
      // }else{
      //     this.errors = informe_reg['data'];
      // }

  }//agregar_cotizacion

}
