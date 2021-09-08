import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-registro-producto-cot',
  templateUrl: './registro-producto-cot.component.html',
  styleUrls: ['./registro-producto-cot.component.css']
})
export class RegistroProductoCotComponent implements OnInit {

    @Input() equipos_arr:any[];
    @Output() equipo_form = new EventEmitter<any>();

 
    form_equipo:FormGroup = this.fb.group({
        cotcapacidad_id: ['',Validators.required],
        cotcircuito_id: ['',Validators.required],
        equipo_id: ['',Validators.required],
        observacion: [''],
    });

    form_buscar_equipo:FormGroup = this.fb.group({
      buscarEquipo : ['',[Validators.required]]
    });

    loading:boolean = false;
    errors:any = []; 
    capacidades:any[]=[];
    circuitos:any[]=[];
    equipos:any[] =[];
  
    constructor(private fb:FormBuilder,
                private cotProductoService:CotproductoService,
                private equiposService:EquiposService) { }

    ngOnInit(): void {
        this.cargar_select();
    }

    campoNoValido(campo:string){
      return this.form_equipo.controls[campo].touched && this.form_equipo.controls[campo].errors;
    }

    async cargar_select()
    {
        this.loading= true;
        const rest_capacidad = await this.cotProductoService.index_capacidades();
        this.capacidades = rest_capacidad['data'];

        const rest_circuito = await this.cotProductoService.index_circuitos();
        this.circuitos = rest_circuito['data'];
        this.loading= false;
    }

    async agregar_equipo(){

      if(this.form_equipo.invalid){
        this.form_equipo.markAllAsTouched();
        return;
      }

      const registro = await this.cotProductoService.store(this.form_equipo.value);
      if(registro['res'])
      {
          this.equipos_arr.push(registro['data']);
          this.equipo_form.emit(this.equipos_arr);
          this.errors = [];
          this.form_equipo.reset();
      }else{
          //console.log(registro['data']);
          this.errors = registro['data'];
      }

    }

    async buscar_equipo()
    {
        this.loading= true;
        const eq = await this.equiposService.buscar_equipo(this.form_buscar_equipo.value);
        this.equipos = eq['data'];
        this.loading= false;
    }


}
