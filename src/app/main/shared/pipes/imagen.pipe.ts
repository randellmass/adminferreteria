import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.URL;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): string {

    if(img){
      return `http://homestead.test/${ img }`;
    }else{
      return "./assets/images/no-image.png";
    }

  }

}
