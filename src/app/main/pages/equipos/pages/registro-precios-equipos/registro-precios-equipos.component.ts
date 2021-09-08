import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposPreciosService } from '../../services/equipos-precios.service';

@Component({
  selector: 'app-registro-precios-equipos',
  templateUrl: './registro-precios-equipos.component.html',
  styleUrls: ['./registro-precios-equipos.component.css']
})
export class RegistroPreciosEquiposComponent implements OnInit {

    @Input() equipo_id:string;
    @Input() costos_arr:any[];
    @Output() costo_form = new EventEmitter<any>();

 
    form_costo:FormGroup = this.fb.group({
      valor_costo: ['',Validators.required],
      valor_venta: [''],
    });

    loading:boolean = false;
    errors:any = []; 
  
    constructor(private fb:FormBuilder,
                private preciosService:EquiposPreciosService) { }

    ngOnInit(): void {
       
    }

    campoNoValido(campo:string){
      return this.form_costo.controls[campo].touched && this.form_costo.controls[campo].errors;
    }


    async agregar_costo(){

      if(this.form_costo.invalid){
        this.form_costo.markAllAsTouched();
        return;
      }

      const registro = await this.preciosService.store(this.equipo_id,this.form_costo.value);
      if(registro['res']){
        //console.log(registro['data']);
        this.costos_arr.push(registro['data']);
        this.costo_form.emit(this.costos_arr);
        this.errors = [];
        this.form_costo.reset();
      }else{
        //console.log(registro['data']);
        this.errors = registro['data'];
      }

    }


}
