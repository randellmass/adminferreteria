import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../../environments/environment.prod';
import { AuthService } from '../../../../auth/services/auth.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class FabricantesService {

  constructor(private http:HttpClient,
              private authService:AuthService) { 

    }

    listado_fabricantes()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/fabricantes`,{ headers })
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


    registra_fabricantes(fabricante:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.post(`${ URL}/fabricantes`, fabricante ,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve(true);
            }else{
                resolve(false);
            }
        
         });
  
       }); 
  
    } 

    individual_fabricantes(fabricante_id: number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/fabricantes/${fabricante_id}}`,{ headers })
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

    editar_fabricantes(fabricante:any,fabricante_id:number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/fabricantes/${ fabricante_id }`, fabricante ,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve(true);
            }else{
                resolve(false);
            }
        
         });
  
       }); 
  
    } 
}
