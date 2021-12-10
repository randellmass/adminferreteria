import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-registro',
  templateUrl: './fiesta-registro.component.html',
  styleUrls: ['./fiesta-registro.component.css']
})
export class FiestaRegistroComponent implements OnInit {

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
    terceros_array:any[];
    
    constructor(private fb:FormBuilder,
                private fiestaService:FiestaService,
                private router:Router) { }

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

        const result_terceros= await this.fiestaService.search_terceros_todos();
        if (result_terceros['res'])
        {
            this.terceros_array = result_terceros['data'];
        } else {
            this.errors = result_terceros['data'];
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
            this.loading = false;
            this.router.navigate(['main/evento/listado']);
        }else{
            this.errors = tercero_reg['data'];
            this.loading = false;
        }

  
    }

}
