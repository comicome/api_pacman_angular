import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', Validators.required, Validators.minLength(6)],
            nourriture: ['', Validators.required, Validators.minLength(3)],
            famille: ['', Validators.required, Validators.minLength(3)],
            age: ['', Validators.required, Validators.min(1), Validators.max(120)],
            couleur: ['', Validators.required, Validators.minLength(3)],
        });
    }


    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.f.username.value, this.f.password.value, this.f.email.value, this.f.nourriture.value, this.f.famille.value, this.f.age.value, this.f.couleur.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Inscription réussie', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}