import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilesSubirService } from 'src/app/main/shared/service/files-subir.service';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-archivo-equipos',
  templateUrl: './archivo-equipos.component.html',
  styleUrls: ['./archivo-equipos.component.css']
})
export class ArchivoEquiposComponent implements OnInit {

  equipo:any;
  loading:boolean = true;
  archivos:any=[];
  operacion:string="guardar";
  archivo_id:string;

  constructor(private equiposService:EquiposService,
              private filesSubirService:FilesSubirService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_equipo( params['id']);
      
    })
  }

  async buscar_individual_equipo(equipo_id:number){

    this.loading=true;
      const equipo1 = await this.equiposService.individual_equipos(equipo_id);
       
      //console.log(equipo1['data']);

      this.equipo = equipo1['data'];
      this.archivos = equipo1['data']['files'];
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
