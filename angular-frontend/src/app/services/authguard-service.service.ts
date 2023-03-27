import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from './auth-service.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        public t:TokenStorageService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.t.getUser();
        if (user) {
            // check if route is restricted by role
            if (this.t.getUser().role.title='Normal') {
                // role not authorised so redirect to home page
                this.router.navigate(['/dashboard']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}