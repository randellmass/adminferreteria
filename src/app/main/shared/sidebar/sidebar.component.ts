import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {

  usuario:any = {};
  menu:any[];

  constructor(private authService:AuthService,
               private router:Router) { }

  ngOnInit(): void {

    this.usuario = this.authService.usuario;
    this.menu = this.cargar_menu(this.authService.usuario.rol_id);
    //console.log(this.menu);
  }

   async logout(){
      const cerrar = await this.authService.salir_usuario();
      
      if(cerrar){
      this.router.navigateByUrl('/auth');
   
      }

   }

  cargar_menu(rol_id:number){

    const menu_item_administrador = [
      {
          "categoria":"Dashboard",
          "icon":"mdi mdi-television",
          "enlaces":[
            {
               "nombre":"Pedidos",
               "url":"/main/dashboard/pedido"
            },
          ]
      },
      {
         "categoria":"Operaciones",
         "icon":"mdi mdi-television",
         "enlaces":[
            {
               "nombre":"Terceros",
               "url":"/main/tercero"
            },
            {
               "nombre":"Pedidos",
               "url":"/main/pedidos"
            },
            {
               "nombre":"Informe",
               "url":"/main/pedidos/informe"
            }
         ]
      },
      {
          "categoria":"Tablas-Maestras",
          "icon":"mdi mdi-settingst",
          "enlaces":[
            {
               "nombre":"Usuarios",
               "url":"/main/usuarios"
            },
            {
               "nombre":"Bodegas",
               "url":"/main/bodegas"
            },
          ]
      },
   
    ]; 

    const menu_item_implementador = [
      {
          "categoria":"Dashboard",
          "icon":"mdi mdi-television",
          "enlaces":[
            {
               "nombre":"Pedidos",
               "url":"/main/dashboard/pedido"
            },
          ]
      },
      {
         "categoria":"Operaciones",
         "icon":"mdi mdi-television",
         "enlaces":[
            {
               "nombre":"Terceros",
               "url":"/main/tercero"
            },
            {
               "nombre":"Pedidos",
               "url":"/main/pedidos"
            },
            {
               "nombre":"Informe",
               "url":"/main/pedidos/informe"
            }
         ]
      },

    ]; 

    const menu_item_comercial = [
      {
          "categoria":"Dashboard",
          "icon":"mdi mdi-television",
          "enlaces":[
            {
               "nombre":"Pedidos",
               "url":"/main/dashboard/pedido"
            },
          ]
      }
     
    ]; 



    if (rol_id==1) {
      return menu_item_administrador;
    } else if((rol_id!=1) && (rol_id!=3) && (rol_id!=6) && (rol_id!=7)) {
      return menu_item_implementador;
    }else{
      return menu_item_comercial;
    }
    

  }

}
