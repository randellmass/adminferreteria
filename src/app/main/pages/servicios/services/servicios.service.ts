import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../auth/services/auth.service';

import { Servicio } from '../interfaces/servicios';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }

  listado_servicio_cliente()
  {
   
    return new Promise<Servicio[]>( resolve =>{
      
      const headers = new HttpHeaders({
        'Accept': 'application/json', 
        'Authorization': `Bearer ${ this.authService.token }` 
      });

      this.http.get(`${ URL}/servicios_cliente`,{ headers })
      .subscribe( resp =>{
        
          if(resp['res'])
          {
              resolve(resp['data']);
          }else{
              resolve(resp['data']);
          }
      
       });

     }); 
   

  }
}
