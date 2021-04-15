import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FabricantesService } from '../../services/fabricantes.service';
import { DataTable } from 'simple-datatables';

@Component({
  selector: 'app-listado-fabricantes',
  templateUrl: './listado-fabricantes.component.html',
  styleUrls: ['./listado-fabricantes.component.css']
})
export class ListadoFabricantesComponent implements OnInit,AfterViewChecked {

  fabricantes:any[];
  loading:boolean = false;

  constructor(private fabricantesService:FabricantesService) { 
      this.get_fabricantes();
  }


  ngOnInit(): void {
  }

  async get_fabricantes(){
    this.loading= true;
     this.fabricantes = await this.fabricantesService.listado_fabricantes();
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
       new DataTable("#order-listing", {
        searchable: true,
        fixedHeight: true, 
        perPage:5,
        labels: {
          placeholder: "Buscar...",
          perPage: "{select} Cantidad por pagina",
          noRows: "No entries to found",
          info: "Showing {start} to {end} of {rows} entries",
        },
      });
  }

}
