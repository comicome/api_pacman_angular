import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Users } from '../_models';
import { UserService } from '../_services';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'user',
    templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
    currentUser: Users;
    user: {};
    id: number;
    private sub: any;

    constructor(private userService: UserService, private http: Http, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    getUserDetails(id) {
        this.userService.getUser(id)
            .subscribe(data => {
                this.user = data;
            });
    }


    ngOnInit() {
        this.getUserDetails(this.route.snapshot.params['id']);
    }





}