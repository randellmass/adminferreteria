import { Component, OnInit } from '@angular/core';
import { GruposService } from '../../services/grupos.service';

@Component({
  selector: 'app-listado-grupos',
  templateUrl: './listado-grupos.component.html',
  styleUrls: ['./listado-grupos.component.css']
})
export class ListadoGruposComponent implements OnInit {

  grupos:any =[];

  constructor(private gruposService:GruposService) { }

  ngOnInit(): void {

    this.listado_grupos();

  }

  async listado_grupos(){
      
      this.grupos = await this.gruposService.listado_grupos();

  }

}
