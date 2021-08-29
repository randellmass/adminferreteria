import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {

  usuario:any = {};
  menu:any[];

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.usuario = this.authService.usuario;
    this.menu = this.cargar_menu(this.authService.usuario.rol_id);
    //console.log(this.menu);
  }

  cargar_menu(rol_id:number){

    const menu_item_administrador = [
      {
          "categoria":"Dashboard",
          "icon":"mdi mdi-television",
          "enlaces":[
            {
               "nombre":"Listado Equipos",
               "url":"/main/dashboard"
            },
            {
               "nombre":"PedidoProduccion",
               "url":"/main/dashboard/pedido"
            }
          ]
      },
      {
          "categoria":"Operaciones",
          "icon":"mdi mdi-cast",
          "enlaces":[
            {
               "nombre":"Equipos",
               "url":"/main/equipos"
            },
            {
               "nombre":"Categorias",
               "url":"/main/categorias"
            },
            {
               "nombre":"Terceros",
               "url":"/main/tercero"
            },
            {
               "nombre":"Pedidos",
               "url":"/main/pedidos"
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
               "nombre":"Fabricantes",
               "url":"/main/fabricantes"
            },
            {
               "nombre":"Grupos",
               "url":"/main/grupos"
            },
            {
               "nombre":"Familias",
               "url":"/main/familias"
            },
            {
               "nombre":"Caracteristicas equipos",
               "url":"/main/caracteristicas"
            },
            {
               "nombre":"Tipo Unidades",
               "url":"/main/unidades"
            }
          ]
      },

    ]; 

    const menu_item_implementador = [
      {
          "categoria":"Dashboard",
          "icon":"mdi mdi-television",
          "enlaces":[
            {
               "nombre":"Listado Equipos",
               "url":"/main/dashboard"
            },
            {
               "nombre":"PedidoProduccion",
               "url":"/main/dashboard/pedido"
            }
          ]
      },
      {
          "categoria":"Operaciones",
          "icon":"mdi mdi-cast",
          "enlaces":[
            {
               "nombre":"Equipos",
               "url":"/main/equipos"
            },
            {
               "nombre":"Categorias",
               "url":"/main/categorias"
            },
            {
               "nombre":"Terceros",
               "url":"/main/tercero"
            },
            {
               "nombre":"Pedidos",
               "url":"/main/pedidos"
            }
          ]
      },
      {
          "categoria":"Tablas-Maestras",
          "icon":"mdi mdi-settingst",
          "enlaces":[
            {
               "nombre":"Fabricantes",
               "url":"/main/fabricantes"
            },
            {
               "nombre":"Familias",
               "url":"/main/familias"
            },
            {
               "nombre":"Caracteristicas equipos",
               "url":"/main/caracteristicas"
            },
            {
               "nombre":"Tipo Unidades",
               "url":"/main/unidades"
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
               "nombre":"Listado Equipos",
               "url":"/main/dashboard"
            },
            {
               "nombre":"PedidoProduccion",
               "url":"/main/dashboard/pedido"
            }
          ]
      }
     
    ]; 

    if (rol_id==1) {
      return menu_item_administrador;
    } else if((rol_id!=1) && (rol_id!=3) && (rol_id!=6)) {
      return menu_item_implementador;
    }else{
      return menu_item_comercial;
    }
    

  }

}
