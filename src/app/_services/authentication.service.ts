import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}login`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    register(username: string, password: string, email: string, nourriture: string, famille: string, age: number, couleur: string ) {
        return this.http.post<any>(`${config.apiUrl}pacman/register`, { username: username, password: password, email: email, nourriture: nourriture, famille: famille, age: age, couleur: couleur })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}