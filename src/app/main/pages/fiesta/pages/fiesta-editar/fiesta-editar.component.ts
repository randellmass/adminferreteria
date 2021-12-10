import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FiestaService } from '../../services/fiesta.service';

@Component({
  selector: 'app-fiesta-editar',
  templateUrl: './fiesta-editar.component.html',
  styleUrls: ['./fiesta-editar.component.css']
})
export class FiestaEditarComponent implements OnInit {

      formTercero:FormGroup = this.fb.group({
        fiestasucursal_id: ['',[Validators.required]],
        fiestaestado_id: ['',[Validators.required]],
        fiestatipo_id: ['',[Validators.required]],
        documento: ['',[Validators.required,Validators.minLength(3)]],
        nombre: ['',[Validators.required,Validators.minLength(3)]],
        documentoDe: [''],
        cupos: [''],
        contacto: [''],
      });

      errors:any =[];
      tercero_id:any;
      sucursales:any =[];
      tipos:any =[];
      estados:any =[];
      invitados:any =[];
      loading:boolean = false;

      constructor(private fb:FormBuilder,
                  private fiestaService:FiestaService,
                  private activatedRoute:ActivatedRoute) { }

      ngOnInit(): void {
          this.activatedRoute.params.subscribe( param =>{
            this.cargar_tercero(param['id']);
            
        });
        
        this.cargarSelec();
   
      }

      async cargar_tercero(tercero_id:any){
      
        this.loading= true;
  
          const result_pedido = await this.fiestaService.show(tercero_id);
          if (result_pedido['res'])
          {
            this.errors="";  
            this.tercero_id = result_pedido['data'];  
            //this.myAngularxQrCode = this.tercero_id['invitacion'];
         
          } else {
            this.errors = result_pedido['data']; 
          }
  
          this.loading= false; 
      }

      async cargarSelec()
      {
          const result_sucursales = await this.fiestaService.index_sucursales();
          if (result_sucursales['res'])
          {
              this.sucursales = result_sucursales['data'];
          } else {
              this.errors = result_sucursales['data'];
          }
  
          const result_tipos = await this.fiestaService.index_tipos();
          if (result_tipos['res'])
          {
              this.tipos = result_tipos['data'];
          } else {
              this.errors = result_tipos['data'];
          }

          const result_estados = await this.fiestaService.index_estados();
          if (result_estados['res'])
          {
              this.estados = result_estados['data'];
          } else {
              this.errors = result_estados['data'];
          }

          
        const result_invitados = await this.fiestaService.index();
        if (result_invitados['res'])
        {
            this.invitados = result_invitados['data'];
        } else {
            this.errors = result_invitados['data'];
        }

          this.cargarForm();
      }

      cargarForm(){
          this.formTercero.reset({
            ...this.tercero_id
          });

          this.formTercero.get('documento').disable();
      }

      campoNoValido(campo:string){
        return this.formTercero.controls[campo].touched && this.formTercero.controls[campo].errors;
      }

      async editar_tercero(){
          if(this.formTercero.invalid){
            this.formTercero.markAllAsTouched();
            return;
          }
          this.loading= true;
        
          const tercero_reg = await this.fiestaService.update(this.tercero_id['id'],this.formTercero.value);
          if (tercero_reg['res'])
          {
              this.loading= false;
          }else{
              this.errors = tercero_reg['data'];
              this.loading= false;
          }
      }

      cancelar_editar(){

      }

}
