import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArchivosTiposService } from '../../pages/archivos-tipos/service/archivos-tipos.service';
import { UsuariosService } from '../../pages/usuarios/services/usuarios.service';
import { FilesSubirService } from '../service/files-subir.service';

@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoComponent implements OnInit {

   @Input() modelo:string;
   @Input() modelo_id:string;
   @Output() archivos_form = new EventEmitter<[]>();
 
  
  form_file:FormGroup = this.fb.group({
    roles: ['',Validators.required],
    archivo_tipo_id: ['',Validators.required],
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    file: ['',[Validators.required]]
  });
  

  file:File;
  roles:any =[];
  archivo_tipos:any =[];
  archivo:any;
  loading:boolean = true;
  errors:any =[];
  archivos:any=[];

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
    this.loading=false;
    
  }

  async agregar_file(){
    if(this.form_file.invalid){
      this.form_file.markAllAsTouched();
      return;
    }

      //subimos la foto
      
      this.archivo = await this.filesSubirService.subir_file(
                                  this.file,
                                  this.modelo,
                                  this.modelo_id,
                                  this.form_file.get('roles').value,
                                  this.form_file.get('archivo_tipo_id').value,
                                  this.form_file.get('nombre').value);
     
     if (this.archivo['res'])
     {
        //console.log(archivo['data']['files']);
        this.archivos = this.archivo['data']['files'];

        this.archivos_form.emit(this.archivos);

        this.file = null;
        this.form_file.reset();
       
     }

     //console.log(archivo['data']);
  }

  file_cargar(file:File)
  {
   
      this.file = file;
 
  }

}
