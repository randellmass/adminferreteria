import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos.service';
import { FilesSubirService } from 'src/app/main/shared/service/files-subir.service';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent implements OnInit {

    errors:any=[];
    loading:boolean = false;
    pedido:any;
    pedido_id:any;

    archivos:any=[];
    operacion:string="guardar";
    archivo_id:string;
    
    constructor(private pedidosService:PedidosService,
                private activatedRoute:ActivatedRoute,
                private filesSubirService:FilesSubirService) { }

    ngOnInit(): void {

        this.activatedRoute.params.subscribe( param =>{
            this.cargar_pedido(param['id']);
        });

    }


    async cargar_pedido(pedido_id:any){
      
      this.loading= true;

        const result_pedido = await this.pedidosService.show(pedido_id);
        if (result_pedido['res'])
        {
          this.errors="";  
          this.pedido = result_pedido['data'];  
          this.archivos = result_pedido['data']['archivos']
       
        } else {
          this.errors = result_pedido['data']; 
        }



        this.loading= false; 
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
