import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AuthGuard } from './_guards';
import { AuthenticationService, UserService } from './_services';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { UsersComponent } from './user/users.component';
import {FilterPipe} from "./filter.pipe";
import {RegisterComponent} from "./register";
import {ProfilComponent} from "./profil";
import {ProfilEditComponent} from "./profil-edit";
import {AlertService} from "./_services/alert.service";

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        HttpModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        UsersComponent,
        ProfilComponent,
        ProfilEditComponent,
        FilterPipe,
    ],
    providers: [
        UserService,
        AlertService,
        AuthGuard,
        AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }