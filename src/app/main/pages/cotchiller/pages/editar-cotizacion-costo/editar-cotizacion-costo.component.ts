import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotchillerService } from '../../services/cotchiller.service';

@Component({
  selector: 'app-editar-cotizacion-costo',
  templateUrl: './editar-cotizacion-costo.component.html',
  styles: [
  ]
})
export class EditarCotizacionCostoComponent implements OnInit {

    @Input() cotizacion_id:any[];
    @Input() orden_id:any[];
    @Output() cot_form = new EventEmitter<any>();
    
 
    formCosto:FormGroup = this.fb.group({
        mo: ['',Validators.required],
        cif: ['',Validators.required],
        pvp: ['',Validators.required],
    });


    loading:boolean = false;
    errors:any = []; 
    tipoAccesorios:any[]=[];
    equipos:any[]=[];
    
    constructor(private fb:FormBuilder,
                private cotchillerService:CotchillerService) { }

    ngOnInit(): void {
      this.cargar_cotizacion_form();
    }

    cargar_cotizacion_form(){
        this.formCosto.reset({
            ...this.orden_id
        });
    }

    campoNoValido(campo:string){
      return this.formCosto.controls[campo].touched && this.formCosto.controls[campo].errors;
    }

    

    async editarCosto(){

      if(this.formCosto.invalid){
        this.formCosto.markAllAsTouched();
        return;
      }

      const registro = await this.cotchillerService.update_costo(this.orden_id['id'], this.formCosto.value);
      if(registro['res'])
      {
          this.cot_form.emit(this.cotizacion_id['id']);
          this.errors = [];
      }else{
          //console.log(registro['data']);
          this.errors = registro['data'];
      }

    }




}
