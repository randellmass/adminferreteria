import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from 'src/app/auth/services/auth.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class CotproductoService {

    constructor(private http:HttpClient,
                private authService:AuthService) { }
      
    index()
    {
                 
          return new Promise<any>( resolve =>{
            
            const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
            });
      
            this.http.get(`${ URL}/cot_productos`,{ headers })
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

    show(equipo_id:any)
    {
                 
          return new Promise<any>( resolve =>{
            
            const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
            });
      
            this.http.get(`${ URL}/cot_productos/${ equipo_id }`,{ headers })
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

    store(equipo:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_productos`, equipo ,{ headers })
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

    buscar_producto_x_capacidad_y_circuito(equipo:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cotproductos/buscar`, equipo ,{ headers })
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

    update(equipo_id:any,equipo:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.put(`${ URL}/cot_productos/${ equipo_id }`, equipo ,{ headers })
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


    destroy(equipo_id:any,costo_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.delete(`${ URL}/equipos/${ equipo_id }/costo/${ costo_id}`,{ headers })
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

    index_capacidades()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/cot_capacidades`,{ headers })
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

    index_circuitos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/cot_circuitos`,{ headers })
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

    index_voltajes()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/cot_voltajes`,{ headers })
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

    index_tipo_accesorios()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/cot_tipoaccesorios`,{ headers })
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

    //REGISTRO DE COTPRODUCTOCOMPONENTES

    store_producto_compnte(equipo_id:any,compnte:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_productos/${ equipo_id}/compntes`, compnte ,{ headers })
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

    store_producto_compnte_xls(equipo_id:any,compnte:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/cot_productos/${ equipo_id}/compntesxls`, compnte ,{ headers })
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

    destroy_producto_compnte(equipo_id:any,compnte_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.delete(`${ URL}/cot_productos/${ equipo_id }/compntes/${ compnte_id}`,{ headers })
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

    destroy_todos_compntes(equipo_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.delete(`${ URL}/compntesxls/${ equipo_id }`,{ headers })
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
