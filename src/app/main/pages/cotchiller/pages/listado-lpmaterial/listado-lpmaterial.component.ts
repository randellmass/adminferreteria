import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataTable} from "simple-datatables";

import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';

@Component({
  selector: 'app-listado-lpmaterial',
  templateUrl: './listado-lpmaterial.component.html',
  styleUrls: ['./listado-lpmaterial.component.css']
})
export class ListadoLpmaterialComponent implements OnInit {

    lpMateriales:any[]=[];
    loading:boolean = false;
    operacion:string="guardar";
    equipo_id:any;
    
    constructor(private router:Router,
                private cotlpMaterialesService:CotlpmaterialesService) { }

    ngOnInit(): void {
        this.buscarLPMateriales();
    }

    async buscarLPMateriales(){

      this.loading=true;
        const result = await this.cotlpMaterialesService.index();
        this.lpMateriales = result['data'];
      this.loading=false;
      
    }

    buscar_en_listado(termino:string)
    {
        if (termino!="")
        {
            const consulta = this.lpMateriales.find( item =>{
                return item['codigo'] ==termino
            });  

            if(consulta){
               const i = this.lpMateriales.indexOf(consulta);
               if(i !==-1){
                this.lpMateriales.splice( i, 1 );
                this.lpMateriales.unshift(consulta);
                }
              
            }
        }
    }

    /*async editarListado(index:number,item_listado:any,estado_id:any,observacion:any)
    {
        const form_editar ={
          "estado_id":estado_id,
          "observacion":observacion,
        }

        const editar = await this.cotlpMaterialesService.update(item_listado['id'],form_editar,);

        if (editar['res']) {
            this.lpMateriales[index] = editar['data'];
        } else {
           // this.errors= editar['data'];
        }
    }

    link_detalle(listado:any)
    {
        this.router.navigate(['main/cotchiller/lpmaterial-detalle',listado['id']]);
    }*/

    /*ngAfterViewChecked() {
      
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
    }*/

}
