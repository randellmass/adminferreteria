import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class CotchillerService {

     public cotizacion:any; 

     constructor(private http:HttpClient,
                private authService:AuthService) { }
      
    index()
    {
                 
          return new Promise<any>( resolve =>{
            
            const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
            });
      
            this.http.get(`${ URL}/cot_clientes`,{ headers })
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

    index_estados_cotizacion()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/cot_estados`,{ headers })
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

    show(cot:any)
    {
                 
          return new Promise<any>( resolve =>{
            
            const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
            });
      
            this.http.get(`${ URL}/cot_clientes/${ cot }`,{ headers })
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

    store(cotizacion:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_clientes`, cotizacion ,{ headers })
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

    update(cot_id:any,cotizacion:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.put(`${ URL}/cot_clientes/${ cot_id }`, cotizacion ,{ headers })
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

    update_costo(cot:any,costo:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_clientes/costo/${ cot }`, costo ,{ headers })
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

    update_estado(cot:any,estado:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_clientes/${ cot }/estado`, estado ,{ headers })
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

    //Registro detalle de cotizacion
    store_detalle_cotizacion(cotizacion_id:any,compnte:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_clientes/${ cotizacion_id }/detalle`, compnte ,{ headers })
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

    destroy_detalle_cotizacion(cotizacion_id:any,compnte_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.delete(`${ URL}/cot_clientes/${ cotizacion_id }/detalle/${ compnte_id }`, { headers })
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
