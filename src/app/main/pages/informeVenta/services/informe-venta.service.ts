import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/auth/services/auth.service';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class InformeVentaService {

    constructor(private http:HttpClient,
                private authService:AuthService) { 

    }

    index_informe_usuario()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
    }  

    index_usuario_roles()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvroles`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
    }  

    index_info_v_semanas()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvsemanas`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_estados()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvestados`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }  

    index_info_v_cot_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvcotconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_cot_dir_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvcotdirconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_redesotro_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvredesotroconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_analisis_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvanalisisconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_postventa_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvpostventaconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_postventa_dir_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvpostvdirconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_backorder_conceptos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvbackorderconceptos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_cotizaciones(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/cotizacion`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_cotizaciones_director(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/cotdirector`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    } 

    index_info_v_presupuesto_admin()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/admin/presupuesto`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_semana_tipos()
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/inforvsemanatipos`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_redesotro(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/redesotro`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_analisis(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/analisis`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_postventa(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/postventa`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_postventa_director(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/postvdirector`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_backorder(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/backorder`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_tonelada(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/tonelada`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    index_info_v_actividades_director(presupuesto_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ presupuesto_id }/actividaddirector`,{ headers })
        .subscribe( resp =>{
          
            if(resp['res'])
            {
                resolve({
                    res:true,
                    data:resp['data']
                });
            }else{
                resolve(
                  {
                    res:false,
                    data:resp['mensaje']
                  }
                );
            }
        
         });
  
       }); 
     
  
    }

    store_presupuesto_usuario(presupuesto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto`, presupuesto ,{ headers })
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

    store_presupuesto_usuario_cot(presupuesto_id:any,cotizacion:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/cotizacion`, cotizacion ,{ headers })
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

    store_presupuesto_usuario_cot_dir(presupuesto_id:any,cotdirector:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/cotdirector`, cotdirector ,{ headers })
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

    store_presupuesto_usuario_redesotro(presupuesto_id:any,redesotro:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/redesotro`, redesotro ,{ headers })
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

    store_presupuesto_usuario_analisis(presupuesto_id:any,analisis:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/analisis`, analisis ,{ headers })
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

    store_presupuesto_usuario_postventa(presupuesto_id:any,postventa:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/postventa`, postventa ,{ headers })
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

    store_presupuesto_usuario_postventa_dir(presupuesto_id:any,postvdir:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/postvdirector`, postvdir ,{ headers })
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

    store_presupuesto_usuario_backorder(presupuesto_id:any,backorder:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/backorder`, backorder ,{ headers })
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

    store_presupuesto_usuario_tonelada(presupuesto_id:any,tonelada:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/tonelada`, tonelada ,{ headers })
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

    store_presupuesto_usuario_actividad(presupuesto_id:any,actividaddir:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/${ presupuesto_id }/actividaddirector`, actividaddir ,{ headers })
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

    store_info_v_semana(semana:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvsemanas`, semana ,{ headers })
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

    show_prespuesto_usuario(prespuesto_id:number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/presupuesto/${ prespuesto_id }`,{ headers })
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

    show_prespuesto_admin(prespuesto_id:number)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.get(`${ URL}/admin/presupuesto/${ prespuesto_id }`,{ headers })
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

    update_presupuesto_usuario(presupuesto_id:number,presupuesto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/presupuesto/${ presupuesto_id }`, presupuesto ,{ headers })
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

    update_presupuesto_usuario_cot(presupuesto_id:number,cotizacion_id:any,cotizacion:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/presupuesto/${ presupuesto_id }/cotizacion/${ cotizacion_id }`, cotizacion ,{ headers })
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

    update_presupuesto_usuario_cot_dir(presupuesto_id:number,cotizacion_id:any,cotdir:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/presupuesto/${ presupuesto_id }/cotdirector/${ cotizacion_id }`, cotdir ,{ headers })
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

    update_presupuesto_usuario_postv_dir(presupuesto_id:number,postvdir_id:any,postvdir:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/presupuesto/${ presupuesto_id }/postvdirector/${ postvdir_id }`, postvdir ,{ headers })
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

    update_presupuesto_usuario_actividad_dir(presupuesto_id:number,actividad_id:any,actividad:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/presupuesto/${ presupuesto_id }/actividaddirector/${ actividad_id }`, actividad ,{ headers })
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

    update_presupuesto_usuario_redesotro(presupuesto_id:number,redesotro_id:any,redesotro:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/presupuesto/${ presupuesto_id }/redesotro/${ redesotro_id }`, redesotro ,{ headers })
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

    update_presupuesto_admin(presupuesto_id:number,presupuesto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/admin/presupuesto/${ presupuesto_id }`, presupuesto ,{ headers })
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

    delete_presupuesto_usuario_analisis(presupuesto_id:number,analisis_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/analisis/${ analisis_id }`, { headers })
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

    delete_presupuesto_usuario_postventa(presupuesto_id:number,postventa_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/postventa/${ postventa_id }`, { headers })
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

    delete_presupuesto_usuario_backorder(presupuesto_id:number,backoder_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/backorder/${ backoder_id }`, { headers })
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

    delete_presupuesto_usuario_tonelada(presupuesto_id:number,tonelada_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/tonelada/${ tonelada_id }`, { headers })
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

    delete_presupuesto_usuario_actividad(presupuesto_id:number,actividad_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/actividaddirector/${ actividad_id }`, { headers })
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

    delete_presupuesto_cot_director(presupuesto_id:number,cotdir_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/cotdirector/${ cotdir_id }`, { headers })
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

    delete_presupuesto_postv_director(presupuesto_id:number,postv_id:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.delete(`${ URL}/presupuesto/${ presupuesto_id }/postvdirector/${ postv_id }`, { headers })
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

    update_info_v_semana(semana_id:number,semana:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvsemanas/${ semana_id }`, semana ,{ headers })
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

    generar_token_siesa()
    {
     const formData = new FormData();
     formData.append('username',"sistemas");
     formData.append('password',"r3fr1n0rt3");
     formData.append('client_id',"sbhlYrAa00S9HbSkW8ZrDwmkSqBjkrav2ELzwE4L");
     formData.append('client_secret',"NlH6gXshIypsvMhr34ZcpyhdihakEUA2lIWYlDMOtUyEVZ9rIvFvVnGIw2R7gBG9LUQ9HEBYax1JVXOUFm1mCCkq8VlJxnyWq6yTjeZ31VFvX6Ss8k3UiAmgmGUcYjue");
     formData.append('grant_type',"password");

      return new Promise<any>( resolve =>{
        
        this.http.post(`http://siesacrm.siesacloud.com:9027/webservices/auth/token/`,formData)
        .subscribe( resp =>{
          
                resolve({
                    res:true,
                    data:resp
                });
        
         });
  
       }); 
     
  
    }
    
    enviar_post_siesa_garantia_cliente(tokenSiesa:any)
    {
     const formData = new FormData();
    
      return new Promise<any>( resolve =>{

        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${ tokenSiesa }`,
        });

        const params = new HttpParams();
        params.append('company','3');
        
        this.http.post(`http://siesacrm.siesacloud.com:9027/webservices/cstm_garantia_clientes/create/`, formData, {headers})
        .subscribe( resp =>{
          
                resolve({
                    res:true,
                    data:resp
                });
        
         }, error => console.log(error));
  
       }); 
     
  
    }

    consultas_informe_ventas(dataconsulta:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/consulta/informe`, dataconsulta ,{ headers })
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

    consultas_informe_ventas_asesor(dataconsulta:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/presupuesto/consulta/informe/asesor`, dataconsulta ,{ headers })
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

    //conceptos registro
    store_analisis_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvanalisisconceptos`, concepto ,{ headers })
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

    update_analisis_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvanalisisconceptos/${ concepto_id }`, concepto ,{ headers })
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

    store_backorder_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvbackorderconceptos`, concepto ,{ headers })
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

    update_backorder_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvbackorderconceptos/${ concepto_id }`, concepto ,{ headers })
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

    store_cotizacion_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvcotconceptos`, concepto ,{ headers })
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

    update_cotizacion_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvcotconceptos/${ concepto_id }`, concepto ,{ headers })
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

    store_postventa_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvpostventaconceptos`, concepto ,{ headers })
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

    update_postventa_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvpostventaconceptos/${ concepto_id }`, concepto ,{ headers })
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

    store_redesotros_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvredesotroconceptos`, concepto ,{ headers })
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

    update_redesotros_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvredesotroconceptos/${ concepto_id }`, concepto ,{ headers })
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

    store_cotizacion_director_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvcotdirconceptos`, concepto ,{ headers })
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

    update_cotizacion_director_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvcotdirconceptos/${ concepto_id }`, concepto ,{ headers })
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

    store_posventa_director_concepto(concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });

  
        this.http.post(`${ URL}/inforvpostvdirconceptos`, concepto ,{ headers })
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

    update_postventa_director_concepto(concepto_id:number,concepto:any)
    {
     
      return new Promise<any>( resolve =>{
        
        const headers = new HttpHeaders({
          'Accept': 'application/json', 
          'Authorization': `Bearer ${ this.authService.token }` 
        });
  
        this.http.put(`${ URL}/inforvpostvdirconceptos/${ concepto_id }`, concepto ,{ headers })
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
