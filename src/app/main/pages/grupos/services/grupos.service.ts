import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.prod';

import { AuthService } from '../../../../auth/services/auth.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class GruposService {

    constructor(private http:HttpClient,
                private authService:AuthService) { }

  
    listado_grupos()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/equipos_grupos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve(resp['data']);
            }else{
                resolve(false);
            }
        
          });

        }); 
      

    }   


    registra_grupo(grupo:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/equipos_grupos`, grupo ,{ headers })
        .subscribe( resp =>{
          
              if(resp['res'])
              {
                  resolve({
                      res:true
                  });
              }else{
                  resolve({
                    res:false,
                    mensaje:resp['mensaje']
                  });
              }
        
          });

        }); 

    } 

    individual_grupo(grupo_id: number)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/equipos_grupos/${grupo_id}}`,{ headers })
        .subscribe( resp =>{
          
              if(resp['res'])
              {
                  resolve({
                      res:true,
                      data: resp['data']
                  });
              }else{
                  resolve({
                    res:false,
                    mensaje:resp['mensaje']
                  });
              }
        
          });

        }); 
      

    } 

    editar_grupo(grupo:any,grupo_id:number)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.put(`${ URL}/equipos_grupos/${ grupo_id }`, grupo ,{ headers })
        .subscribe( resp =>{
          
                if(resp['res'])
                {
                    resolve({
                        res:true,
                        data: resp['data']
                    });
                }else{
                    resolve({
                      res:false,
                      mensaje:resp['mensaje']
                    });
                }
        
          });

        }); 

    } 

}
