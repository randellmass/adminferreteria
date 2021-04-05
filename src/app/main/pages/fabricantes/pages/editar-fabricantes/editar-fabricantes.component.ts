import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FabricantesService } from '../../services/fabricantes.service';

@Component({
  selector: 'app-editar-fabricantes',
  templateUrl: './editar-fabricantes.component.html',
  styleUrls: ['./editar-fabricantes.component.css']
})
export class EditarFabricantesComponent implements OnInit {

  fabricante:any = {}
  
  form_fabricante:FormGroup;

  constructor(private fb:FormBuilder,
              private fabricantesService:FabricantesService,
              private router:Router,
              private activatedRoute:ActivatedRoute
            )
  {  }

  campoNoValido(campo:string){
    return this.form_fabricante.controls[campo].touched && this.form_fabricante.controls[campo].errors;
  }

  ngOnInit(): void {

    this.crear_formulario();
    
    this.activatedRoute.params.subscribe( params =>{
      this.buscar_individual_fabricante( params['id']);
      
    })
    
  }

  crear_formulario(){
      this.form_fabricante = this.fb.group({
          nombre : [,[Validators.required,Validators.minLength(3)]]
      });
  }

  async buscar_individual_fabricante(fabricante_id:number){

    this.fabricante = await this.fabricantesService.individual_fabricantes(fabricante_id);
    this.valores_formulario();
  }

  valores_formulario(){
    this.form_fabricante.reset({
      ...this.fabricante
    });
  }

  async editar(){
      if(this.form_fabricante.invalid){
        this.form_fabricante.markAllAsTouched();
        return;
    }

    const registro = await this.fabricantesService.editar_fabricantes(this.form_fabricante.value,this.fabricante.id);

    if(registro){
        this.form_fabricante.reset();
        this.router.navigateByUrl('main/fabricantes');
    }
  }

}
