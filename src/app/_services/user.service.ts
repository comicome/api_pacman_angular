import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Users } from '../_models/user.interface';


@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    // the username of the logged in user
    public username: string;

    // error messages received from the login attempt
    public errors: any = [];

    getPacman(): Observable<Users[]> {
        return this.http.get(`${config.apiUrl}user`, `Authorization : Bearer ${localStorage.currentUser}`)
            .pipe(map((response: Response) => {
                    return response.json();
                }),
                catchError((error: any) => throwError(error.json())
                ));
    }


    getUser(id: string): Observable<any> {
        return this.http.get(`${config.apiUrl}user/` + id + `/show`,`Authorization : Bearer ${localStorage.currentUser}`).pipe(
            map((response: Response) => {
                return response.json();
            }),
            catchError((error: any) => throwError(error.json())
            ));
    }

    private extractData(res: Response) {
        let body = res;
        return body || { };
    }

    register(user: Users) {
        return this.http.post(`${config.apiUrl}register`, user);
    }

    addFriendUser(id: string){
        return this.http.put(`${config.apiUrl}/user/` + id, `Authorization : Bearer ${localStorage.currentUser}`)
    }

    update(user: Users) {
        return this.http.put(`${config.apiUrl}/user/` + user.id, user, `Authorization : Bearer ${localStorage.currentUser}`);
    }
}