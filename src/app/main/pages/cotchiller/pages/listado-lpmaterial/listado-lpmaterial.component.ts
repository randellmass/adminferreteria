import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


}
