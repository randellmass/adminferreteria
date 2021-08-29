import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }

    index(pedido_id:string)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/pedidos/${ pedido_id}/orden`,{ headers })
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
    
    store(pedido_id:any,orden:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/pedidos/${ pedido_id }/orden`, orden ,{ headers })
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

    destroy(pedido_id:any,equipo_id:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.delete(`${ URL}/pedidos/${ pedido_id }/orden/${ equipo_id }`, { headers })
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
