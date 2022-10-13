import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class DespachosService {

    constructor(private http:HttpClient,
                private authService:AuthService) 
                { 
                
                }

    index_despachos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/despachos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
    }  

}
