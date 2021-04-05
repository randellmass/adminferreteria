import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {

  usuario:any = {};

  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.usuario = this.authService.usuario;
  }

}
