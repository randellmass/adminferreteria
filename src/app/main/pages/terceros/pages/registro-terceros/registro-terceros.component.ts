import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TercerosService } from '../../services/terceros.service';

@Component({
  selector: 'app-registro-terceros',
  templateUrl: './registro-terceros.component.html',
  styleUrls: ['./registro-terceros.component.css']
})
export class RegistroTercerosComponent implements OnInit {

    @Input() terceros_array:any[];
    @Output() tercero_nuevo = new EventEmitter<any>();

    formTercero:FormGroup = this.fb.group({
        documento: ['',[Validators.required]],
        nombre: ['',[Validators.required,Validators.minLength(3)]],
        email: [''],
        celular: [''],
    });

    loading:boolean = true;
    errors:any =[];
    tercero:any;
    
    constructor(private fb:FormBuilder,
                private tercerosService:TercerosService) { }

    ngOnInit(): void {
      
    }

    campoNoValido(campo:string){
      return this.formTercero.controls[campo].touched && this.formTercero.controls[campo].errors;
    }

    async agregar_tercero(){
        if(this.formTercero.invalid){
          this.formTercero.markAllAsTouched();
          return;
        }
      
        const tercero_reg = await this.tercerosService.store(this.formTercero.value);
        if (tercero_reg['res'])
        {
            this.tercero = tercero_reg['data'];
            this.terceros_array.unshift(this.tercero);
            
            this.tercero_nuevo.emit(this.terceros_array);
            this.errors =[];
            this.formTercero.reset();
        }else{
            this.errors = tercero_reg['data'];
        }

  
    }

}
