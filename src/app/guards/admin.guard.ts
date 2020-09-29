import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UtilsService } from '../../@override/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private utils: UtilsService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log(route, 'asdfasdfasdfasdf', this.utils.isAuth());




    if (this.utils.isAuth())
      return true
    else {
      this.router.navigate(['/', 'pages', 'auth', 'login'])
      return true
    }

  }

}
