import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-almacen-index',
  templateUrl: './almacen-index.component.html',
  styleUrls: ['./almacen-index.component.css']
})
export class AlmacenIndexComponent implements OnInit {

  almacenes:any =[];
  loading:boolean = false;
  errors:any =[];

  constructor( private almacenService: AlmacenService,
               private router:Router) { }

  ngOnInit(): void {
    this.index_almacenes();
  }


  async index_almacenes()
  {
    this.loading = true;

    const listado = await this.almacenService.index_almacenes();
    
    if (listado['res'])
    {
        this.almacenes = listado['data'];
        //console.log(this.almacenes);
    } else {  
        this.errors = listado['data'];
      
    }

    this.loading = false;
  }

  usuarios_bodega(bodega:any)
  {
      this.router.navigateByUrl(`main/bodegas/usuarios/${ bodega }`);
  }

}
