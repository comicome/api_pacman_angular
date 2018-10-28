import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { UserService } from '../_services';
import {FilterPipe} from "../filter.pipe";
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'user',
    templateUrl: 'home.component.html',
    providers: [FilterPipe]
})
export class HomeComponent implements OnInit {
    currentUser: any;
    users: Observable<User[]>;

    constructor(private userService: UserService, private http: Http, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loadUsers();
        this.getCurrentUserDetails();
        this.addFriend(this.currentUser.id ,this.route.snapshot.params['id']);
    }

    loadUsers() {
        this.users = this.userService.getPacmans();
    }

    addFriend(currentUserId, userId) {
        this.userService.addFriendUser(currentUserId, userId)
    }

    getCurrentUserDetails() {
        let jwt = localStorage.getItem('currentUser');
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let userId = decodedJwtData.userId;

        this.userService.getUser(userId)
            .subscribe(data => {
                this.currentUser = data;
            });
    }
}