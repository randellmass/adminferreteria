import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdenesService } from '../../services/ordenes.service';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {

    @Input() ordenes_array:any[];
    @Input() orden_id:any[];
    @Input() pedido:any;
    @Output() orden_nuevo = new EventEmitter<any>();
    @Output() operacion_editar = new EventEmitter<any>();

    formOrden:FormGroup = this.fb.group({
        equipo_id: ['',[Validators.required]],
        cantidad: ['',[Validators.required]],
        solidwork: [''],
        op_ensamble:[''],
        op_laminado:[''],
        op_serpertin:[''],
        op_electrica:[''],
        op_refri:[''],
        observacion_interna: [''],
    });


    loading:boolean = false;
    errors:any =[];
    equipos:any[] =[];
    
    constructor(private fb:FormBuilder,
                private ordenesService:OrdenesService) { }

    ngOnInit(): void {
      this.cargar_orden();
    }

    campoNoValido(campo:string){
      return this.formOrden.controls[campo].touched && this.formOrden.controls[campo].errors;
    }

    cargar_orden(){
      this.formOrden.reset({
          ...this.orden_id
      });

  }

    async editar_orden(){
        if(this.formOrden.invalid){
          this.formOrden.markAllAsTouched();
          return;
        }

        this.loading = true;

        const orden_reg = await this.ordenesService.update(this.pedido['id'],this.orden_id['id'],this.formOrden.value);
        if (orden_reg['res'])
        {
           const i = this.ordenes_array.indexOf( this.orden_id );
  
            if ( i !== -1 ) {
              this.ordenes_array[i] = orden_reg['data'];
            }  
              this.orden_nuevo.emit(this.ordenes_array);
              this.operacion_editar.emit('guardar');
              
              this.errors = [];
              this.formOrden.reset();
            this.loading = false;
        }else{
            this.errors = orden_reg['data'];
            this.loading = false;
        }


    }

   cancelar_editar(){
      this.operacion_editar.emit('guardar');
   }
}
