import { Component, OnInit } from '@angular/core';
import { TercerosService } from '../../services/terceros.service';

@Component({
  selector: 'app-listado-terceros',
  templateUrl: './listado-terceros.component.html',
  styleUrls: ['./listado-terceros.component.css']
})
export class ListadoTercerosComponent implements OnInit {

  errors:any=[];
  loading:boolean = false;
  terceros:any =[];
  tercero_id:any;
  operacion:string="guardar";

  
  constructor(private tercerosService:TercerosService) { }

  ngOnInit(): void {
      this.listado_terceros();
  }


  async listado_terceros(){
    this.loading= true;

      const result_ter = await this.tercerosService.index();
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

}
