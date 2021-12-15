import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-ingreso',
  templateUrl: './fiesta-ingreso.component.html',
  styleUrls: ['./fiesta-ingreso.component.css']
})
export class FiestaIngresoComponent implements OnInit {

    errors:any=[];
    loading:boolean = false;
    terceros:any =[];
    tercero_id:any;
   
    formBuscar:FormGroup = this.fb.group({
      termino: [''],
    });

    constructor(private fb:FormBuilder,
                private fiestaService:FiestaService,
                private router:Router) { }

    ngOnInit(): void {

        if(this.fiestaService.terceros.length>0){
            this.terceros = this.fiestaService.terceros;
        };
    
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

    async ingreso_tercero(index:any,invitado:any){
      this.loading= true;

      const formEnviar = {
          'fiestaestado_id':4
      }

      const result_pedido = await this.fiestaService.update_qr(invitado['invitacion'],formEnviar);
      if (result_pedido['res'])
      {
        this.errors="";  
        this.terceros[index] = result_pedido['data'];  
     
      } else {
        this.errors = result_pedido['data']; 
      }

      this.loading= false; 
    }


}
