import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArchivosTiposService } from '../../pages/archivos-tipos/service/archivos-tipos.service';
import { UsuariosService } from '../../pages/usuarios/services/usuarios.service';
import { FilesSubirService } from '../service/files-subir.service';

@Component({
  selector: 'app-editar-archivo',
  templateUrl: './editar-archivo.component.html',
  styleUrls: ['./editar-archivo.component.css']
})
export class EditarArchivoComponent implements OnInit {

  @Input() modelo:string;
  @Input() modelo_id:string;
  @Input() archivo_id:string;
  @Output() archivos_form = new EventEmitter<[]>();
  @Output() operacion_form = new EventEmitter<string>();

    form_file:FormGroup = this.fb.group({
      roles: ['',Validators.required],
      archivo_tipo_id: ['',Validators.required],
      nombre: ['',[Validators.required,Validators.minLength(3)]],
    });

    roles:any =[];
    archivo_tipos:any =[];
    loading:boolean = true;
    errors:any =[];
    archivos:any=[];
    archivo_editar:any=[];

    constructor(private fb:FormBuilder,
              private usuariosService:UsuariosService,
              private filesSubirService:FilesSubirService,
              private archivosTiposService:ArchivosTiposService) { }

    ngOnInit(): void {
      this.cargarSelectInicial();

    }
  
    campoNoValido(campo:string){
      return this.form_file.controls[campo].touched && this.form_file.controls[campo].errors;
    }
  
    async cargarSelectInicial(){
  
      this.loading=true;
        this.roles = await this.usuariosService.listado_roles();
        const FileTypes = await this.archivosTiposService.listado_archivo_tipos();
        this.archivo_tipos = FileTypes['data'];

        this.archivo_editar = await this.filesSubirService.ver_file(this.modelo,this.modelo_id,this.archivo_id);
        const permisos = this.archivo_editar['data']['permisos'].map( (rol_id:any) => parseInt(rol_id));
        this.cargar_form_data(permisos);
      this.loading=false;
      
    }

    cargar_form_data(permisos:any){
       this.form_file.reset({
           roles:permisos,
           archivo_tipo_id:this.archivo_editar['data']['file_type_id'],
           nombre:this.archivo_editar['data']['nombre']}
       );
    }
  
    async editar_file(){
      if(this.form_file.invalid){
        this.form_file.markAllAsTouched();
        return;
      }
      
      const editar = await this.filesSubirService.editar_file(
                                                              this.modelo,
                                                              this.modelo_id,
                                                              this.archivo_id,
                                                              this.form_file.get('roles').value,
                                                              this.form_file.get('archivo_tipo_id').value,
                                                              this.form_file.get('nombre').value)
        
        if (editar['res'])
        {
            //console.log(archivo['data']['files']);
            this.archivos = editar['data']['files'];
    
            this.archivos_form.emit(this.archivos);
            this.operacion_form.emit("guardar");
    
            this.form_file.reset();
          
        }
      
        //console.log(archivo['data']);
    }

    cancelar_editar(){
        this.operacion_form.emit("guardar");
    }

}
