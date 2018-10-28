import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../_models';
import { UserService } from '../_services';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'user',
    templateUrl: 'profil.component.html',
})
export class ProfilComponent implements OnInit {
    currentUser: any;
    user: {};
    id: number;
    private sub: any;

    constructor(private userService: UserService, private http: Http, private route: ActivatedRoute) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
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
        this.getCurrentUserDetails();
    }
}