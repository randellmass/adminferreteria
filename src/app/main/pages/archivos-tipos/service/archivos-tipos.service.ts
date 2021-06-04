import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';

const URL = environment.URL;


@Injectable({
  providedIn: 'root'
})
export class ArchivosTiposService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }

    listado_archivo_tipos()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/file_types`,{ headers })
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
    
   /*registra_unidad(unidad:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/unidades`, unidad ,{ headers })
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


    editar_unidad(unidad:any,unidad_id:number)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.put(`${ URL}/unidades/${ unidad_id }`, unidad ,{ headers })
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

    } */
}
