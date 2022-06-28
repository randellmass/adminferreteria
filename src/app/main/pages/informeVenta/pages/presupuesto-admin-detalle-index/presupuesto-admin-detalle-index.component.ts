import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presupuesto-admin-detalle-index',
  templateUrl: './presupuesto-admin-detalle-index.component.html',
  styleUrls: ['./presupuesto-admin-detalle-index.component.css']
})
export class PresupuestoAdminDetalleIndexComponent implements OnInit {

  
  presupuesto_id:any;
  loading:boolean = false;
  errors:any =[];

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe( param =>{
        this.presupuesto_id = param['id'];
    }); 
  }

}
