import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../auth/services/auth.service';
import { environment } from 'src/environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }
  

    listado_equipos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/equipos`,{ headers })
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


    registra_equipo(equipo:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/equipos`, equipo ,{ headers })
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

    buscar_equipo(equipo:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/equipo/buscar`, equipo ,{ headers })
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

    individual_equipos(equipo_id: number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/equipos/${equipo_id}`,{ headers })
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

    editar_equipos(equipo:any,equipo_id:number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/equipos/${ equipo_id }`, equipo ,{ headers })
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

    listado_equipos_tipos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/equipos_tipos`,{ headers })
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
}
