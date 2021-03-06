import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { UserService } from '../_services';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'user',
    templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit {
    currentUser: User;
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


    ngOnInit() {
        this.getUserDetails(this.route.snapshot.params['id']);
        this.addFriend(this.currentUser.id ,this.route.snapshot.params['id']);
        this.getCurrentUserDetails();
    }
}