import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTable } from 'simple-datatables';

import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-listado-equipos',
  templateUrl: './listado-equipos.component.html'})
  
export class ListadoEquiposComponent implements OnInit {

  equipos:any=[];
  loading:boolean = false;

  form_buscar_equipo:FormGroup = this.fb.group({
     buscarEquipo : ['',[Validators.required]]
  });


  constructor(private equiposService:EquiposService,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.listado();

  }

  async listado(){

    this.loading= true;
    this.equipos = await this.equiposService.listado_equipos();
    this.loading= false;
  }

  async buscar_equipo(){
    this.loading= true;
    const eq = await this.equiposService.buscar_equipo(this.form_buscar_equipo.value);
    this.equipos = eq['data'];
    console.log(eq);
    this.loading= false;
  }

  

}
