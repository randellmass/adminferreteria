import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

    constructor(private http:HttpClient,
                private authService:AuthService) { 

    }


    index_almacenes()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/almacenes`,{ headers })
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

    show_almacen(almacen_id:number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/almacenes/${ almacen_id }`,{ headers })
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

    index_usuarios_almacenes(almacen_id:number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/almacenes/${ almacen_id }/users`,{ headers })
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

    store_usuario_almacen(almacen_id:any,usuario_almacen:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/almacenes/${ almacen_id }/users`, usuario_almacen ,{ headers })
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

    delete_usuario_almacen(almacen_id:number,user_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/almacenes/${ almacen_id }/users/${ user_id }`, { headers })
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
