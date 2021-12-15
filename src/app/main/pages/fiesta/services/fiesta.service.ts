import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class FiestaService {

      terceros:any[] = [];

      constructor(private http:HttpClient,
                  private authService:AuthService) { }


      index()
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.get(`${ URL}/fiesta`,{ headers })
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

      show(tercero_id:any)
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.get(`${ URL}/fiesta/${ tercero_id }`,{ headers })
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

      show_qr(tercero_qr:any)
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.get(`${ URL}/fiestaqr/${ tercero_qr }`,{ headers })
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
          
            },error =>{

              resolve(
                {
                  res:false,
                  data: ['error - codigo qr no existe']
                }
              );
            });

          }); 
      }

      index_sucursales()
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.get(`${ URL}/fsucursales`,{ headers })
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

      index_tipos()
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.get(`${ URL}/ftipos`,{ headers })
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

      index_estados()
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.get(`${ URL}/festados`,{ headers })
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

          this.http.post(`${ URL}/fiesta`, tercero ,{ headers })
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

          this.http.put(`${ URL}/fiesta/${ tercero_id }`, tercero ,{ headers })
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

      update_qr(tercero_qr:string,invitado:any)
      {
        
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });

          this.http.post(`${ URL}/fiestaqr/${ tercero_qr }`, invitado ,{ headers })
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
    
          this.http.post(`${ URL}/fiesta_buscar`, tercero ,{ headers })
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

      search_x_sucursal(sucursal:any)
      {
      
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });
    
          this.http.post(`${ URL}/fiesta_buscar_sucursal`, sucursal ,{ headers })
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

      search_terceros_todos()
      {
      
        return new Promise<any>( resolve =>{
          
          const headers = new HttpHeaders({
            'Accept': 'application/json', 
            'Authorization': `Bearer ${ this.authService.token }` 
          });
    
          this.http.get(`${ URL}/fiesta_buscar_todos`, { headers })
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
