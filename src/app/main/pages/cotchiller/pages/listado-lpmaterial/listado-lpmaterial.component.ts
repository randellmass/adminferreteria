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

    editar_producto(producto:any)
    {
      this.operacion = "editar";
      this.equipo_id = producto;

    }

    link_componentes(equipo:any)
    {
        //this.router.navigate(['main/cotchiller/componente',equipo['id']]);
    }


}
