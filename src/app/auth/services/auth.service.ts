import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token:string = null;
  public usuario:Usuario = {};

  constructor(private http:HttpClient,
              private router:Router) { 

}

  login(email:string, password:string)
  {
    const data = {email , password};

    return new Promise( resolve =>{
        this.http.post(`${ URL}/login`,data)
        .subscribe( async resp =>{
        
          if(resp['res']){
          
            await this.guardartoken(resp['token']);

            resolve({
              res: true
            });
          
          }else{
          
            this.token = null;
            localStorage.clear();
            resolve({
              res:false,
              mensaje:resp['mensaje']
            });
          }

        });
    });
   

  }

  crear_usuario(usuario:Usuario)
  {
      
      return new Promise( resolve =>
        {
        this.http.post(`${ URL}/users`,usuario)
        .subscribe( async resp =>{
        
          if(resp['res']){
          
            await this.guardartoken(resp['token']);
            resolve(true);
          
          }else{
          
            this.token = null;
            localStorage.clear();
            resolve(false);
          }

        });

      });
  }



  async guardartoken(token:string){
     this.token = token;
     localStorage.setItem('token', token);
     await this.validatoken();
  }

  cargartoken(){
    this.token = localStorage.getItem('token') || null;
 }


 async validatoken():Promise<boolean>{

  this.cargartoken()

  if( ! this.token){
    this.router.navigateByUrl('auth');
    return Promise.resolve(false);
  }

  const headers = new HttpHeaders({
    'Accept': 'application/json', 
    'Authorization': `Bearer ${ this.token }` 
  });

  return new Promise<boolean>(resolve =>{

    this.http.get(`${ URL }/usertoken`,{ headers }).subscribe( resp =>{
          
        if( resp['res']){
             
             this.usuario = resp['user'];
              
             resolve(true);
          }else{
              this.router.navigateByUrl('auth');
             resolve(false);
          }
    });
    
  });

 }

 salir_usuario():Promise<boolean>{
  return new Promise<boolean>( resolve =>{
      
    const headers = new HttpHeaders({
      'Accept': 'application/json', 
      'Authorization': `Bearer ${ this.token }` 
    });

    this.http.get(`${ URL}/logout`,{ headers })
    .subscribe( resp =>{
      
        if(resp['res'])
        {
          this.token = null;
          this.usuario = null;
          localStorage.removeItem('token');

          resolve(true);
        }else{
          resolve(false);
        }
    
    });
   
    });
  }
}
