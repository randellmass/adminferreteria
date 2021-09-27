import { Injectable } from '@angular/core';


type AOA = any[][];

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  errors:any = []; 
  data: AOA =[];

  constructor() { }

  /*async alertaInformativa(message:string) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }*/


      
}
