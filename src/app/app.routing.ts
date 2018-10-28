import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { UsersComponent } from './user/users.component';
import {RegisterComponent} from "./register";
import {ProfilComponent} from "./profil";
import {ProfilEditComponent} from "./profil-edit";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user/:id', component: UsersComponent },
    { path: 'profil/:id', component: ProfilComponent },
    { path: 'edit/profil/:id', component: ProfilEditComponent },
    { path: 'delete/:id', component: UsersComponent },
    { path: 'add/:id', component: UsersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);