import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma_login:FormGroup;
  error:string = "";
  loading:boolean = false;
  
  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private router:Router ) {
    this.crear_form_login();
  }

    //campos login validaor
  get emailNoValidoLogin(){
    return this.forma_login.get('email').invalid && this.forma_login.get('email').touched;
  }

  get passwordNoValidoLogin(){
    return this.forma_login.get('password').invalid && this.forma_login.get('password').touched;
  }


  crear_form_login(){
    this.forma_login = this.fb.group({
       email:['',[Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
       password:['',[Validators.required, Validators.minLength(5)]],
    });
  } 




  ngOnInit(): void {
  }

  async login( )
  {
    if(this.forma_login.invalid){
       
      Object.values(this.forma_login.controls).forEach( control =>{
          control.markAllAsTouched();
      });
    }else{
      this.loading = true;
      const valido = await this.authService.login(this.forma_login.get('email').value, this.forma_login.get('password').value);
      //console.log(valido)
      if(valido['res']){
        this.error="";

        if(this.authService.usuario.rol_id ==7){
          this.router.navigateByUrl('main/evento/ingreso');
        }else{
          this.router.navigateByUrl('');
        };

        this.loading = false;
      }else{
        this.error = valido['data'];
        this.loading = false;
      }
    }
  }

  

}
