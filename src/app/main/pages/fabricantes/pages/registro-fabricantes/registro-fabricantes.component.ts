import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FabricantesService } from '../../services/fabricantes.service';
import { Router } from '@angular/router';
import { ImagesSubirService } from '../../../../shared/service/images-subir.service';

@Component({
  selector: 'app-registro-fabricantes',
  templateUrl: './registro-fabricantes.component.html',
  styleUrls: ['./registro-fabricantes.component.css']
})
export class RegistroFabricantesComponent implements OnInit {

  form_fabricante:FormGroup = this.fb.group({
    nombre : ['',[Validators.required,Validators.minLength(3)]],
  });

  imgTemp:any= "";
  imagen:File = null;
  
  constructor(private fb:FormBuilder,
              private fabricantesService:FabricantesService,
              public imagesSubirService:ImagesSubirService,
              private router:Router) { }

  ngOnInit(): void {
  }

  campoNoValido(campo:string){
    return this.form_fabricante.controls[campo].touched && this.form_fabricante.controls[campo].errors;
  }


  async guardar(){
      if(this.form_fabricante.invalid){
         this.form_fabricante.markAllAsTouched();
         return;
      }

      try {
        const registro = await this.fabricantesService.registra_fabricantes(this.form_fabricante.value);

        if(registro['res']){
  
           //subimos la foto
           await this.imagesSubirService.subir_imagen(this.imagen,'fabricante',registro['data']['id']);
           this.imagesSubirService.imgTemp = "";
           
           this.form_fabricante.reset();
           this.router.navigateByUrl('main/fabricantes');
        }
      } catch (error) {
          console.log(error);
      }

  
  }

  file_imagen(file:File)
  {
   
    this.imagen = file;
   
    if(!file){
      return;
    }

    this.imagesSubirService.imagen64(file);

  }

}
