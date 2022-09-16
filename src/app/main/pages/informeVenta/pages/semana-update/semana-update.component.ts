import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeVentaService } from '../../services/informe-venta.service';

@Component({
  selector: 'app-semana-update',
  templateUrl: './semana-update.component.html',
  styleUrls: ['./semana-update.component.css']
})
export class SemanaUpdateComponent implements OnInit {

      @Input() semana:any;
      @Input() semanas_arr:any[]=[];
      @Output() semanas_form = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<any>();

  
      formSemana:FormGroup = this.fb.group({
        infor_v_semana_tipo_id: ['',[Validators.required]],
        fecha_inicial: ['',[Validators.required]],
        fecha_final: ['',[Validators.required]],
        estado_id: ['',[Validators.required]],
      });

      semanaTipos:any =[];
      loading:boolean = false;
      errors:any = []; 


      constructor(private fb:FormBuilder,
                  private informeVentaService: InformeVentaService) { }

      ngOnInit(): void {
          this.index_select();
      }

      campoNoValido(campo:string){
        return this.formSemana.controls[campo].touched && this.formSemana.controls[campo].errors;
      }

      async index_select()
      {
          this.loading = true;

     
          const semanaT = await this.informeVentaService.index_info_v_semana_tipos();
          
          if (semanaT['res'])
          {
              this.semanaTipos = semanaT['data'];
            
          } else {  
              this.errors = semanaT['data'];
            
          }

          this.loading = false;
          this.cargar_semana();

      }


      cargar_semana(){
          this.formSemana.reset({
              ...this.semana
          });

      }

      async update_semana()
      {

          if(this.formSemana.invalid){
            this.formSemana.markAllAsTouched();
            return;
          }
          
          const registro = await this.informeVentaService.update_semana_admin(this.semana['id'],this.formSemana.value);
          if(registro['res'])
          {
            const i = this.semanas_arr.indexOf( this.semana );
  
            if ( i !== -1 ) {
              this.semanas_arr[i] = registro['data'];
            }  
              this.semanas_form.emit(this.semanas_arr);
              this.operacion_form.emit('guardar');
              
              this.errors = [];
              this.formSemana.reset();
          }else{
              //console.log(registro['data']);
              this.errors = registro['data'];
          }

      }

  
      editarcancelar(){
        this.operacion_form.emit('guardar');
      }

}
