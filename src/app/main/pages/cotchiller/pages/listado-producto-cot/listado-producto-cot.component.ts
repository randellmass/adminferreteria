import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-listado-producto-cot',
  templateUrl: './listado-producto-cot.component.html',
  styleUrls: ['./listado-producto-cot.component.css']
})
export class ListadoProductoCotComponent implements OnInit {

    equipos:any[]=[];
    loading:boolean = false;
    operacion:string="guardar";
    equipo_id:any;
    
    constructor(private cotproductoService:CotproductoService,
                private router:Router) { }

    ngOnInit(): void {
        this.buscar_individual_equipo();
    }

    async buscar_individual_equipo(){

      this.loading=true;
        const equipo1 = await this.cotproductoService.index();
         
        console.log(equipo1['data']);
  
        this.equipos = equipo1['data'];
      this.loading=false;
      
    }

    editar_producto(producto:any)
    {
      this.operacion = "editar";
      this.equipo_id = producto;

    }

    link_componentes(equipo:any)
    {
          this.router.navigate(['main/cotchiller/componente',equipo['id']]);
    }


}
