import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PdfMakeWrapper, Table, Txt  } from "pdfmake-wrapper";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import { CotchillerService } from '../../services/cotchiller.service';
import { CotlpmaterialesService } from '../../services/cotlpmateriales.service';

@Component({
  selector: 'app-listado-cotizacion',
  templateUrl: './listado-cotizacion.component.html',
  styleUrls: ['./listado-cotizacion.component.css']
})
export class ListadoCotizacionComponent implements OnInit {

      cotizaciones:any[]=[];
      loading:boolean = false;
      operacion:string="guardar";
      cotizacion_id:any;


      constructor(private router:Router,
                  private cotClientesService:CotchillerService) { }

      ngOnInit(): void {
          this.buscarcotizaciones();
      }

      async buscarcotizaciones(){

        this.loading=true;
          const result = await this.cotClientesService.index();
          this.cotizaciones = result['data'];
          this.loading=false;
      }

      async editar_cotizacion(cot:any)
      {
          this.operacion = "editar";
          this.cotizacion_id = cot;
      }

      async editar_estado(cot:any)
      {
          this.operacion = "estado";
          this.cotizacion_id = cot;
      }

      link_detalle(cot:any)
      {
          this.router.navigate(['main/cotchiller/detalle',cot['id']]);
      }

      ordenes(cot:any)
      {
          this.router.navigate(['main/cotchiller/orden',cot['id']]);
      }

      pdfcotizacion(cotizacion:any)
      {
          PdfMakeWrapper.setFonts(pdfFonts);
          const pdf = new PdfMakeWrapper();
     
          pdf.pageMargins([ 25, 25, 25, 25 ]);
          pdf.defaultStyle({
            fontSize: 8
          });
          pdf.add(new Txt('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------').alignment('center').end);
          pdf.add(new Table([
            [ '',
              [ 
                new Txt('PRECOTIZACION').bold().end,
                new Txt('No. COT-2021').bold().end
              ]
            ],
            ]).widths([350,'*']).layout('noBorders').end);
          pdf.add(' ');
          pdf.add(' ');
          pdf.add(new Table([
            [ 
              [ 
                new Txt('NOMBRE:').bold().end,
                new Txt('DIRECCION:').bold().end,
                new Txt('CIUDAD:').bold().end,
                new Txt('TEL/CELULAR:').bold().end
              ],
              [ 
                new Txt('Cliente1').end,
                new Txt('Calle30').end,
                new Txt('Barranquilla').end,
                new Txt('3014490363').end
              ],
              [ 
                new Txt('NIT:').bold().end,
                new Txt('CONTACTO:').bold().end,
                new Txt('EMAIL:').bold().end,
              ],
              [ 
                new Txt('8998989').end,
                new Txt('Nombre Contacto').end,
                new Txt('Barranquilla').end,
              ],
              [ 
                new Txt('FECHA VENCE:').bold().end,
                new Txt('FORMA PAGO:').bold().end,
                new Txt('ASESOR:').bold().end,
              ],
              [ 
                new Txt('8998989').end,
                new Txt('Nombre Contacto').end,
                new Txt('Barranquilla').end,
              ]
            ]
            ]).widths([55,120,45,120,55,'*']).layout('noBorders').end);

            pdf.add(' ');
            pdf.add(new Table([
              [ 
                  new Txt('ITEM').bold().end,
                  new Txt('DESCRIPCIÓN').bold().end,
                  new Txt('REFERENCIA').bold().end,
                  new Txt('UM').bold().end,
                  new Txt('CANTIDAD').bold().end,
                  new Txt('VALOR BRUTO').bold().end,
                  new Txt('DESCUENTO').bold().end,
                  new Txt('IVA').bold().end
              ]
            ]).widths('*').end);

          /*pdf.add(' ');
          pdf.add(new Table([
              [ 'Cant.', 'Descripción'],
              ...this.extractDataTabla()
              ]).widths([40,'*']).end);
          pdf.add(' ');
          pdf.add(' ');
          pdf.add(' ');
          pdf.add(' ');
          pdf.add(' ');
          pdf.add(new Txt('---------------------------------------------------------------------------------').alignment('center').end);
          pdf.add(new Txt(`GENERADO: ${usuario.name}`).alignment('center').end);*/

          pdf.create().open();
      }

      extractDataTabla()
      {
         /*   return this.movimientos.map( item => [
                item['cantidad'],
                item['producto_nombre'],
            ]);
            */
      }

}
