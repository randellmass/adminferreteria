import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FamiliasService } from '../../services/familias.service';
import { FilesSubirService } from '../../../../shared/service/files-subir.service';

@Component({
  selector: 'app-archivo-familias',
  templateUrl: './archivo-familias.component.html',
  styleUrls: ['./archivo-familias.component.css']
})
export class ArchivoFamiliasComponent implements OnInit {


  familia:any;
  loading:boolean = true;
  archivos:any=[];
  operacion:string="guardar";
  archivo_id:string;

  
  constructor(private familiaService:FamiliasService,
              private filesSubirService:FilesSubirService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_familia( params['id']);
      
    })
  }

 
  async buscar_individual_familia(familia_id:number){

    this.loading=true;
      const familia1 = await this.familiaService.individual_familia(familia_id);
       
      //console.log(familia1['data']);

      this.familia = familia1['data'];
      this.archivos = familia1['data']['files'];
    this.loading=false;
    
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

  
  editar_archivo(archivo:any)
  {
      this.operacion = "editar";
      this.archivo_id= archivo;
  }


}
