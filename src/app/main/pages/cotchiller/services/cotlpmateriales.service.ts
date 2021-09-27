import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class CotlpmaterialesService {

  
    constructor(private http:HttpClient,
                private authService:AuthService) { }
      
    index()
    {
                 
          return new Promise<any>( resolve =>{
            
            const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
            });
      
            this.http.get(`${ URL}/cot_listado_master`,{ headers })
            .subscribe( resp =>{
              
                if(resp['res'])
                {
                    resolve(
                      {
                        res:true,
                        data: resp['data']
                      }
                    );
                }else{
                    resolve(
                      {
                        res:false,
                        data: resp['mensaje']
                      }
                    );
                }
            
              });
      
            }); 
      
    } 

    show(listado_id:any)
    {
                 
          return new Promise<any>( resolve =>{
            
            const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
            });
      
            this.http.get(`${ URL}/cot_lp_capacidades/${ listado_id }`,{ headers })
            .subscribe( resp =>{
              
                if(resp['res'])
                {
                    resolve(
                      {
                        res:true,
                        data: resp['data']
                      }
                    );
                }else{
                    resolve(
                      {
                        res:false,
                        data: resp['mensaje']
                      }
                    );
                }
            
              });
      
            }); 
      
    }

    store(listado:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_listado_master`, listado ,{ headers })
                .subscribe( resp =>{

                      if(resp['res'])
                      {
                          resolve(
                          {
                            res:true,
                            data:resp['data']
                          });
                      }else{
                          resolve(
                          {
                            res:false,
                            data:resp['mensaje']
                          });
                      }

                });

          }); 

    } 

    update(listado_id:any,listado:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.put(`${ URL}/cot_lp_capacidades/${ listado_id }`, listado ,{ headers })
                .subscribe( resp =>{

                      if(resp['res'])
                      {
                          resolve(
                          {
                            res:true,
                            data:resp['data']
                          });
                      }else{
                          resolve(
                          {
                            res:false,
                            data:resp['mensaje']
                          });
                      }

                });

          }); 

    } 


   

    //LISTADO MATERIALES DETALLE

    store_detalle_lpmateriales(listado_id:any, detalle:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_lp_capacidades/${ listado_id }/detalles`, detalle ,{ headers })
                .subscribe( resp =>{

                      if(resp['res'])
                      {
                          resolve(
                          {
                            res:true,
                            data:resp['data']
                          });
                      }else{
                          resolve(
                          {
                            res:false,
                            data:resp['mensaje']
                          });
                      }

                });

          }); 

    }

    destroy_detalle_lpmateriales(equipo_id:any,detalle_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.delete(`${ URL}/cot_lp_capacidades/${ equipo_id }/detalles/${ detalle_id}`,{ headers })
                .subscribe( resp =>{

                      if(resp['res'])
                      {
                          resolve(
                          {
                            res:true,
                            data:resp['data']
                          });
                      }else{
                          resolve(
                          {
                            res:false,
                            data:resp['mensaje']
                          });
                      }

                });

          }); 

    }
}
