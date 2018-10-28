import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";

import {UserService, AlertService} from '../_services'

@Component({templateUrl: 'profil-edit.component.html'})
export class ProfilEditComponent implements OnInit {
    editForm: FormGroup;
    currentUser: any;
    public id: number;
    loading = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private _userService: UserService,
                private alertService: AlertService)
    {
        this.id = this.route.snapshot.params['id'];
    }


    ngOnInit() {
        this.getCurrentUserDetails();
        this.editForm = this.formBuilder.group({
            nourriture: [''],
            famille: [''],
            age: [''],
            couleur: [''],
        });
    }

    getCurrentUserDetails() {
        let jwt = localStorage.getItem('currentUser');
        let jwtData = jwt.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let userId = decodedJwtData.userId;

        this._userService.getUser(userId)
            .subscribe(data => {
                this.currentUser = data;
            });
    }

    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.editForm.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.editForm.value);
        this._userService.update(this.currentUser.id, this.f.nourriture.value, this.f.famille.value, this.f.age.value, this.f.couleur.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Modification réussie', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
