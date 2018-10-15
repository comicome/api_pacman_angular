import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { UsersComponent } from './user/users.component';
import { RegisterComponent } from './register';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'profil/:id', component: UsersComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'delete/:id', component: UsersComponent },
    { path: 'add/:id', component: UsersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);