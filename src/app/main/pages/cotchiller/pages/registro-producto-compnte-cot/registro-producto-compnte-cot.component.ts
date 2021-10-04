import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';

import { EquiposService } from '../../../equipos/services/equipos.service';
import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';
import { CotproductoService } from '../../services/cotproducto.service';

type AOA = any[][];

@Component({
  selector: 'app-registro-producto-compnte-cot',
  templateUrl: './registro-producto-compnte-cot.component.html',
  styleUrls: ['./registro-producto-compnte-cot.component.css']
})
export class RegistroProductoCompnteCotComponent implements OnInit {

    @Input() producto_id:any[];
    @Input() compntes_arr:any[];
    @Output() compnte_form = new EventEmitter<any>();

 
    form_compnte:FormGroup = this.fb.group({
        cottipoaccesorio_id: ['',Validators.required],
        cotlmaster_id: ['',Validators.required],
        cantidad: ['',Validators.required],
    });

    form_buscar_equipo:FormGroup = this.fb.group({
      buscar_lm : ['',[Validators.required]]
    });

    loading:boolean = false;
    errors:any = []; 
    tipoAccesorios:any[]=[];
    equipos:any[]=[];
    data: AOA =[];
    lp_form:any[] =[];
    
    constructor(private fb:FormBuilder,
                private cotListadomasterService:CotlpmaterialesService,
                private cotProductoService:CotproductoService,
                private equiposService:EquiposService) { }

    ngOnInit(): void {
        this.cargar_select();
    }

    campoNoValido(campo:string){
      return this.form_compnte.controls[campo].touched && this.form_compnte.controls[campo].errors;
    }

    async cargar_select()
    {
        this.loading= true;
        const rest_tipoaccesorio = await this.cotProductoService.index_tipo_accesorios();
        this.tipoAccesorios = rest_tipoaccesorio['data'];

        this.loading= false;
    }

    async agregar_compnte(){

      if(this.form_compnte.invalid){
        this.form_compnte.markAllAsTouched();
        return;
      }

      const registro = await this.cotProductoService.store_producto_compnte(this.producto_id['id'], this.form_compnte.value);
      if(registro['res'])
      {
          console.log(registro['data']);
          this.compntes_arr.push(registro['data']);
          this.compnte_form.emit(this.compntes_arr);
          this.errors = [];
          this.form_compnte.reset();
      }else{
          //console.log(registro['data']);
          this.errors = registro['data'];
      }

    }

    async buscar_equipo()
    {
        this.loading= true;
        const eq = await this.cotListadomasterService.buscar_producto_listado_master(this.form_buscar_equipo.value);

        this.equipos = eq['data'];
        this.loading= false;
    }

    async cargarexcel(evt:any)
      {
          this.errors =[];
          this.loading = true;   
          const target: DataTransfer = <DataTransfer>(evt.target);
          const tipoFile = evt.target.files[0].type;
      
          if (tipoFile != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
          {
              this.errors = ['Archivo no compatible - verifique'];
              this.loading = false;  
              return false;
          }
            
            if (target.files.length !== 1) throw new Error('Cannot use multiple files');
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
              /* read workbook */
              const bstr: string = e.target.result;
              const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      
              /* grab first sheet */
              const wsname: string = wb.SheetNames[0];
              const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      
              /* save data */
              this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
              this.subirData(this.data);
              
            };
            reader.readAsBinaryString(target.files[0]);
          
      }


      async subirData(data:any[])
      {
          this.loading = true;  
          let sw:number=0;

          if((data[0][0]!="codigo") || (data[0][1]!="cantidad") )
          {
               this.errors = ['Archivo no tiene la estructura - verifique'];
               this.loading = false;  
               sw=1;
               return false;
               
          }
          
          data.forEach((item:any,indice:number) =>{
            if ((indice!=0) && (sw==0) )
            {
          
                const item_var = {
                  "codigo": item[0],
                  "cantidad": item[1],
               }
    
                this.lp_form.push(item_var);
            }
          });

          //console.log(this.lp_form);
          if(sw==0)
          {

              const form_xls = {
                "array_compntes": this.lp_form
              }
    
              const subir = await this.cotProductoService.store_producto_compnte_xls(this.producto_id['id'],form_xls);
              if (subir['res'])
              {
                  this.compntes_arr = subir['data'];
                  this.compnte_form.emit(this.compntes_arr);
              }
    
              this.loading = false;  
          }

          
      }


}
