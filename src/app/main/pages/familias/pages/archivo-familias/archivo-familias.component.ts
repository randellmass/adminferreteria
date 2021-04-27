import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FamiliasService } from '../../services/familias.service';
import { UsuariosService } from '../../../usuarios/services/usuarios.service';
import { FilesSubirService } from '../../../../shared/service/files-subir.service';

@Component({
  selector: 'app-archivo-familias',
  templateUrl: './archivo-familias.component.html',
  styleUrls: ['./archivo-familias.component.css']
})
export class ArchivoFamiliasComponent implements OnInit {

  form_file:FormGroup = this.fb.group({
    roles: ['',Validators.required],
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    file: ['',[Validators.required]]
  });

  familia:any;
  file:File;
  roles:any =[];
  loading:boolean = true;
  errors:any =[];
  archivos:any=[];

  
  constructor(private fb:FormBuilder,
              private familiaService:FamiliasService,
              private usuariosService:UsuariosService,
              private filesSubirService:FilesSubirService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_familia( params['id']);
      
    })
  }

  campoNoValido(campo:string){
    return this.form_file.controls[campo].touched && this.form_file.controls[campo].errors;
  }

  async buscar_individual_familia(familia_id:number){

    this.loading=true;
      const familia1 = await this.familiaService.individual_familia(familia_id);
      this.roles = await this.usuariosService.listado_roles();
      
      //console.log(familia1['data']);

      this.familia = familia1['data'];
      this.archivos = familia1['data']['files'];
    this.loading=false;
    
  }

  async agregar_file(){
    if(this.form_file.invalid){
      this.form_file.markAllAsTouched();
      return;
    }
    
     //subimos la foto
     const archivo = await this.filesSubirService.subir_file(
                                this.file,
                                'familia',
                                this.familia['id'],
                                this.form_file.get('roles').value,
                                this.form_file.get('nombre').value);
     if (archivo['res'])
     {
        console.log(archivo['data']);
        this.file = null;
        this.form_file.reset();
        this.buscar_individual_familia(this.familia['id']);
       
     }

     //console.log(archivo['data']);
  }

  async eliminar_archivo(archivo:any){
     const eliminar = await this.filesSubirService.eliminar_file(archivo['id']);
     
     if (eliminar['res']) {
       //console.log(eliminar['data']);
        const i = this.archivos.indexOf( archivo );

        
  
        if ( i !== -1 ) {
          this.archivos.splice( i, 1 );
        }

     }
  }

  file_cargar(file:File)
  {
   
    this.file = file;
 
  }


}
