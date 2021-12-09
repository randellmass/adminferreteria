import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-editar',
  templateUrl: './fiesta-editar.component.html',
  styleUrls: ['./fiesta-editar.component.css']
})
export class FiestaEditarComponent implements OnInit {

      @Input() tercero_id:any;
      @Input() terceros_array:any[];
      @Output() tercero_nuevo = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<string>();

      formTercero:FormGroup = this.fb.group({
        fiestasucursal_id: ['',[Validators.required]],
        fiestaestado_id: ['',[Validators.required]],
        fiestatipo_id: ['',[Validators.required]],
        documento: ['',[Validators.required,Validators.minLength(3)]],
        nombre: ['',[Validators.required,Validators.minLength(3)]],
        documentoDe: [''],
        cupos: [''],
        contacto: [''],
      });

      errors:any =[];
      tercero:any;
      sucursales:any =[];
      tipos:any =[];
      estados:any =[];
      invitados:any =[];
      
      constructor(private fb:FormBuilder,
                  private fiestaService:FiestaService) { }

      ngOnInit(): void {
          this.cargarSelec();
   
      }

      async cargarSelec()
      {
          const result_sucursales = await this.fiestaService.index_sucursales();
          if (result_sucursales['res'])
          {
              this.sucursales = result_sucursales['data'];
          } else {
              this.errors = result_sucursales['data'];
          }
  
          const result_tipos = await this.fiestaService.index_tipos();
          if (result_tipos['res'])
          {
              this.tipos = result_tipos['data'];
          } else {
              this.errors = result_tipos['data'];
          }

          const result_estados = await this.fiestaService.index_estados();
          if (result_estados['res'])
          {
              this.estados = result_estados['data'];
          } else {
              this.errors = result_estados['data'];
          }

          
        const result_invitados = await this.fiestaService.index();
        if (result_invitados['res'])
        {
            this.invitados = result_invitados['data'];
        } else {
            this.errors = result_invitados['data'];
        }

          this.cargarForm();
      }

      cargarForm(){
          this.formTercero.reset({
            ...this.tercero_id
          });

          this.formTercero.get('documento').disable();
      }

      campoNoValido(campo:string){
        return this.formTercero.controls[campo].touched && this.formTercero.controls[campo].errors;
      }

      async editar_tercero(){
          if(this.formTercero.invalid){
            this.formTercero.markAllAsTouched();
            return;
          }
        
          const tercero_reg = await this.fiestaService.update(this.tercero_id['id'],this.formTercero.value);
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
