import { Component, OnInit, } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-equipos',
  templateUrl: './listado-equipos.component.html',
  styleUrls: ['./listado-equipos.component.css']
})
export class ListadoEquiposComponent implements OnInit {

  equipos:any=[]

  form_buscar_equipo:FormGroup = this.fb.group({
     buscarEquipo : ['',[Validators.required]]
  });


  constructor(private equiposService:EquiposService,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.listado();

  }

  async listado(){

    this.equipos = await this.equiposService.listado_equipos();
  }

  async buscar_equipo(){
    console.log(this.form_buscar_equipo.value);
    const eq = await this.equiposService.buscar_equipo(this.form_buscar_equipo.value);
    this.equipos = eq['data'];
  }

}
