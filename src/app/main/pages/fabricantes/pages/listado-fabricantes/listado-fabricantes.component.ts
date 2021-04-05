import { Component, OnInit } from '@angular/core';
import { FabricantesService } from '../../services/fabricantes.service';

@Component({
  selector: 'app-listado-fabricantes',
  templateUrl: './listado-fabricantes.component.html',
  styleUrls: ['./listado-fabricantes.component.css']
})
export class ListadoFabricantesComponent implements OnInit {

  fabricantes:any[];

  constructor(private fabricantesService:FabricantesService) { 
      this.get_fabricantes();
  }


  ngOnInit(): void {
  }

  async get_fabricantes(){
     this.fabricantes = await this.fabricantesService.listado_fabricantes();

  }

}
