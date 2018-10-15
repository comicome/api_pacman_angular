import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Users } from '../_models';
import { UserService } from '../_services';
import {FilterPipe} from "../filter.pipe";


@Component({
    selector: 'user',
    templateUrl: 'home.component.html',
    providers: [FilterPipe]
})
export class HomeComponent implements OnInit {
    currentUser: Users;
    users: Observable<Users[]>;

    constructor(private userService: UserService, private http: Http) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }


    ngOnInit() {
        this.loadUsers();
    }


    loadUsers() {
        this.users = this.userService.getPacman();
    }



}