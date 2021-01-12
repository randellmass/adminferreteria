import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router) { 
                
              }

  ngOnInit(): void {
  }

  async logout(){
    console.log('logout')
    const cerrar = await this.authService.salir_usuario();
    
    if(cerrar){
      this.router.navigateByUrl('/auth');
   
    }

 }

}
