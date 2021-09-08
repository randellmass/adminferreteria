import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-editar-producto-cot',
  templateUrl: './editar-producto-cot.component.html',
  styleUrls: ['./editar-producto-cot.component.css']
})
export class EditarProductoCotComponent implements OnInit {

      @Input() equipo_id:any;
      @Input() equipos_arr:any[];
      @Output() equipo_form = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<string>();

      formEquipo:FormGroup = this.fb.group({
          estado_id: ['',[Validators.required]],
      });

      errors:any =[];

      estados=[
        {
          estado_id: 1,
          nombre: 'Activo',
        },
        {
          estado_id: 2,
          nombre: 'Inactivo',
        }
      ]
      
      constructor(private fb:FormBuilder,
                  private cotproductoService:CotproductoService) { }

      ngOnInit(): void {
         this.cargarForm();
      }

      cargarForm(){
          this.formEquipo.reset({
            ...this.equipo_id
          });
      }

      campoNoValido(campo:string){
        return this.formEquipo.controls[campo].touched && this.formEquipo.controls[campo].errors;
      }

      async editarEquipo(){
          if(this.formEquipo.invalid){
            this.formEquipo.markAllAsTouched();
            return;
          }
        
          const tercero_reg = await this.cotproductoService.update(this.equipo_id['id'],this.formEquipo.value);
          if (tercero_reg['res'])
          {
              const i = this.equipos_arr.indexOf( this.equipo_id );
 
              if ( i !== -1 ) {
                this.equipos_arr[i] = tercero_reg['data'];
              }
              
              this.equipo_form.emit(this.equipos_arr);
              this.errors =[];
              this.formEquipo.reset();
              this.operacion_form.emit("guardar");
          }else{
              this.errors = tercero_reg['data'];
          }
      }

      cancelar_editar(){
        this.operacion_form.emit("guardar");
      }


}
