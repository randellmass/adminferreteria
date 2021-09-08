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
      
            this.http.get(`${ URL}/cot_lp_capacidades`,{ headers })
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

                this.http.post(`${ URL}/cot_lp_capacidades`, listado ,{ headers })
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

    update(equipo_id:any,equipo:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.put(`${ URL}/cot_productos/${ equipo_id }`, equipo ,{ headers })
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


    destroy(equipo_id:any,costo_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.delete(`${ URL}/equipos/${ equipo_id }/costo/${ costo_id}`,{ headers })
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
