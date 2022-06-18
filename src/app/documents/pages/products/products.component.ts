import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  equipo:any;

  constructor( private documentService:DocumentService,
               private ActivatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe( params => {
      this.show_producto(params['id']);
    } );

  }

  async show_producto(product_id:any){

      const result = await this.documentService.product_show(product_id);
      if (result['res']) {
        this.equipo = result['data'];
        console.log(this.equipo);
        
      }

  }

  

}
