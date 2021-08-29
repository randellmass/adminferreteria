import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

    constructor(private http:HttpClient,
                private authService:AuthService) { }

    index()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/pedidos`,{ headers })
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

    show(pedido_id:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/pedidos/${ pedido_id }`,{ headers })
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

    index_pedido_estados()
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.get(`${ URL}/pedidoEstados`,{ headers })
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
    
    store(pedido:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.post(`${ URL}/pedidos`, pedido ,{ headers })
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

    update(pedido_id:string,pedido:any)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

        this.http.put(`${ URL}/pedidos/${ pedido_id }`, pedido ,{ headers })
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
    
    search_pedido_comercial(pedido:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/pedido/buscarComercial`, pedido ,{ headers })
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
                  data:resp['mensaje']
                });
            }
        
         });
  
       }); 
  
    } 

    search_pedido_admin(pedido:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/pedido/buscarAdmin`, pedido ,{ headers })
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
                  data:resp['mensaje']
                });
            }
        
         });
  
       }); 
  
    }
}
