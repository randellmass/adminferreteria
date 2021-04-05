import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../../auth/services/auth.service';


const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class FamiliasService {

    constructor(private http:HttpClient,
                private authService:AuthService) { }

    listado_familias()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/equipos_familias`,{ headers })
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
                    mensaje: resp['mensaje']
                  }
                );
            }
        
          });

        }); 
      

    }   


    registra_familia(familia:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/equipos_familias`, familia ,{ headers })
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

    individual_familia(familia_id: number)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/equipos_familias/${familia_id}}`,{ headers })
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

    editar_categoria(familia:any,familia_id:number)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.put(`${ URL}/equipos_familias/${ familia_id }`, familia ,{ headers })
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
