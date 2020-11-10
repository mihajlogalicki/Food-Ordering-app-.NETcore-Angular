import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { nextTick } from 'process';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token') != null){
        let roles = route.data['permittedRoles'] as Array<string>;
        if(roles){
          if(this.service.roleMatch(roles)){
            return true;
          }else{
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        return true;
      } else {
        this.router.navigate(['/user/login']);
        return false;
      }
  }
}
