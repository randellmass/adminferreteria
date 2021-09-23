import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../../equipos/services/equipos.service';
import { CotchillerService } from '../../services/cotchiller.service';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-registro-cotizacion-detalle',
  templateUrl: './registro-cotizacion-detalle.component.html',
  styleUrls: ['./registro-cotizacion-detalle.component.css']
})
export class RegistroCotizacionDetalleComponent implements OnInit {

    @Input() cotizacion_id:any[];
    @Input() materiales_arr:any[];
    @Output() material_form = new EventEmitter<any>();
    @Output() cot_form = new EventEmitter<any>();
  
 
    form_compnte:FormGroup = this.fb.group({
        cottipoaccesorio_id: ['',Validators.required],
        equipo_id: ['',Validators.required],
        cantidad: ['',Validators.required],
    });

    form_buscar_equipo:FormGroup = this.fb.group({
      buscarEquipo : ['',[Validators.required]]
    });

    loading:boolean = false;
    errors:any = []; 
    tipoAccesorios:any[]=[];
    equipos:any[]=[];
    
    constructor(private fb:FormBuilder,
                private cotProductoService:CotproductoService,
                private cotchillerService:CotchillerService,
                private equiposService:EquiposService) { }

    ngOnInit(): void {
        this.cargar_select();
    }

    campoNoValido(campo:string){
      return this.form_compnte.controls[campo].touched && this.form_compnte.controls[campo].errors;
    }

    async cargar_select()
    {
        this.loading= true;
        const rest_tipoaccesorio = await this.cotProductoService.index_tipo_accesorios();
        this.tipoAccesorios = rest_tipoaccesorio['data'];

        this.loading= false;
    }

    async agregar_compnte(){

      if(this.form_compnte.invalid){
        this.form_compnte.markAllAsTouched();
        return;
      }

      const registro = await this.cotchillerService.store_detalle_cotizacion(this.cotizacion_id['id'], this.form_compnte.value);
      if(registro['res'])
      {
          const result_cot = await this.cotchillerService.show(this.cotizacion_id['id']);
          if(result_cot['res'])
          {
               const cot = result_cot['data'];
               this.cot_form.emit(this.cotizacion_id['id']);
          }
        
          this.materiales_arr.push(registro['data']);
          this.material_form.emit(this.materiales_arr);
          this.errors = [];
          this.form_compnte.reset();
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