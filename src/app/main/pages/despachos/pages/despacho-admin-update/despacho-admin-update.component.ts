import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-update',
  templateUrl: './despacho-admin-update.component.html',
  styleUrls: ['./despacho-admin-update.component.css']
})
export class DespachoAdminUpdateComponent implements OnInit {

  @Input() despachos_arr:any[];
  @Input() despacho_id:any;
  @Output() despacho_form = new EventEmitter<any>();
  @Output() operacion_editar = new EventEmitter<any>();

  formDespacho:FormGroup = this.fb.group({
    vehiculo_id: ['',[Validators.required]],
    ciudad_id: ['',[Validators.required]],
    conductor_id: ['',[Validators.required]],
    auxiliar: ['',[Validators.required]],
    kilometraje_inicial: ['',[Validators.required]],
    kilometraje_final: ['',[Validators.required]],
    fecha_salida: ['',[Validators.required]],
    fecha_retorno: ['',[Validators.required]],
    despacho_estado_id: ['',[Validators.required]],
  });

   
  despachos:any[];
  ciudades:any[];
  usuarios:any[];
  vehiculos:any[];
  estados:any[];
  operacion:string;
  loading:boolean = false;
  errors:any =[];

  constructor(
        private fb:FormBuilder,
        private despachosService: DespachosService,
        private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.index_despachos();
    this.cargar_despacho();
  }

  campoNoValido(campo:string){
    return this.formDespacho.controls[campo].touched && this.formDespacho.controls[campo].errors;
  }

  async index_despachos()
  {
    this.loading = true;

    const listado = await this.despachosService.index_despachos();
    
    if (listado['res'])
    {
      this.despachos = listado['data'];
      //console.log(this.despachos);
    } else {  
      this.errors = listado['data'];
      
    }

    const vehiculos_result = await this.despachosService.index_vehiculos();
    
    if (vehiculos_result['res'])
    {
      this.vehiculos = vehiculos_result['data'];
      //console.log(this.vehiculos);
    } else {  
      this.errors = vehiculos_result['data'];
      
    }

    const ciudades_result = await this.despachosService.index_ciudades();
    
    if (ciudades_result['res'])
    {
      this.ciudades = ciudades_result['data'];
      //console.log(this.ciudades);
    } else {  
      this.errors = ciudades_result['data'];
      
    }

    const listado_usuarios = await this.usuariosService.listado_Usuarios();
    
    if (listado_usuarios['res'])
    {
        this.usuarios = listado_usuarios['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado_usuarios['data'];
      
    }


  
    const listado_estados = await this.despachosService.index_despacho_estados();
    
    if (listado_estados['res'])
    {
        this.estados = listado_estados['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado_estados['data'];
      
    }
   

    this.loading = false;
  }

  cargar_despacho(){
    this.formDespacho.reset({
        ...this.despacho_id
    });
  }


 cancelar_editar(){
    this.operacion_editar.emit('guardar');
  }

  async editar_despacho()
  {
      if(this.formDespacho.invalid){
        this.formDespacho.markAllAsTouched();
        return;
      }

      this.loading = true;

      const orden_reg = await this.despachosService.update_despachos(this.despacho_id['id'],this.formDespacho.value);
      if (orden_reg['res'])
      {
        const i = this.despachos_arr.indexOf( this.despacho_id );

          if ( i !== -1 ) {
            this.despachos_arr[i] = orden_reg['data'];
          }  
            this.operacion_editar.emit('guardar');
            
            this.errors = [];
            this.formDespacho.reset();
          this.loading = false;
      }else{
          this.errors = orden_reg['data'];
          this.loading = false;
      }


    }

}
