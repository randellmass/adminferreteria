import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class EquiposCaracteristicasService {

  constructor(private http:HttpClient,
    private authService:AuthService) { }

    subir_caracteristica(equipo_id:string,caracteristica:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.post(`${ URL}/equipos/caracteristica/store/${ equipo_id }`, caracteristica ,{ headers })
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

    update_caracteristica(equipo_id:string,caracteristica:any,caract_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                const formdata = new FormData();
                formdata.append('unidad_id',caracteristica['unidad_id']);
                formdata.append('valor',caracteristica['valor']);


                this.http.post(`${ URL}/equipos/caracteristica/update/${ equipo_id }/${caract_id}`, formdata ,{ headers })
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

    caracteristica_individual(equipo_id:string,caract_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.get(`${ URL}/equipos/caracteristica/show/${ equipo_id }/${caract_id}`,{ headers })
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

    eliminar_caracteristica(caract_id:any)
    {

          return new Promise<any>( resolve =>{

              const headers = new HttpHeaders({
              'Accept': 'application/json', 
              'Authorization': `Bearer ${ this.authService.token }` 
              });

                this.http.get(`${ URL}/equipos/caracteristica/delete/${caract_id}`,{ headers })
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
