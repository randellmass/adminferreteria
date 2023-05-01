import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    file: ['',[Validators.required]]
  });
  

  file:File;
  archivo:any;
  loading:boolean = false;
  errors:any =[];
  archivos:any=[];

  constructor(private fb:FormBuilder,
              private filesSubirService:FilesSubirService) { }

  ngOnInit(): void {
  }

  campoNoValido(campo:string){
    return this.form_file.controls[campo].touched && this.form_file.controls[campo].errors;
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
