import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { CotchillerService } from '../../services/cotchiller.service';

@Component({
  selector: 'app-editar-cotizacion-estado',
  templateUrl: './editar-cotizacion-estado.component.html',
  styleUrls: ['./editar-cotizacion-estado.component.css']
})
export class EditarCotizacionEstadoComponent implements OnInit {

      @Input() cotizacion_id:any;
      @Input() cotizaciones_arr:any[]=[];
      @Output() cotizacion_form = new EventEmitter<any>();
      @Output() operacion_form = new EventEmitter<any>();

   
      formCotizacion:FormGroup = this.fb.group({
          cotestado_id:['',Validators.required],
          user_asignada:['',Validators.required],
          observacion_asignado:[''],
          observacion_aprobada:[''],
      });

      loading:boolean = false;
      errors:any = []; 
      cotestados:any[]=[];
      usuarios:any[]=[];


      constructor(private fb:FormBuilder,
                  private cotClientesService:CotchillerService,
                  private usuariosService:UsuariosService) { }

      ngOnInit(): void {
          this.cargar_select();
          this.cargar_cotizacion();
      }

      campoNoValido(campo:string){
        return this.formCotizacion.controls[campo].touched && this.formCotizacion.controls[campo].errors;
      }

      async cargar_select()
      {
          this.loading= true;
            const rest_estados = await this.cotClientesService.index_estados_cotizacion()
            if(rest_estados['res']){
              this.cotestados = rest_estados['data'];
            }

            const rest_usuarios = await this.usuariosService.listado_Usuarios();
            this.usuarios = rest_usuarios;
      
          this.loading= false;
      }

      cargar_cotizacion(){
          this.formCotizacion.reset({
              ...this.cotizacion_id
          });

      }

      async editarCotizacion()
      {

          if(this.formCotizacion.invalid){
            this.formCotizacion.markAllAsTouched();
            return;
          }
          

          const registro = await this.cotClientesService.update_estado(this.cotizacion_id['id'],this.formCotizacion.value);
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

      editarcancelar(){
        this.operacion_form.emit('guardar');
      }

}
