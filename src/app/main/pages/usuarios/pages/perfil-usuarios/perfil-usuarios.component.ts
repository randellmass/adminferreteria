import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ImagesSubirService } from 'src/app/main/shared/service/images-subir.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html',
  styleUrls: ['./perfil-usuarios.component.css']
})
export class PerfilUsuariosComponent implements OnInit {

    form_usuarios:FormGroup;
    roles:any=[];
    errors:any=[];
    user1:any="";
    alert:string ="";

    imgTemp:any= "";
    imagen_servidor:any = null;
    imagenCargar:File = null;
  
    loading:boolean = false;

    constructor(private fb:FormBuilder,
                private usuariosService:UsuariosService,
                private authService:AuthService,
                private router:Router,
                public imagesSubirService:ImagesSubirService) { }

    campoNoValido(campo:string){
      return this.form_usuarios.controls[campo].touched && this.form_usuarios.controls[campo].errors;
    }
  
    ngOnInit(): void {
    
      this.form_usuarios = this.fb.group({
          name:['',[Validators.required,Validators.minLength(3)]],
          email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
          password:['',[Validators.minLength(6)]],
          password_confirmation:['',[Validators.minLength(6)]],
      });

      this.buscar_individual_usuario(this.authService.usuario.id);
  
    }
  
  
    async buscar_individual_usuario(usuario_id:number){
      this.loading = true;
        this.user1 = await this.usuariosService.individual_usuario(usuario_id);
        console.log(this.user1);

        if(this.user1['imagen'])
        {
            this.imagen_servidor = this.user1['imagen'];
        }

        this.loading = false;
      this.valores_formulario();
    }
  
    valores_formulario(){
      this.form_usuarios.reset({
        ...this.user1
      });
  
      this.form_usuarios.get('email').disable();
  
    }
  
    async editar()
    {
        if(this.form_usuarios.invalid){
          this.form_usuarios.markAllAsTouched();
          return;
        }
  
        const editar = await this.usuariosService.editar_usuario_client(this.form_usuarios.value,this.user1.id);
        
        if(!editar['res']){
          //console.log(editar['mensaje'])
          this.errors = editar['data'];
          this.alert = "";
          return;
        }
        
        if(editar['res']){
          
          if(this.imagenCargar)
          {
              const ruta_imagen = await this.imagesSubirService.subir_imagen(this.imagenCargar,'usuario',this.user1.id);
              
              if(ruta_imagen['res']){
                this.imagenCargar=null;
                this.imagesSubirService.imgTemp ="";
                this.imagen_servidor =ruta_imagen['data'];
       
                this.authService.usuario.imagen = ruta_imagen['data'];

              }

          }

          this.form_usuarios.reset();
          this.authService.usuario.name = editar['data']['name'];
          this.user1 = editar['data'];
          this.buscar_individual_usuario(this.authService.usuario.id);

          
          this.errors = [];
          this.alert = "Se edita correctamente ...";

          //console.log(editar['data'])
        }
    }

    file_imagen(file:File){
   
      this.imagenCargar = file;
     
      if(!file){
        return;
      }
  
      this.imagesSubirService.imagen64(file);
  
    }
            
}
