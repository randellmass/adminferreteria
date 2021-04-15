import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

const URL = environment.URL;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): string {

    if(img){
      return `http://127.0.0.1:8000/${ img }`;
    }else{
      return "./assets/images/no-image.png";
    }

  }

}
