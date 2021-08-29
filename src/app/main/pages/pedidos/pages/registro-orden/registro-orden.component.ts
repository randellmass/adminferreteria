import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { OrdenesService } from '../../services/ordenes.service';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-registro-orden',
  templateUrl: './registro-orden.component.html',
  styleUrls: ['./registro-orden.component.css']
})
export class RegistroOrdenComponent implements OnInit {

    @Input() ordenes_array:any[];
    @Input() pedido:any;
    @Output() orden_nuevo = new EventEmitter<any>();

    formOrden:FormGroup = this.fb.group({
        equipo_id: ['',[Validators.required]],
        cantidad: ['',[Validators.required]],
        solidwork: [''],
        observacion: [''],
    });

    form_buscar_equipo:FormGroup = this.fb.group({
      buscarEquipo : ['',[Validators.required]]
    });


    loading:boolean = true;
    errors:any =[];
    equipos:any[] =[];
    
    constructor(private fb:FormBuilder,
                private ordenesService:OrdenesService,
                private equiposService:EquiposService) { }

    ngOnInit(): void {
    
    }

    campoNoValido(campo:string){
      return this.formOrden.controls[campo].touched && this.formOrden.controls[campo].errors;
    }

    async agregar_orden(){
        if(this.formOrden.invalid){
          this.formOrden.markAllAsTouched();
          return;
        }

        const orden_reg = await this.ordenesService.store(this.pedido['id'],this.formOrden.value);
        if (orden_reg['res'])
        {
            this.ordenes_array.unshift(orden_reg['data']);
            
            this.orden_nuevo.emit(this.ordenes_array);
            this.errors =[];
            this.formOrden.reset();
        }else{
            this.errors = orden_reg['data'];
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
