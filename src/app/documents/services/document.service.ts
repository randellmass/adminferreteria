import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

    constructor(private http:HttpClient,
                private authService:AuthService) { }

    product_show(product_id:any)
    {
      
      return new Promise<any>( resolve =>{
        
     
        this.http.get(`${ URL}/producto/${ product_id }`)
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
                    mensaje: resp['mensaje']
                  }
                );
            }
        
          });

        }); 
      

    } 
}
