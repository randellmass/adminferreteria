import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesSubirService } from 'src/app/main/shared/service/images-subir.service';

import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  form_usuarios:FormGroup;
  roles:any=[];
  errors:any=[];
  user1:any="";

  imgTemp:any= "";
  imagen_servidor:any = null;
  imagenCargar:File = null;

  loading:boolean = false;

  constructor(private fb:FormBuilder,
              private usuariosService:UsuariosService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              public imagesSubirService:ImagesSubirService) { }

  campoNoValido(campo:string){
    return this.form_usuarios.controls[campo].touched && this.form_usuarios.controls[campo].errors;
  }

  ngOnInit(): void {
  
    this.form_usuarios = this.fb.group({
        name:['',[Validators.required,Validators.minLength(3)]],
        email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
        rol_id:['',[Validators.required]],
        password:['',[Validators.minLength(6)]],
        password_confirmation:['',[Validators.minLength(6)]],
        estado_id:['',[Validators.required]],
    });

    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_usuario( params['id']);
      
    })

    this.cargar_select_form();
  }

  async cargar_select_form()
  {
      this.roles = await this.usuariosService.listado_roles();
  }

  async buscar_individual_usuario(usuario_id:number){

    this.loading = true;
      this.user1 = await this.usuariosService.individual_usuario(usuario_id);
      //console.log(this.user1);
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

      const editar = await this.usuariosService.editar_usuario(this.form_usuarios.value,this.user1.id);
      
      if(!editar['res']){
        //console.log(editar['mensaje'])
        this.errors = editar['mensaje'];
        return;
      }
      
      if(editar['res']){

        if(this.imagenCargar)
        {
          await this.imagesSubirService.subir_imagen(this.imagenCargar,'usuario',this.user1.id);
          this.imagenCargar=null;
          this.imagesSubirService.imgTemp ="";
          this.imagen_servidor =null;
       }

        this.form_usuarios.reset();
        this.router.navigateByUrl('main/usuarios');
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
