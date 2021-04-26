import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../auth/services/auth.service';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.URL;


@Injectable({
  providedIn: 'root'
})
export class FilesSubirService {

  constructor(private http:HttpClient,
              private authService:AuthService) { }

    subir_file(archivo:File,
                modelo:string,
                id:string,
                roles:any,
                nombreFile:string)
   {
     
     return new Promise<any>( resolve =>{
       
       const headers = new HttpHeaders({
         'Accept': 'application/json', 
         'Authorization': `Bearer ${ this.authService.token }` 
       });
       const formData = new FormData();
       formData.append('id',id);
       formData.append('tipo',modelo);
       formData.append('file',archivo);
       roles.forEach( (rol:string) => {
         formData.append('roles[]',rol);
       });

       formData.append('nombre',nombreFile);

 
       this.http.post(`${ URL}/filesubir/${ modelo }/${ id }`, formData ,{ headers })
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

  eliminar_file(archivo_id:number)
  {

    return new Promise<any>( resolve =>{

          const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
          });
    

          this.http.get(`${ URL}/file_delete/${ archivo_id }`,{ headers })
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
