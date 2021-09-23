import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CotchillerService } from '../../services/cotchiller.service';
import { CotproductoService } from '../../services/cotproducto.service';

@Component({
  selector: 'app-editar-cotizacion',
  templateUrl: './editar-cotizacion.component.html',
  styleUrls: ['./editar-cotizacion.component.css']
})
export class EditarCotizacionComponent implements OnInit {

      @Input() cotizacion_id:any;
      @Input() cotizaciones_arr:any[]=[];
      @Output() cotizacion_form = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<any>();

      ValidarEquipo(cotcapacidad_id:any,cotvoltaje_id:any,cotcircuito_id:any,cotproducto_id:any){
        return (formGroup:AbstractControl):ValidationErrors | null =>{

            const capacidadV = formGroup.get(cotcapacidad_id).value;
            const voltajeV = formGroup.get(cotvoltaje_id).value;
            const circuitoV = formGroup.get(cotcircuito_id).value;
            const cotproductoV = formGroup.get(cotproducto_id).value;
         
            if((capacidadV != "") && (circuitoV != ""))
            {
              this.oculto_producto =false;  

              const form = {
                  'cotcapacidad_id':capacidadV,
                  'cotvoltaje_id':voltajeV,
                  'cotcircuito_id':circuitoV
              };
              
              this.buscar_equipos(form);

              if (cotproductoV=="") {
                
                formGroup.get(cotproducto_id).setErrors({cruzar:true});
                return { cruzar:true }
              }else{
                formGroup.get(cotproducto_id).setErrors(null);
              }

            
            }else{
              this.oculto_producto =true;
            }
      
            return null;
        }
    }

    
  
      formCotizacion:FormGroup = this.fb.group({
          tercero_documento:['',Validators.required],
          tercero_nombre:['',Validators.required],
          tercero_direccion:['',Validators.required],
          tercero_email:['',Validators.required],
          tercero_celular:['',Validators.required],
          cotcapacidad_id: ['',Validators.required],
          cotvoltaje_id: ['',Validators.required],
          cotcircuito_id: ['',Validators.required],
          cantidad:['',Validators.required],
          observacion_cliente: [''],
          cotproducto_id: [''],
          compresor_id:['',Validators.required],
          intercambiador_id:['',Validators.required],
      },
        {
            validators:[ this.ValidarEquipo('cotcapacidad_id','cotvoltaje_id','cotcircuito_id','cotproducto_id')]
        }
      );

      loading:boolean = false;
      errors:any = []; 
      capacidades:any[]=[];
      voltajes:any[]=[];
      equipos:any[]=[];
      circuitos:any[]=[];
      compresores:any[]=[];
      compresor_cot:any;
      intercambiadores:any[]=[];
      intercambiador_cot:any;
      oculto_producto:boolean = true;

      constructor(private fb:FormBuilder,
                  private cotProductoService:CotproductoService,
                  private cotClientesService:CotchillerService) { }

      ngOnInit(): void {
          this.cargar_select();
          this.cargar_cotizacion();

          this.formCotizacion.controls['cotproducto_id'].valueChanges.subscribe( equipo =>{
            
         
              if(equipo!="")
              {
                  this.compresor_cot=null;
                  this.intercambiador_cot=null;
                  this.equipos.forEach( item =>{

                      if (item['id'] == equipo) {
                         const result = item['compntes'];

                         this.compresores = result.filter( compnte =>{
                            return compnte['tipo_accesorio']['id']==2
                         });

                         this.intercambiadores = result.filter( compnte =>{
                          return compnte['tipo_accesorio']['id']==3
                        });
                      }

                  })

              }
          });
      }

      campoNoValido(campo:string){
        return this.formCotizacion.controls[campo].touched && this.formCotizacion.controls[campo].errors;
      }

      async cargar_select()
      {
          this.loading= true;
            const rest_capacidad = await this.cotProductoService.index_capacidades();
            this.capacidades = rest_capacidad['data'];

            const rest_circuito = await this.cotProductoService.index_circuitos();
            this.circuitos = rest_circuito['data'];

            const rest_voltaje = await this.cotProductoService.index_voltajes();
            this.voltajes = rest_voltaje['data'];
            
  
          this.loading= false;
      }

      cargar_cotizacion(){
          this.formCotizacion.reset({
              ...this.cotizacion_id
          });

          console.log(this.cotizacion_id);

          this.compresor_cot = this.cotizacion_id['compresor'];
          this.intercambiador_cot = this.cotizacion_id['intercambiador'];

      }

      async editarCotizacion()
      {

          if(this.formCotizacion.invalid){
            this.formCotizacion.markAllAsTouched();
            return;
          }
          

          const registro = await this.cotClientesService.update(this.cotizacion_id['id'],this.formCotizacion.value);
          if(registro['res'])
          {
            const i = this.cotizaciones_arr.indexOf( this.cotizacion_id );
  
            if ( i !== -1 ) {
              this.cotizaciones_arr[i] = registro['data'];
            }  
              this.cotizacion_form.emit(this.cotizaciones_arr);
              this.operacion_form.emit('guardar');
              
              this.errors = [];
              this.formCotizacion.reset();
          }else{
              //console.log(registro['data']);
              this.errors = registro['data'];
          }

      }

      async buscar_equipos(form:any)
      {
      
          //this.loading= true;
          const eq = await this.cotProductoService.buscar_producto_x_capacidad_y_circuito(form);
          if(eq['res']){

              this.equipos = eq['data']
              //console.log(this.equipos);
              if((this.equipos.length ==0) && (this.formCotizacion.controls['cotcapacidad_id'].valid ==true && this.formCotizacion.controls['cotvoltaje_id'].valid ==true && this.formCotizacion.controls['cotcircuito_id'].valid ==true  ) )
              {
                  this.compresores=[];
                  this.intercambiadores=[];
                  this.errors = ['Equipo No Disponible con Capacidad y circuitos seleccionados'];
              }else{
                  this.errors=[];
   
              }
              
          }

          //this.loading= false;
      }

      editarcancelar(){
        this.operacion_form.emit('guardar');
      }

}