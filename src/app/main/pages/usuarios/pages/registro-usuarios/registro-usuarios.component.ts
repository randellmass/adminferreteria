import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { ImagesSubirService } from 'src/app/main/shared/service/images-subir.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent implements OnInit {
  
  form_usuarios:FormGroup;
  roles:any=[];
  errors:any=[];

  imgTemp:any= "";
  imagen:File = null;
  
  constructor(private fb:FormBuilder,
              private usuariosService:UsuariosService,
              private router:Router,
              public imagesSubirService:ImagesSubirService) { }

  campoNoValido(campo:string){
      return this.form_usuarios.controls[campo].touched && this.form_usuarios.controls[campo].errors;
  }

  ngOnInit(): void {

    
    this.form_usuarios = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      rol_id:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
      password_confirmation:['',[Validators.required,Validators.minLength(6)]],
    });

    this.cargar_select_form();
  }

  async cargar_select_form(){

    this.roles = await this.usuariosService.listado_roles();
  }

  async guardar(){
    if(this.form_usuarios.invalid){
      this.form_usuarios.markAllAsTouched();
      return;
    }

    const registro = await this.usuariosService.registrar_usuario(this.form_usuarios.value);
    
    if(!registro['res']){
      //console.log(registro['mensaje'])
      this.errors = registro['mensaje'];
      return;
    }
    
    if(registro['res']){

       //subimos la foto
       if(this.imagen)
       {
          await this.imagesSubirService.subir_imagen(this.imagen,'usuario',registro['data']['id']);
          this.imagesSubirService.imgTemp ="";
       }

      this.form_usuarios.reset();
      this.router.navigateByUrl('main/usuarios');
    }


  }

  file_imagen(file:File)
  {
   
    this.imagen = file;
   
    if(!file){
      return;
    }

    this.imagesSubirService.imagen64(file);

  }

}
