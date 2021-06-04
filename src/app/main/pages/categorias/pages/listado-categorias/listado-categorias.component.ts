import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DataTable } from "simple-datatables";
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-listado-categorias',
  templateUrl: './listado-categorias.component.html',
  styleUrls: ['./listado-categorias.component.css']
})
export class ListadoCategoriasComponent implements OnInit, AfterViewChecked {

      categorias:any = [];
      errors:any=[];
      loading:boolean = false;

      constructor(private categoriasService:CategoriasService) { }

      ngOnInit(): void {
          this.listado_categorias();
      }

      async listado_categorias(){
        this.loading= true;

          const result_categorias = await this.categoriasService.listado_categorias();
          if (result_categorias['res'])
          {
            this.errors="";  
            this.categorias = result_categorias['data'];  
          } else {
            this.errors = result_categorias['mensaje']; 
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
