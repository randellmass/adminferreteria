import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.URL;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,vista:string): string {

    if(img){
      //return `http://backendrefrinet.comfortfresh.com/public/${ img }`;
      if (vista == "thumb") {
        //return `http://homestead.test/thumb/${ img }`;
        return `http://backendrefrinet.comfortfresh.com/public/thumb/${ img }`;
      } else {
        //return `http://homestead.test/${ img }`;
        return `http://backendrefrinet.comfortfresh.com/public/${ img }`;
      }

    }else{
      return "./assets/images/no-image.png";
    }

  }

}
