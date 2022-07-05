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

}
