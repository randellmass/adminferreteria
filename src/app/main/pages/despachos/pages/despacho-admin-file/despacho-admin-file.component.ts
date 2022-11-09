import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FilesSubirService } from 'src/app/main/shared/service/files-subir.service';

import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-file',
  templateUrl: './despacho-admin-file.component.html',
  styleUrls: ['./despacho-admin-file.component.css']
})
export class DespachoAdminFileComponent implements OnInit {

  form_file:FormGroup = this.fb.group({
    nombre: ['',[Validators.required,Validators.minLength(3)]],
    file: ['',[Validators.required]]
  });

  file:File;
  pedido:any;
  archivos:any=[];
  operacion:string="guardar";
  loading:boolean = false;
  errors:any =[];


  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private filesSubirService:FilesSubirService,
              private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activatedroute.params.subscribe( params =>{

    
      // this.despacho_id = params['id']
       this.index_pedidos(params['id']);
      // this.index_form();
    });

  }

  campoNoValido(campo:string){
    return this.form_file.controls[campo].touched && this.form_file.controls[campo].errors;
  }

  async index_pedidos(pedido_id:any)
  {
    this.loading = true;

      const listado = await this.despachosService.show_pedidos( pedido_id);
      
      if (listado['res'])
      {
        this.pedido = listado['data'];
        this.archivos = listado['data']['files'];
      } else {  
        this.errors = listado['data'];
        
      }

    this.loading = false;
  }

  async index_form()
  {
    this.loading = true;

    // const listado_pedidos= await this.despachosService.index_pedidos();
    
    // if (listado_pedidos['res'])
    // {
    //     this.pedidos = listado_pedidos['data'];
    //     //console.log(this.turnos);
    // } else {  
    //     this.errors = listado_pedidos['data'];
      
    // }

    // const listado_turnos = await this.despachosService.index_turnos();
    
    // if (listado_turnos['res'])
    // {
    //     this.turnos = listado_turnos['data'];
    //     //console.log(this.turnos);
    // } else {  
    //     this.errors = listado_turnos['data'];
      
    // }

    this.loading = false;
  }

  async agregar_file(){
    if(this.form_file.invalid){
      this.form_file.markAllAsTouched();
      return;
    }

      //subimos la foto
      
       const archivo = await this.filesSubirService.subir_file(
                                  this.file,
                                  'pedido',
                                  this.pedido['id'],
                                  [1],
                                  '1',
                                  this.form_file.get('nombre').value);
     
     if (archivo['res'])
     {
        //console.log(archivo['data']['files']);
        this.archivos = archivo['data']['files'];
        console.log(this.archivos);

        this.file = null;
        this.form_file.reset();
       
     }

     //console.log(archivo['data']);
  }

  file_cargar(file:File)
  {
   
      this.file = file;
 
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


}
