import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {DataTable} from "simple-datatables";

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit, AfterViewChecked {

  usuarios:any = [];
  loading:boolean = false;
  
  
  constructor(private usuariosService:UsuariosService)
  {
  
  }

  ngOnInit(): void {

    this.listadoUsuarios();
  
  }

  async listadoUsuarios(){

    this.loading= true;

     this.usuarios = await this.usuariosService.listado_Usuarios();
     //console.log(this.usuarios);

     this.loading=false;
  }

  ngAfterViewChecked() {
    
    if(this.loading==false)
    {
      this.crear_tabla();
      //console.log("after view");
    }
  }

  crear_tabla()
  {
      const dataTable = new DataTable("#order-listing", {
        searchable: true,
        fixedHeight: true, 
        labels: {
          placeholder: "Buscar...",
          perPage: "{select} Cantidad por pagina",
          noRows: "No entries to found",
          info: "Showing {start} to {end} of {rows} entries",
        },
      });
  }

}
