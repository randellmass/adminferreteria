import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CotchillerService } from '../../services/cotchiller.service';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-registro-cotizacion',
  templateUrl: './registro-cotizacion.component.html',
  styleUrls: ['./registro-cotizacion.component.css']
})
export class RegistroCotizacionComponent implements OnInit {

      @Input() cotizaciones_arr:any[]=[];
      @Output() cotizacion_form = new EventEmitter<any>();
    
  
      formCotizacion:FormGroup = this.fb.group({
          tercero_documento:['',Validators.required],
          tercero_nombre:['',Validators.required],
          tercero_direccion:['',Validators.required],
          tercero_email:['',Validators.required],
          tercero_celular:['',Validators.required],
          observacion_cliente: [''],
      });

      loading:boolean = false;
      errors:any = []; 
      capacidades:any[]=[];
      voltajes:any[]=[];
      equipos:any[]=[];
      circuitos:any[]=[];
      compresores:any[]=[];
      intercambiadores:any[]=[];
      oculto_producto:boolean = true;

      constructor(private fb:FormBuilder,
                  private cotProductoService:CotproductoService,
                  private cotClientesService:CotchillerService) { }

      ngOnInit(): void {
      }

      campoNoValido(campo:string){
        return this.formCotizacion.controls[campo].touched && this.formCotizacion.controls[campo].errors;
      }

      async agregarCotizacion(){

        this.loading = true;
        if(this.formCotizacion.invalid){
          this.formCotizacion.markAllAsTouched();
          return;
        }
        
        const registro = await this.cotClientesService.store(this.formCotizacion.value);
        if(registro['res'])
        {
            console.log(registro['data']);
            this.cotizaciones_arr.unshift(registro['data']);
            this.cotizacion_form.emit(this.cotizaciones_arr);
            this.errors = [];
            this.formCotizacion.reset();
        }else{
            //console.log(registro['data']);
            this.errors = registro['data'];
        }
        this.loading = false;

      }
      
}
