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
          //console.log(cotizacion);
          if(cotizacion['ordenes'].length>0)
          {
            
            PdfMakeWrapper.setFonts(pdfFonts);
            const pdf = new PdfMakeWrapper();
  
            const asesor = (cotizacion['asesor'])?`${cotizacion['asesor']['name']} - ${cotizacion['asesor']['email']}`:'sin Asignar'
       
            pdf.pageMargins([ 25, 25, 25, 25 ]);
            pdf.defaultStyle({
              fontSize: 8
            });
            pdf.add(new Txt('---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------').alignment('center').end);
            pdf.add(new Table([
              [ '',
                [ 
                  new Txt('PRECOTIZACION').bold().end,
                  new Txt(`No. COT-${ cotizacion['id']}`).bold().end
                ]
              ],
              ]).widths([350,'*']).layout('noBorders').end);
            pdf.add(' ');
            pdf.add(' ');
            pdf.add(new Table([
              [ 
                [ 
                  new Txt('NOMBRE:').bold().end,
                  new Txt('NIT/ CC:').bold().end,
                  new Txt('DIRECCION:').bold().end,
                  new Txt('TEL./ CEL.:').bold().end,
                  new Txt('EMAIL:').bold().end,
                ],
                [ 
                  new Txt(cotizacion['tercero_nombre']).end,
                  new Txt(cotizacion['tercero_documento']).end,
                  new Txt(cotizacion['tercero_direccion']).end,
                  new Txt(cotizacion['tercero_celular']).end,
                  new Txt(cotizacion['tercero_email']).end
                ],
                [ 
                  new Txt('FECHA VENCE:').bold().end,
                  new Txt('FORMA PAGO:').bold().end,
                  new Txt('ASESOR:').bold().end,
                ],
                [ 
                  new Txt('0000-00-00').end,
                  new Txt('Por definir').end,
                  new Txt(asesor).end,
                ]
              ]
              ]).widths([55,200,55,'*']).layout('noBorders').end);
  
              pdf.add(' ');
              pdf.add(new Table([
                [ 
                    new Txt('ITEM').bold().end,
                    new Txt('REFERENCIA').bold().end,
                    new Txt('DESCRIPCIÓN').bold().end,
                    new Txt('UM').bold().end,
                    new Txt('CANT').bold().end,
                    new Txt('VALOR BRUTO').bold().end,
                    new Txt('DESCUENTO').bold().end,
                    new Txt('IVA').bold().end
                ],
                ...this.extractDataTabla(cotizacion['ordenes'])
              ]).widths([30,80,150,20,25,80,60,30]).end);
  
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

      }

      extractDataTabla(ordenes:any[])
      {
            return ordenes.map( item => [
                item['producto']['equipo']['codificacion'],
                item['producto']['equipo']['modelo'],
                item['producto']['equipo']['nombre'],
                'UND',
                new Intl.NumberFormat().format(item['cantidad']),
                new Intl.NumberFormat().format(Math.ceil(item['valor_venta'])),
                '0',
                '0',
            ]);
            
      }

}
