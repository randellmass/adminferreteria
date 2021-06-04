import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnidadesService } from '../../service/unidades.service';

@Component({
  selector: 'app-listado-unidades',
  templateUrl: './listado-unidades.component.html',
  styleUrls: ['./listado-unidades.component.css']
})
export class ListadoUnidadesComponent implements OnInit {

      unidades:any[] = [];
      errors:any=[];
      loading:boolean = false;

      form_unidad:FormGroup = this.fb.group({
        nombre : ['',[Validators.required,Validators.minLength(1)]],
      });

      constructor(private fb:FormBuilder,
                  private unidadesService:UnidadesService) { }

      ngOnInit(): void {
        this.listado_caracteristicas();
      }

      campoNoValido(campo:string){
        return this.form_unidad.controls[campo].touched && this.form_unidad.controls[campo].errors;
      }

      async listado_caracteristicas(){
        this.loading= true;

          const result_caract = await this.unidadesService.listado_unidades();
          if (result_caract['res'])
          {
            this.errors="";  
            this.unidades = result_caract['data'];  
          } else {
            this.errors = result_caract['data']; 
          }

          this.loading= false; 
      }

      async guardar(){
          if(this.form_unidad.invalid){
            this.form_unidad.markAllAsTouched();
            return;
          }

          const registrar = await this.unidadesService.registra_unidad(this.form_unidad.value);

          if (registrar['res']) {
              this.unidades.push(registrar['data']);
              this.form_unidad.reset();
          } else {
              this.errors= registrar['data'];
          }

      }

      async item_v(index,item:any,item_name:any,item_sele:any){
 
         const form_editar ={
            "nombre":item_name,
            "estado_id":item_sele,
          }

          const editar = await this.unidadesService.editar_unidad(form_editar,item['id']);

          if (editar['res']) {
              this.unidades[index] = editar['data'];
          } else {
              this.errors= editar['data'];
          }

      }
      
}
