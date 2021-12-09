import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-registro',
  templateUrl: './fiesta-registro.component.html',
  styleUrls: ['./fiesta-registro.component.css']
})
export class FiestaRegistroComponent implements OnInit {

    @Input() terceros_array:any[];
    @Output() tercero_nuevo = new EventEmitter<any>();

    formTercero:FormGroup = this.fb.group({
        fiestasucursal_id: ['',[Validators.required]],
        fiestatipo_id: ['',[Validators.required]],
        documento: ['',[Validators.required,Validators.minLength(3)]],
        nombre: ['',[Validators.required,Validators.minLength(3)]],
        documentoDe: [''],
        cupos: [''],
        contacto: [''],
    });

    loading:boolean = false;
    errors:any =[];
    sucursales:any =[];
    tipos:any =[];
    tercero:any;
    
    constructor(private fb:FormBuilder,
                private fiestaService:FiestaService) { }

    ngOnInit(): void {
       this.cargarSelec()
    }

    async cargarSelec()
    {
        this.loading = true;
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

        this.loading = false;
    }

    campoNoValido(campo:string){
      return this.formTercero.controls[campo].touched && this.formTercero.controls[campo].errors;
    }

    async agregar_tercero(){
        if(this.formTercero.invalid){
          this.formTercero.markAllAsTouched();
          return;
        }
      
        this.loading = true;
        const tercero_reg = await this.fiestaService.store(this.formTercero.value);
        if (tercero_reg['res'])
        {
            this.tercero = tercero_reg['data'];
            this.terceros_array.unshift(this.tercero);
            
            this.tercero_nuevo.emit(this.terceros_array);
            this.errors =[];
            this.formTercero.reset();
            this.loading = false;
        }else{
            this.errors = tercero_reg['data'];
            this.loading = false;
        }

  
    }

}
