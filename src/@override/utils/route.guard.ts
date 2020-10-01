import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../../app/user-type.enum';
import { EntitiesService } from './entities.service';
import { EntityData } from './interfaces/entityData';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private entities: EntitiesService, private router: Router, private utils: UtilsService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.utils.isAuth()) {
      this.router.navigate(['/pages', 'auth', 'login'])
      return false
    }


    let entity = this.entities.allEntities?.find(entity => { return entity.route.includes(next.params.route) })


    if (!entity) {
      this.router.navigate(['/'])
      return false
    }



     this.router.events.subscribe((val) => {

      let nav: typeof ActivationEnd

      if (val instanceof ActivationEnd) {
        nav = ActivationEnd
        // get route path
        let route = val.snapshot?.routeConfig?.path
        // get usertype stored in session
        let userTypeStored = atob(sessionStorage.getItem(btoa('userType')))
        // convert into enum
        let userType = UserType[userTypeStored]

        // check add permission

        if (route === 'add' && entity.permissions && !entity.permissions.add.includes(userType)) {
          this.router.navigate(['/'])
          return false
        }

        // check all permission
        if (route === 'all' && entity.permissions && !entity.permissions.view.includes(userType)) {
          this.router.navigate(['/'])
          return false
        }

        // check edit permission
        if (route.includes('edit') && entity.permissions && !entity.permissions.edit.includes(userType)) {
          this.router.navigate(['/'])
          return false
        }


      }
    });
  
    return true;
  }



}
