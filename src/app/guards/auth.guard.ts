import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, Route, UrlSegment, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad{
  
  
  constructor(private authService:AuthService){

  }
  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //console.log('guard CantAc');
    return this.authService.validatoken();
   // return false;

  }*/

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //console.log('guard');
    if (this.authService.token!=null) {
        return true;
    } else {
      return this.authService.validatoken();
    }
   //return false;
  }

  
}
