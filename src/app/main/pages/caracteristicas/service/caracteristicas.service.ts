import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }


    listado_caracteristicas()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/caracteristicas`,{ headers })
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

    registra_caracteristicas(caracteristica:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/caracteristicas`, caracteristica ,{ headers })
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
                      data:resp['mensaje']
                  });
              }
        
          });

        }); 

    } 


    editar_caracteristica(caracteristica:any,caracteristica_id:number)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.put(`${ URL}/caracteristicas/${ caracteristica_id }`, caracteristica ,{ headers })
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
                        data:resp['mensaje']
                    });
                }
        
          });

        }); 

    } 

   
}
