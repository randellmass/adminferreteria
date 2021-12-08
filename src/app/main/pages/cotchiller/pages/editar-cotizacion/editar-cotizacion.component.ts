import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CotchillerService } from '../../services/cotchiller.service';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-editar-cotizacion',
  templateUrl: './editar-cotizacion.component.html',
  styleUrls: ['./editar-cotizacion.component.css']
})
export class EditarCotizacionComponent implements OnInit {

      @Input() cotizacion_id:any;
      @Input() cotizaciones_arr:any[]=[];
      @Output() cotizacion_form = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<any>();

  
      formCotizacion:FormGroup = this.fb.group({
          tercero_documento:['',Validators.required],
          tercero_nombre:['',Validators.required],
          tercero_direccion:['',Validators.required],
          tercero_email:['',Validators.required],
          tercero_celular:['',Validators.required],
          observacion_cliente: [''],
      });

      loading:boolean = false;
      errors:any = []; 


      constructor(private fb:FormBuilder,
                  private cotClientesService:CotchillerService) { }

      ngOnInit(): void {
          this.cargar_cotizacion();

      }

      campoNoValido(campo:string){
        return this.formCotizacion.controls[campo].touched && this.formCotizacion.controls[campo].errors;
      }


      cargar_cotizacion(){
          this.formCotizacion.reset({
              ...this.cotizacion_id
          });

      }

      async editarCotizacion()
      {

          if(this.formCotizacion.invalid){
            this.formCotizacion.markAllAsTouched();
            return;
          }
          

          const registro = await this.cotClientesService.update(this.cotizacion_id['id'],this.formCotizacion.value);
          if(registro['res'])
          {
            const i = this.cotizaciones_arr.indexOf( this.cotizacion_id );
  
            if ( i !== -1 ) {
              this.cotizaciones_arr[i] = registro['data'];
            }  
              this.cotizacion_form.emit(this.cotizaciones_arr);
              this.operacion_form.emit('guardar');
              
              this.errors = [];
              this.formCotizacion.reset();
          }else{
              //console.log(registro['data']);
              this.errors = registro['data'];
          }

      }

  
      editarcancelar(){
        this.operacion_form.emit('guardar');
      }

}
