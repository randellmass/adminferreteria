import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DataTable } from 'simple-datatables';

import { FamiliasService } from '../../services/familias.service';

@Component({
  selector: 'app-listado-familias',
  templateUrl: './listado-familias.component.html',
  styleUrls: ['./listado-familias.component.css']
})
export class ListadoFamiliasComponent implements OnInit, AfterViewChecked {

  familias:any = [];
  errors:any=[];
  loading:boolean = false;

  constructor( private familiasService:FamiliasService) { }

  ngOnInit(): void {
      this.listado_familias();
  }

  async listado_familias(){
    this.loading= true;

      const result_familias = await this.familiasService.listado_familias();
      if (result_familias['res'])
      {
        this.errors="";  
        this.familias = result_familias['data'];  

        //console.log(this.familias);
      } else {
        this.errors = result_familias['mensaje']; 
      }

      this.loading= false; 
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
        fixedHeight: false, 
        labels: {
          placeholder: "Buscar...",
          perPage: "{select} Cantidad por pagina",
          noRows: "No entries to found",
          info: "Showing {start} to {end} of {rows} entries",
        },
      });
  }
}
