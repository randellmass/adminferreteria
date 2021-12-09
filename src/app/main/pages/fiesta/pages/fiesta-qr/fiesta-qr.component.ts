import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-qr',
  templateUrl: './fiesta-qr.component.html',
  styleUrls: ['./fiesta-qr.component.css']
})
export class FiestaQrComponent implements OnInit {

  errors:any=[];
  loading:boolean = false;
  tercero_id:any;
  
  constructor(private fiestaService:FiestaService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

      this.activatedRoute.params.subscribe( param =>{
          this.cargar_tercero(param['id']);
          
      });

  }


  async cargar_tercero(tercero_id:any){
    
    this.loading= true;

      const result_pedido = await this.fiestaService.show_qr(tercero_id);
      if (result_pedido['res'])
      {
        this.errors="";  
        this.tercero_id = result_pedido['data'];  
     
      } else {
        this.errors = result_pedido['data']; 
      }

      this.loading= false; 
  }

  async ingreso(invitado:any){

      this.loading= true;

      const formEnviar = {
          'fiestaestado_id':4
      }

      const result_pedido = await this.fiestaService.update_qr(invitado['invitacion'],formEnviar);
      if (result_pedido['res'])
      {
        this.errors="";  
        this.tercero_id = result_pedido['data'];  
     
      } else {
        this.errors = result_pedido['data']; 
      }

      this.loading= false; 

  }

}
