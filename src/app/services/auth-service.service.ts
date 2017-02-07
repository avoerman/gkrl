import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';

declare var Auth0Lock: any;

const AUTH0_CLIENT_ID = 'x7DzOI5eHu3wqs0E8flK15Q7i6NYfWhV';
const AUTH0_DOMAIN = 'kgrl.auth0.com';

@Injectable()
export class AuthService {
    lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
        auth: {
            responseType: 'token'
        }
    });

    constructor(private router: Router) {
        this.lock.on('authenticated', (authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
                if (error) console.log(error);

                localStorage.setItem('profile', JSON.stringify(profile));
            });

            this.lock.hide();
        });

        this.lock.on('authorization_error', authResult => {
            console.log(authResult);
        });
    }

    login() {
        this.lock.show();
    }

    logout() {
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');

        this.router.navigateByUrl('/');
    }

    loggedIn() {
        return tokenNotExpired();
    }
}
