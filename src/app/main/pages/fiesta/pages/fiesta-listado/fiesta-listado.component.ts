import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators'

import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-listado',
  templateUrl: './fiesta-listado.component.html',
  styleUrls: ['./fiesta-listado.component.css']
})
export class FiestaListadoComponent implements OnInit {

    errors:any=[];
    loading:boolean = false;
    terceros:any =[];
    sucursales:any =[];
    tercero_id:any;
    operacion:string="guardar";

    formBuscar:FormGroup = this.fb.group({
      termino: [''],
    });

    sucursal = new FormControl();

    constructor(private fb:FormBuilder,
                private fiestaService:FiestaService,
                private router:Router) { }

    ngOnInit(): void {
        this.listado_terceros();

        this.formBuscar.get('termino').valueChanges
        .pipe(
           debounceTime(500)
        )
        .subscribe( v =>{
           if (v.length>0) {
              this.buscar_tercero();
           }
        });

        this.sucursal.valueChanges.subscribe( v=>{
          if (v.length>0) 
          { 
            this.buscar_x_sucursal(v);
          }
        });
    }


    async listado_terceros(){
      this.loading= true;

        const result_ter = await this.fiestaService.index();
        if (result_ter['res'])
        {
          this.errors="";  
          this.terceros = result_ter['data'];  
        } else {
          this.errors = result_ter['data']; 
        }

        const result_sucursales = await this.fiestaService.index_sucursales();
        if (result_sucursales['res'])
        {
            this.sucursales = result_sucursales['data'];
        } else {
            this.errors = result_sucursales['data'];
        }

        this.loading= false; 
    }


    ver_qr(tercero:any){
      this.router.navigate(['main/evento/qr/',tercero['invitacion']]);
    }

    async buscar_tercero(){
      this.loading= true;

      const result_ter = await this.fiestaService.search_tercero(this.formBuscar.value);
      if (result_ter['res'])
      {
        this.errors="";  
        this.terceros = result_ter['data'];  
      } else {
        this.errors = result_ter['data']; 
      }

      this.loading= false; 
    }

    async buscar_x_sucursal(sucursal_id:any){
      this.loading= true;

      const formEnviar ={
          'fiestasucursal_id':sucursal_id
      }

      const result_ter = await this.fiestaService.search_x_sucursal(formEnviar);
      if (result_ter['res'])
      {
        this.errors="";  
        this.terceros = result_ter['data'];  
      } else {
        this.errors = result_ter['data']; 
      }

      this.loading= false; 
    }

}
