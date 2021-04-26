import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../auth/services/auth.service';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ImagesSubirService {

    imgTemp:any = null;

    constructor(private http:HttpClient,
                private authService:AuthService) { }


    subir_imagen(archivo:File,
                 modelo:string,
                 id:string)
    {
      
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
        const formData = new FormData();
        formData.append('id',id);
        formData.append('tipo',modelo);
        formData.append('imagen',archivo);

  
        this.http.post(`${ URL}/imgsubir/${ modelo }/${ id }`, formData ,{ headers })
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

    imagen64(file:File){

        const reader = new FileReader();
        reader.readAsDataURL( file);
        reader.onloadend = () => {
          this.imgTemp = reader.result;
        }

    }
}
