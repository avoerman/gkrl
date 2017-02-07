import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from "./auth-service.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate() {
        // If user is not logged in we'll send them to the homepage
        if (!this.auth.loggedIn()) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }

}
