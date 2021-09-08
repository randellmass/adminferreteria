import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-registro-lpmaterial',
  templateUrl: './registro-lpmaterial.component.html',
  styleUrls: ['./registro-lpmaterial.component.css']
})
export class RegistroLpmaterialComponent implements OnInit {

      @Input() lpMateriales_arr:any[];
      @Output() lpMaterial_form = new EventEmitter<any>();
  
      formListado:FormGroup = this.fb.group({
          cotcapacidad_id: ['',Validators.required],
          observacion: [''],
      });

      loading:boolean = false;
      errors:any = []; 
      capacidades:any[]=[];
     
      constructor(private fb:FormBuilder,
                  private cotProductoService:CotproductoService,
                  private cotlpmaterialesService:CotlpmaterialesService) { }

      ngOnInit(): void {
          this.cargar_select();
      }

      campoNoValido(campo:string){
        return this.formListado.controls[campo].touched && this.formListado.controls[campo].errors;
      }

      async cargar_select()
      {
          this.loading= true;
            const rest_capacidad = await this.cotProductoService.index_capacidades();
            this.capacidades = rest_capacidad['data'];
          
          this.loading= false;
      }

      async agregarListado(){

        if(this.formListado.invalid){
          this.formListado.markAllAsTouched();
          return;
        }

        const registro = await this.cotlpmaterialesService.store(this.formListado.value);
        if(registro['res'])
        {
            this.lpMateriales_arr.unshift(registro['data']);
            this.lpMaterial_form.emit(this.lpMateriales_arr);
            this.errors = [];
            this.formListado.reset();
        }else{
            //console.log(registro['data']);
            this.errors = registro['data'];
        }

      }


}
