import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {


  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  public iconOnlyToggled = false;
  toggleIconOnlySidebar() {
    this.iconOnlyToggled = !this.iconOnlyToggled;
    if (this.iconOnlyToggled) {
      document.querySelector('body').classList.add('sidebar-icon-only');
    }
    else {
      document.querySelector('body').classList.remove('sidebar-icon-only');
    }
  }

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
