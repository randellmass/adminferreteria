import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

const URL = environment.URL;


@Injectable({
  providedIn: 'root'
})
export class EquiposPreciosService {

    constructor(private http:HttpClient,
                private authService:AuthService) { }

    store(equipo_id:string,costo:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/equipos/${ equipo_id }/costo`, costo ,{ headers })
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
