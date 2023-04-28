import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.URL2;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,vista:string): string {

    if(img){
      if (vista == "thumb") {
        return `${ URL }/public/thumb/${ img }`;
      } else {
        return `${ URL }/${ img }`;
      }

    }else{
      return "./assets/images/no-image.png";
    }

  }

}
