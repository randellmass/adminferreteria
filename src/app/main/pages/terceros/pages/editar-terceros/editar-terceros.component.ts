import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TercerosService } from '../../services/terceros.service';

@Component({
  selector: 'app-editar-terceros',
  templateUrl: './editar-terceros.component.html',
  styleUrls: ['./editar-terceros.component.css']
})
export class EditarTercerosComponent implements OnInit {

      @Input() tercero_id:any;
      @Input() terceros_array:any[];
      @Output() tercero_nuevo = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<string>();

      formTercero:FormGroup = this.fb.group({
          documento: ['',[Validators.required]],
          nombre: ['',[Validators.required,Validators.minLength(3)]],
          email: [''],
          celular: [''],
      });

      errors:any =[];
      tercero:any;
      
      constructor(private fb:FormBuilder,
                  private tercerosService:TercerosService) { }

      ngOnInit(): void {
         this.cargarForm();
      }

      cargarForm(){
          this.formTercero.reset({
            ...this.tercero_id
          });
      }

      campoNoValido(campo:string){
        return this.formTercero.controls[campo].touched && this.formTercero.controls[campo].errors;
      }

      async editar_tercero(){
          if(this.formTercero.invalid){
            this.formTercero.markAllAsTouched();
            return;
          }
        
          const tercero_reg = await this.tercerosService.update(this.tercero_id['id'],this.formTercero.value);
          if (tercero_reg['res'])
          {
              this.tercero = tercero_reg['data'];

              const i = this.terceros_array.indexOf( this.tercero_id );
 
              if ( i !== -1 ) {
                this.terceros_array[i] = this.tercero;
              }
              
              this.tercero_nuevo.emit(this.terceros_array);
              this.errors =[];
              this.formTercero.reset();
              this.operacion_form.emit("guardar");
          }else{
              this.errors = tercero_reg['data'];
          }
      }

      cancelar_editar(){
        this.operacion_form.emit("guardar");
      }


}
