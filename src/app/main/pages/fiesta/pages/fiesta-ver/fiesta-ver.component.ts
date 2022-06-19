import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FiestaService } from '../../services/fiesta.service';

const URL = `http://confortseek.comfortfresh.com/main/evento/qr`;

@Component({
  selector: 'app-fiesta-ver',
  templateUrl: './fiesta-ver.component.html',
  styleUrls: ['./fiesta-ver.component.css']
})
export class FiestaVerComponent implements OnInit {

    errors:any=[];
    loading:boolean = false;
    tercero_id:any;
    myAngularxQrCode:any;

    
    constructor(private fiestaService:FiestaService,
                private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe( param =>{
            this.cargar_tercero(param['id']);
            
        });

    }


    async cargar_tercero(tercero_id:any){
      
      this.loading= true;

        const result_pedido = await this.fiestaService.show(tercero_id);
        if (result_pedido['res'])
        {
          this.errors="";  
          this.tercero_id = result_pedido['data'];  
          //this.myAngularxQrCode = this.tercero_id['invitacion'];
          this.myAngularxQrCode = `${ URL}/${ this.tercero_id['invitacion']}`; 
       
        } else {
          this.errors = result_pedido['data']; 
        }

        this.loading= false; 
    }

}
