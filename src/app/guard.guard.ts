import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/authservice';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate,CanActivateChild {
  constructor(
    private authService: AuthService ,private router: Router
  ) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isAuthenticated()){
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isAuthenticated()){
          return true;
        }
        this.router.navigateByUrl('/auth/login');
        return false;

  }

}
