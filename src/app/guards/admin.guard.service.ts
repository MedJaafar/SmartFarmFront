import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

    constructor(private router: Router, private authService : AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAdmin()) {
        return true;
        } 
        this.router.navigate(['/access-forbidden'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}