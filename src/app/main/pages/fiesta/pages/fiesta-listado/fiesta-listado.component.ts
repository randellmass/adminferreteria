import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    tercero_id:any;
    operacion:string="guardar";

    formBuscar:FormGroup = this.fb.group({
      termino: [''],
    });

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

        this.loading= false; 
    }

    editar_tercero(tercero:any){
        this.operacion = "editar";
        this.tercero_id = tercero;

    }

    ver_tercero(tercero:any){
      this.router.navigate(['main/evento/ver/',tercero['id']]);
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

}
