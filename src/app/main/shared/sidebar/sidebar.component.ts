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
               "nombre":"Listado Equipos",
               "url":"/main/dashboard"
            },
            {
               "nombre":"PedidoProduccion",
               "url":"/main/dashboard/pedido"
            },
            {
               "nombre":"InformeVentas",
               "url":"/main/dashboard/informe"
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
            }
          ]
      },
      {
         "categoria":"Produccion",
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
         "categoria":"CotizacionChiller",
         "icon":"mdi mdi-television",
         "enlaces":[
           {
              "nombre":"Cotizaciones",
              "url":"/main/cotchiller/listado"
           },
           {
              "nombre":"Productos",
              "url":"/main/cotchiller/equipos"
           },
           {
               "nombre":"listado Principal",
               "url":"/main/cotchiller/lpmateriales"
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
      {
          "categoria":"Eventos",
          "icon":"mdi mdi-settingst",
          "enlaces":[
            {
               "nombre":"Fiesta",
               "url":"/main/evento/listado"
            },
            {
               "nombre":"Ingreso",
               "url":"/main/evento/ingreso"
            },
          ]
      },
      {
          "categoria":"InformeVentas",
          "icon":"mdi mdi-settingst",
          "enlaces":[
            {
               "nombre":"Informes",
               "url":"/main/informeventas/listado"
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
            },
            {
               "nombre":"InformeVentas",
               "url":"/main/dashboard/informe"
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
            }
          ]
      },
      {
         "categoria":"Produccion",
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
      {
          "categoria":"Eventos",
          "icon":"mdi mdi-settingst",
          "enlaces":[
            {
               "nombre":"Fiesta",
               "url":"/main/evento/listado"
            },
            {
               "nombre":"Ingreso",
               "url":"/main/evento/ingreso"
            },

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
            },
            {
               "nombre":"InformeVentas",
               "url":"/main/dashboard/informe"
            }
          ]
      }
     
    ]; 

    const menu_thumano = [
      {
         "categoria":"Eventos",
         "icon":"mdi mdi-settingst",
         "enlaces":[
           {
              "nombre":"Fiesta",
              "url":"/main/evento/listado"
           },
           {
              "nombre":"Ingreso",
              "url":"/main/evento/ingreso"
           },

         ]
     },
     
    ]; 

    if (rol_id==1) {
      return menu_item_administrador;
    }else if (rol_id==7) {
         return menu_thumano;
    } else if((rol_id!=1) && (rol_id!=3) && (rol_id!=6) && (rol_id!=7)) {
      return menu_item_implementador;
    }else{
      return menu_item_comercial;
    }
    

  }

}
