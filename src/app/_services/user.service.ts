import { Injectable } from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../_models';


@Injectable()
export class UserService {
    constructor(private http: Http, private router: Router, private httpClient: HttpClient,) {
    }

    // error messages received from the login attempt
    public errors: any = [];

    getPacmans(): Observable<User[]> {
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


    addFriendUser(currentUserId : string, UserId : string ){
        return this.http.put(`${config.apiUrl}user/addFriend/`+currentUserId + `/`+UserId, `Authorization : Bearer ${localStorage.currentUser}`)
    }

    update(currentUserId : number, nourriture: string, famille: string, age: number, couleur: string ) {
        const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.currentUser}`)
        return this.httpClient.put(`${config.apiUrl}user/edit/profil/` + currentUserId,
            { nourriture: nourriture, famille: famille, age: age, couleur: couleur }, {headers})
            .pipe(map(user => {
                return user;
            }));
    }
}