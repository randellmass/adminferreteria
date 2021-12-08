import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../../auth/services/auth.service';
import { environment } from '../../../../../environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }


  listado_Usuarios()
  {
    
    return new Promise<any>( resolve =>{
      
      const headers = new HttpHeaders({
        'Accept': 'application/json', 
        'Authorization': `Bearer ${ this.authService.token }` 
      });

      this.http.get(`${ URL}/users`,{ headers })
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
  
  listado_roles()
  {
    
    return new Promise<any>( resolve =>{
      
      const headers = new HttpHeaders({
        'Accept': 'application/json', 
        'Authorization': `Bearer ${ this.authService.token }` 
      });

      this.http.get(`${ URL}/user_roles`,{ headers })
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

  individual_usuario(usuario_id:number)
  {
    
    return new Promise<any>( resolve =>{
      
      const headers = new HttpHeaders({
        'Accept': 'application/json', 
        'Authorization': `Bearer ${ this.authService.token }` 
      });

      this.http.get(`${ URL}/users/${ usuario_id }`,{ headers })
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

  registrar_usuario(usuario:any)
  {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/users/registro`, usuario ,{ headers })
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

    editar_usuario(usuario:any,usuario_id:number)
    {
       
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });
    
          this.http.post(`${ URL}/users/editar/${usuario_id}`, usuario ,{ headers })
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

    editar_usuario_client(usuario:any,usuario_id:number)
    {
       
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });
    
          this.http.post(`${ URL}/client/update/${usuario_id}`, usuario ,{ headers })
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
