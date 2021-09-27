import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';
import { CotproductoService } from '../../services/cotproducto.service';


type AOA = any[][];

@Component({
  selector: 'app-registro-lpmaterial',
  templateUrl: './registro-lpmaterial.component.html',
  styleUrls: ['./registro-lpmaterial.component.css']
})
export class RegistroLpmaterialComponent implements OnInit {

      @Input() lpMateriales_arr:any[];
      @Output() lpMaterial_form = new EventEmitter<any>();
  
      /*formListado:FormGroup = this.fb.group({
          cotcapacidad_id: ['',Validators.required],
          observacion: [''],
      });*/
      

      loading:boolean = false;
      errors:any = []; 
      materiales:any[]=[];
      data: AOA =[];
      lp_form:any[] =[];
     
      constructor(private fb:FormBuilder,
                  private cotProductoService:CotproductoService,
                  private cotlpmaterialesService:CotlpmaterialesService) { }

      ngOnInit(): void {
          this.cargar_select();
      }

      /*campoNoValido(campo:string){
        return this.formListado.controls[campo].touched && this.formListado.controls[campo].errors;
      }*/

      async cargar_select()
      {
          this.loading= true;
            //const rest_capacidad = await this.cotProductoService.index_capacidades();
          
          this.loading= false;
      }

      async cargarexcel(evt:any)
      {
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

          if((data[0][0]!="codigo") || (data[0][1]!="referencia") || (data[0][2]!="descripcion1") || (data[0][3]!="descripcion2") || (data[0][4]!="unidad") || (data[0][5]!="tipo") || (data[0][6]!="inventario") || (data[0][7]!="costo") )
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
                  "referencia": item[1],
                  "descripcion1": item[2],
                  "descripcion2": item[3],
                  "unidad": item[4],
                  "cottipoaccesorio_id": item[5],
                  "inventario": item[6],
                  "costo": item[7],
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
    
              const subir = await this.cotlpmaterialesService.store(form_xls);
              if (subir['res'])
              {
                  this.materiales = subir['data'];
                  this.lpMaterial_form.emit(this.materiales);
              }
    
              this.loading = false;  
          }

          
      }


}
