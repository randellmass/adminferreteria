import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DespachosService } from '../../services/despachos.service';

@Component({
  selector: 'app-despacho-admin-index',
  templateUrl: './despacho-admin-index.component.html',
  styleUrls: ['./despacho-admin-index.component.css']
})
export class DespachoAdminIndexComponent implements OnInit {

  formAnalisis:FormGroup = this.fb.group({
    infor_v_analisi_id: ['',[Validators.required]],
    cliente_nombre: ['',[Validators.required]],
    documento: ['',[Validators.required]],
    telefono: ['',[Validators.required]],
    valor: ['',[Validators.required]],
    comentarios: [''],
  });
  
  despachos:any[];
  conceptos:any[];
  loading:boolean = false;
  errors:any =[];

  constructor(private fb:FormBuilder,
              private despachosService: DespachosService,
              private router:Router) { }

  ngOnInit(): void {
    this.index_despachos();
  }

  async index_despachos()
  {
    this.loading = true;

    const listado = await this.despachosService.index_despachos();
    
    if (listado['res'])
    {
      this.despachos = listado['data'];
      console.log(this.despachos);
    } else {  
      this.errors = listado['data'];
      
    }

    this.loading = false;
  }

  despacho_detalle(despacho_id:any){
    this.router.navigateByUrl(`main/despachos/detalle/${despacho_id}`);
  }

}
