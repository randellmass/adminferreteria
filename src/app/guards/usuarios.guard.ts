import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanLoad {
  constructor(private authService:AuthService,
    private router:Router){}


    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //console.log(this.authService.usuario.rol_id);
    if ((this.authService.usuario.rol_id == 6) || (this.authService.usuario.rol_id == 3))
    {
      this.router.navigateByUrl('main/dashboard');
      return false;
    } else {
      return true;  
    }

}
}
