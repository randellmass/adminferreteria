import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';


const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

      constructor(private http:HttpClient,
                  private authService:AuthService) { }

    index()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/terceros`,{ headers })
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
    
    store(tercero:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/terceros`, tercero ,{ headers })
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

    update(tercero_id:string,tercero:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.put(`${ URL}/terceros/${ tercero_id }`, tercero ,{ headers })
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

    search_tercero(tercero:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/tercero/buscar`, tercero ,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
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
